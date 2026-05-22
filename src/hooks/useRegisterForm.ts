import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/api/users';
import { useToast } from '@/contexts/ToastContext';

interface FormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export function useRegisterForm() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        password: '',
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

        if (!form.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!form.email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (!form.password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (form.password.length < 8) {
            newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
        } else if (!/[^a-zA-Z0-9]/.test(form.password)) {
            newErrors.password = 'A senha deve conter pelo menos 1 caractere especial';
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
        } else if (form.password !== form.confirmPassword) {
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
            await registerUser({
                name: form.name,
                email: form.email,
                password: form.password,
            });
            showToast('Conta criada com sucesso!', 'success');
            navigate('/login');
        } catch (error: any) {
            const message = error?.response?.data?.message ?? 'Erro ao criar conta';
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
    };
}