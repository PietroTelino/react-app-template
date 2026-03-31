import React, { useState } from 'react';
import { changeMyPassword } from '@/api/users';
import { useToast } from '@/contexts/ToastContext';

interface FormState {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface FormErrors {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export function useChangePassword() {
    const { showToast } = useToast();

    const [form, setForm] = useState<FormState>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    function validate(): boolean {
        const newErrors: FormErrors = {};

        if (!form.currentPassword) {
            newErrors.currentPassword = 'Senha atual é obrigatória';
        }

        if (!form.newPassword) {
            newErrors.newPassword = 'Nova senha é obrigatória';
        } else if (form.newPassword.length < 8) {
            newErrors.newPassword = 'A senha deve ter no mínimo 8 caracteres';
        } else if (!/[^a-zA-Z0-9]/.test(form.newPassword)) {
            newErrors.newPassword = 'A senha deve conter pelo menos 1 caractere especial';
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
        } else if (form.newPassword !== form.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await changeMyPassword({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });
            showToast('Senha alterada com sucesso', 'success');
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            const message = error?.response?.data?.message ?? 'Erro ao alterar senha';
            showToast(message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        form,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
    }
}