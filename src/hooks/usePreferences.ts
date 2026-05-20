import { useState } from 'react';
import { updateMyPreferences } from '@/api/users';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

export function usePreferences() {
    const { user, applyTheme, updateUser } = useAuth();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentTheme = (user?.preferences as any)?.theme ?? 'light';

    async function handleThemeChange(theme: 'light' | 'dark') {
        if (theme === currentTheme) return;
        setIsSubmitting(true);
        try {
            await updateMyPreferences(theme);
            applyTheme(theme);

            updateUser({
                preferences: { ...user?.preferences, theme },
            });

            showToast('Tema atualizado com sucesso', 'success');
        } catch {
            showToast('Erro ao atualizar tema', 'error');
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