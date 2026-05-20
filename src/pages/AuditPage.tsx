import { Layout } from '@/components/Layout';
import { Pagination } from '@/components/Pagination';
import { useAuditLogs } from '@/hooks/useAuditLogs';

const ACTION_OPTIONS = [
    { value: '', label: 'Todas as ações' },
    { value: 'USER_REGISTER', label: 'Registro' },
    { value: 'USER_LOGIN', label: 'Login' },
    { value: 'USER_LOGOUT', label: 'Logout' },
    { value: 'USER_LOGOUT_ALL', label: 'Logout geral' },
    { value: 'USER_CREATE', label: 'Criação de usuário' },
    { value: 'USER_UPDATE', label: 'Atualização de usuário' },
    { value: 'USER_DELETE', label: 'Remoção de usuário' },
    { value: 'USER_INACTIVATE', label: 'Inativação' },
    { value: 'USER_REACTIVATE', label: 'Reativação' },
    { value: 'PASSWORD_CHANGE', label: 'Troca de senha' },
    { value: 'PASSWORD_RESET_REQUEST', label: 'Solicitação de reset' },
    { value: 'PASSWORD_RESET_CONFIRM', label: 'Confirmação de reset' },
    { value: 'PASSWORD_ADMIN_RESET', label: 'Reset por admin' },
    { value: 'PREFERENCES_UPDATE', label: 'Preferências' },
    { value: 'SESSION_LOGOUT', label: 'Logout de sessão' },
];

const ENTITY_OPTIONS = [
    { value: '', label: 'Todas as entidades' },
    { value: 'USER', label: 'Usuário' },
    { value: 'PASSWORD', label: 'Senha' },
    { value: 'PREFERENCES', label: 'Preferências' },
    { value: 'SESSION', label: 'Sessão' },
];

export function AuditPage() {
    const {
        logs,
        total,
        isLoading,
        error,
        filters,
        currentPage,
        totalPages,
        handleFilterChange,
        handleClearFilters,
        goToPage,
    } = useAuditLogs();

    const hasFilters = !!filters.action || !!filters.entity;

    return (
        <Layout title="Auditoria">
            <div className='flex flex-col gap-6'>
                <div>
                    <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>Logs de auditoria</h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-0.5'>
                        {total} registro{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
                    </p>
                </div>
                <div className='flex items-center gap-3 flex-wrap'>
                    <select
                        name='action'
                        value={filters.action}
                        onChange={handleFilterChange}
                        className='text-sm border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500'
                    >
                        {ACTION_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <select
                        name='entity'
                        value={filters.entity}
                        onChange={handleFilterChange}
                        className='text-sm border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 outline-none focus:border-blue-500'
                    >
                        {ENTITY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {hasFilters && (
                        <button
                            onClick={handleClearFilters}
                            className='text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline'
                        >
                            Limpar filtros
                        </button>
                    )}
                </div>
                {isLoading && (
                    <div className='text-sm text-gray-500 dark:text-gray-400'>Carregando logs...</div>
                )}
                {error && (
                    <div className='px-4 py-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg'>
                        <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
                    </div>
                )}

                {!isLoading && !error && (
                    <div className='flex flex-col gap-4'>
                        <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden'>
                            <table className='w-full text-sm'>
                                <thead>
                                    <tr className='border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Data</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Ação</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Entidade</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Usuário</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Realizado por</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">IP</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-100 dark:divide-gray-800'>
                                    {logs.map((log) => (
                                        <tr key={log.id} className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
                                            <td className='px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap'>
                                                {new Date(log.createdAt).toLocaleString('pt-BR')}
                                            </td>
                                            <td className='px-4 py-3'>
                                                <span className='px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-mono'>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className='px-4 py-3 text-gray-600 dark:text-gray-400'>{log.entity}</td>
                                            <td className='px-4 py-3'>
                                                {log.user ? (
                                                    <div className='flex flex-col'>
                                                        <span className='font-medium text-gray-800 dark:text-gray-200'>{log.user.name}</span>
                                                        <span className='text-xs text-gray-400 dark:text-gray-500'>{log.user.email}</span>
                                                    </div>
                                                ) : (
                                                    <span className='text-gray-400'>—</span>
                                                )}
                                            </td>
                                            <td className='px-4 py-3 text-gray-600'>
                                                {log.performedBy ? (
                                                    <div className='flex flex-col'>
                                                        <span className='font-medium text-gray-800 dark:text-gray-200'>{log.performedBy.name}</span>
                                                        <span className='text-xs text-gray-400 dark:text-gray-500'>{log.performedBy.email}</span>
                                                    </div>
                                                ) : (
                                                    <span className='text-gray-400'>—</span>
                                                )}
                                            </td>
                                            <td className='px-4 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs'>
                                                {log.ipAddress ?? '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {logs.length === 0 && (
                                <div className='px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500'>
                                    Nenhum log encontrado
                                </div>
                            )}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={goToPage}
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
}