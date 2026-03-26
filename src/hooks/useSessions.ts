import { useState, useEffect, useCallback } from 'react';
import { getMySessions, logoutSession } from '@/api/sessions';
import type { Session } from '@/types';

export function useSessions() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        if (!confirm('Tem certeza que deseja encerrar esta sessão?')) return;
        try {
            await logoutSession(sessionId);
            setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        } catch {
            alert('Erro ao encerrar sessão');
        }
    }

    return {
        sessions,
        isLoading,
        error,
        handleLogoutSession,
    }
}