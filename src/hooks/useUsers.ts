import { useState, useEffect, useCallback } from 'react';
import { getUsers, deleteUser, inactivateUser, reactivateUser, adminResetPassword } from '@/api/users';
import { useToast } from '@/contexts/ToastContext';
import { useConfirm } from '@/contexts/ConfirmContext';
import type { User } from '@/types';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();
    const { confirm } = useConfirm();

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch {
            setError('Erro ao carregar usuários');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers]);

    async function handleDelete(id: string) {
        const ok = await confirm({
            title: 'Remover usuário',
            message: 'Tem certeza que deseja remover este usuário? Esta ação não pode ser desfeita.',
            confirmLabel: 'Remover',
            variant: 'danger',
        });
        if (!ok) return;

        try {
            await deleteUser(id);
            await fetchUsers();
            showToast('Usuário removido com sucesso', 'success');
        } catch {
            showToast('Erro ao remover usuário', 'error');
        }
    }

    async function handleInactivate(id: string) {
        const ok = await confirm({
            title: 'Inativar usuário',
            message: 'O usuário perderá acesso à plataforma. Deseja continuar?',
            confirmLabel: 'Inativar',
            variant: 'warning',
        });
        if (!ok) return;

        try {
            await inactivateUser(id);
            await fetchUsers();
            showToast('Usuário inativado com sucesso', 'success');
        } catch (error) {
            showToast('Erro ao inativar usuário', 'error');
        }
    }

    async function handleReactivate(id: string) {
        const ok = await confirm({
            title: 'Reativar usuário',
            message: 'O usuário voltará a ter acesso à plataforma. Deseja continuar?',
            confirmLabel: 'Reativar',
            variant: 'info',
        })
        if (!ok) return;

        try {
            await reactivateUser(id);
            await fetchUsers();
            showToast('Usuário reativado com sucesso', 'success');
        } catch (error) {
            showToast('Erro ao reativar usuário', 'error');
        }
    }

    async function handleResetPassword(id: string) {
        const ok = await confirm({
            title: 'Resetar senha',
            message: 'Uma nova senha será gerada e enviada por e-mail ao usuário. Deseja continuar?',
            confirmLabel: 'Resetar',
            variant: 'warning',
        });
        if (!ok) return;

        try {
            await adminResetPassword(id);
            showToast('Senha resetada com sucesso!', 'success');
        } catch (error) {
            showToast('Erro ao resetar senha', 'error');
        }
    }

    return {
        users,
        isLoading,
        error,
        fetchUsers,
        handleDelete,
        handleInactivate,
        handleReactivate,
        handleResetPassword,
    };
}