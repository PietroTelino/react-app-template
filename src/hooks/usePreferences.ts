import { useState } from 'react';
import { updateMyPreferences } from '@/api/users';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

export function usePreferences() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentTheme = (user?.preferences as any)?.theme ?? 'light';

    async function handleThemeChange(theme: 'light' | 'dark') {
        if (theme === currentTheme) return;
        setIsSubmitting(true);
        try {
            await updateMyPreferences(theme);
            showToast('Preferências atualizadas', 'success');
        } catch {
            showToast('Erro ao atualizar preferências', 'error');
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        currentTheme,
        isSubmitting,
        handleThemeChange,
    };
}