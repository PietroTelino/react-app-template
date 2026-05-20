import { useDeletedUsers } from '@/hooks/useDeletedUsers';
import { RoleBadge } from '@/components/RoleBadge';

export function DeletedUsersTab() {
    const { users, isLoading, error, isGod, handleRestore, handleHardDelete } = useDeletedUsers();

    return (
        <div className='flex flex-col gap-6'>
            <div>
                <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>Usuários removidos</h2>
                <p className='text-sm text-gray-500 dark:text-gray-400 mt-0.5'>
                    {users.length} usuário{users.length !== 1 ? 's' : ''} removido{users.length !== 1 ? 's' : ''}
                </p>
            </div>
            {isLoading && <p className='text-sm text-gray-500 dark:text-gray-400'>Carregando...</p>}
            {error && (
                <div className='px-4 py-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg'>
                    <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
                </div>
            )}
            {!isLoading && !error && (
                <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'>
                                <th className='text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400'>Nome</th>
                                <th className='text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400'>E-mail</th>
                                <th className='text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400'>Role</th>
                                <th className='text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400'>Removido em</th>
                                <th className='px-4 py-3' />
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100 dark:divide-gray-800'>
                            {users.map((user) => (
                                <tr key={user.id} className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
                                    <td className='px-4 py-3 font-medium text-gray-900 dark:text-white'>{user.name}</td>
                                    <td className='px-4 py-3 text-gray-600 dark:text-gray-400'>{user.email}</td>
                                    <td className='px-4 py-3'><RoleBadge role={user.role} /></td>
                                    <td className='px-4 py-3 text-gray-500 dark:text-gray-400'>
                                        {user.deletedAt
                                            ? new Date(user.deletedAt).toLocaleDateString('pt-BR')
                                            : '—'
                                        }
                                    </td>
                                    <td className='px-4 py-3'>
                                        <div className='flex items-center gap-3 justify-end'>
                                            <button
                                                onClick={() => handleRestore(user.id)}
                                                className='text-xs text-green-600 dark:text-green-400 hover:underline'
                                            >
                                                Restaurar
                                            </button>
                                            {isGod && (
                                                <button
                                                    onClick={() => handleHardDelete(user.id)}
                                                    className='text-xs text-red-500 dark:text-red-400 hover:underline'
                                                >
                                                    Deletar permanentemente
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <div className='px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500'>
                            Nenhum usuário removido
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}