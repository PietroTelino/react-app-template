import { useState, useEffect, useCallback } from 'react';
import { getDeletedUsers, restoreUser, hardDeleteUser } from '@/api/users';
import { useToast } from '@/contexts/ToastContext';
import { useConfirm } from '@/contexts/ConfirmContext';
import { useAuth } from '@/contexts/AuthContext';
import type { User } from '@/types';

export function useDeletedUsers() {
    const { showToast } = useToast();
    const { confirm } = useConfirm();
    const { user: currentUser } = useAuth();

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await getDeletedUsers();
            setUsers(data);
        } catch {
            setError('Erro ao carregar usuários deletados');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers]);

    async function handleRestore(id: string) {
        const ok = await confirm({
            title: 'Restaurar usuário',
            message: 'O usuário voltará a ter acesso à plataforma. Deseja continuar?',
            confirmLabel: 'Restaurar',
            variant: 'info',
        });
        if (!ok) return
        try {
            await restoreUser(id);
            await fetchUsers();
            showToast('Usuário restaurado com sucesso', 'success');
        } catch {
            showToast('Erro ao restaurar usuário', 'error');
        }
    }

    async function handleHardDelete(id: string) {
        const ok = await confirm({
            title: 'Deletar permanentemente',
            message: 'Esta ação é irreversível. O usuário e todos os seus dados serão removidos definitivamente.',
            confirmLabel: 'Deletar permanentemente',
            variant: 'danger',
        });
        if (!ok) return
        try {
            await hardDeleteUser(id);
            await fetchUsers();
            showToast('Usuário deletado permanentemente', 'success');
        } catch {
            showToast('Erro ao deletar usuário', 'error');
        }
    }

    const isGod = currentUser?.role === 'god';

    return {
        users,
        isLoading,
        error,
        isGod,
        handleRestore,
        handleHardDelete,
    };
}