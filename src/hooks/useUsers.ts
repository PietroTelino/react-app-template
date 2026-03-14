import { useState, useEffect, useCallback } from 'react';
import { getUsers, deleteUser, inactivateUser, reactivateUser, adminResetPassword } from '@/api/users';
import type { User } from '@/types';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        if (!confirm('Tem certeza que deseja remover este usuário?')) return;
        try {
            await deleteUser(id);
            await fetchUsers();
        } catch {
            alert('Erro ao remover usuário');
        }
    }

    async function handleInactivate(id: string) {
        if (!confirm('Tem certeza que deseja inativar este usuário?')) return;
        try {
            await inactivateUser(id);
            await fetchUsers();
        } catch (error) {
            alert('Erro ao inativar usuário');
        }
    }

    async function handleReactivate(id: string) {
        if (!confirm('Tem certeza que deseja reativar este usuário?')) return;
        try {
            await reactivateUser(id);
            await fetchUsers();
        } catch (error) {
            alert('Erro ao reativar usuário');
        }
    }

    async function handleResetPassword(id: string) {
        if (!confirm('Resetar a senha deste usuário? Uma nova senha será enviada por e-mail.')) return;
        try {
            await adminResetPassword(id);
            alert('Senha resetada com sucesso!');
        } catch (error) {
            alert('Erro ao resetar senha');
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