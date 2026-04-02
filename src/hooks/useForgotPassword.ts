import { useState } from 'react';
import { forgotPassword } from '@/api/users';

export function useForgotPassword() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        if (emailError) setEmailError('');
    }

    function validate(): boolean {
        if (!email.trim()) {
            setEmailError('E-mail é obrigatório');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('E-mail inválido');
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await forgotPassword(email);
            setSubmitted(true);
        } catch {
            setSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        email,
        emailError,
        isSubmitting,
        submitted,
        handleChange,
        handleSubmit,
    }
}