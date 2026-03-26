import { Layout } from '@/components/Layout';
import { SessionCard } from '@/components/SessionCard';
import { useSessions } from '@/hooks/useSessions';

export function SessionsPage() {
    const { sessions, isLoading, error, handleLogoutSession } = useSessions();

    return (
        <Layout title="Sessões">
            <div className='flex flex-col gap-6'>
                <div>
                    <h2 className='text-lg font-semibold text-gray-900'>
                        Sessões ativas
                    </h2>
                    <p className='text-sm text-gray-500 mt-0.5'>
                        Estes são os dispositivos conectados à sua conta no momento.
                        Encerre qualquer sessão que você não reconheça.
                    </p>
                </div>
                {isLoading && (
                    <div className='text-sm text-gray-500'>Carregando sessões...</div>
                )}
                {error && (
                    <div className='px-4 py-3 bg-red-50 border border-red-200 rounded-lg'>
                        <p className='text-sm text-red-600'>{error}</p>
                    </div>
                )}
                {!isLoading && !error && (
                    <>
                        {sessions.length === 0 ? (
                            <div className='text-sm text-gray-400'>
                                Nenhum sessão ativa encontrada.
                            </div>
                        ) : (
                            <div className='flex flex-col gap-3 max-w-xl'>
                                {sessions.map((session) => (
                                    <SessionCard
                                        key={session.id}
                                        session={session}
                                        onLogout={handleLogoutSession}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}