import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selfDelete } from '@/api/users';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

export function useDeleteAccount() {
    const { logout } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function openModal() {
        setPassword('');
        setPasswordError('');
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setPassword('');
        setPasswordError('');
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        if (passwordError) setPasswordError('');
    }

    async function handleConfirm() {
        if (!password) {
            setPasswordError('Senha é obrigatória');
            return;
        }

        setIsSubmitting(true);
        try {
            await selfDelete(password);
            await logout();
            showToast('Conta removida com sucesso', 'success');
            navigate('/login');
        } catch (error: any) {
            const message = error?.response?.data?.message ?? 'Erro ao remover a conta';
            setPasswordError(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        modalOpen,
        password,
        passwordError,
        isSubmitting,
        openModal,
        closeModal,
        handlePasswordChange,
        handleConfirm,
    };
}