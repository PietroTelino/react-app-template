import { useState, useEffect, useCallback } from 'react';
import { getMySessions, logoutSession } from '@/api/sessions';
import { useToast } from '@/contexts/ToastContext';
import { useConfirm } from '@/contexts/ConfirmContext';
import type { Session } from '@/types';

export function useSessions() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();
    const { confirm } = useConfirm();

    const fetchSessions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getMySessions();
            setSessions(data);
        } catch {
            setError('Erro ao carregar sessões');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSessions()
    }, [fetchSessions]);

    async function handleLogoutSession(sessionId: string) {
        const ok = await confirm({
            title: 'Encerrar sessão',
            message: 'Tem certeza que deseja encerrar esta sessão?',
            confirmLabel: 'Encerrar',
            variant: 'danger',
        });
        if (!ok) return;

        try {
            await logoutSession(sessionId);
            setSessions((prev) => prev.filter((s) => s.id !== sessionId));
            showToast('Sessão encerrada com sucesso', 'success');
        } catch {
            showToast('Erro ao encerrar sessão', 'error');
        }
    }

    return {
        sessions,
        isLoading,
        error,
        handleLogoutSession,
    }
}