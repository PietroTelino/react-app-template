import { useState, useEffect, useCallback } from 'react';
import { getUsers, deleteUser, inactivateUser, reactivateUser, adminResetPassword, createUser, updateUser } from '@/api/users';
import { useToast } from '@/contexts/ToastContext';
import { useConfirm } from '@/contexts/ConfirmContext';
import type { User } from '@/types';

export function useActiveUsers() {
    const { showToast } = useToast();
    const { confirm } = useConfirm();

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await getUsers()
            setUsers(data)
        } catch {
            setError('Erro ao carregar usuários')
        } finally {
            setIsLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers]);

    function openCreateModal() {
        setEditingUser(null);
        setModalOpen(true);
    }

    function openEditModal(user: User) {
        setEditingUser(user);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditingUser(null);
    }

    async function handleCreate(data: {
        name: string
        email: string
        password: string
        role: string
    }) {
        try {
            await createUser(data);
            await fetchUsers();
            showToast('Usuário criado com sucesso', 'success');
            closeModal();
        } catch (err: any) {
            const message = err?.response?.data?.message ?? 'Erro ao criar usuário';
            showToast(message, 'error');
        }
    }

    async function handleEdit(id: string, data: { name: string; email: string }) {
        try {
            await updateUser(id, data);
            await fetchUsers();
            showToast('Usuário atualizado com sucesso', 'success');
            closeModal();
        } catch (err: any) {
        const message = err?.response?.data?.message ?? 'Erro ao atualizar usuário';
        showToast(message, 'error');
        }
    }

    async function handleDelete(id: string) {
        const ok = await confirm({
            title: 'Remover usuário',
            message: 'Tem certeza que deseja remover este usuário?',
            confirmLabel: 'Remover',
            variant: 'danger',
        });
        if (!ok) return
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
        if (!ok) return
        try {
            await inactivateUser(id);
            await fetchUsers();
            showToast('Usuário inativado com sucesso', 'success');
        } catch {
            showToast('Erro ao inativar usuário', 'error');
        }
    }

    async function handleReactivate(id: string) {
        const ok = await confirm({
            title: 'Reativar usuário',
            message: 'O usuário voltará a ter acesso à plataforma. Deseja continuar?',
            confirmLabel: 'Reativar',
            variant: 'info',
        });
        if (!ok) return
        try {
            await reactivateUser(id);
            await fetchUsers();
            showToast('Usuário reativado com sucesso', 'success');
        } catch {
            showToast('Erro ao reativar usuário', 'error');
        }
    }

    async function handleResetPassword(id: string) {
        const ok = await confirm({
            title: 'Resetar senha',
            message: 'Uma nova senha será gerada e enviada por e-mail ao usuário.',
            confirmLabel: 'Resetar',
            variant: 'warning',
        });
        if (!ok) return
        try {
            await adminResetPassword(id);
            showToast('Senha resetada com sucesso', 'success');
        } catch {
            showToast('Erro ao resetar senha', 'error');
        }
    }

    return {
        users,
        isLoading,
        error,
        modalOpen,
        editingUser,
        openCreateModal,
        openEditModal,
        closeModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleInactivate,
        handleReactivate,
        handleResetPassword,
    };
}