import { Layout } from '@/components/Layout';
import { RoleBadge } from '@/components/RoleBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { useUsers } from '@/hooks/useUsers';
import { useAuth } from '@/contexts/AuthContext';

export function UsersPage() {
    const { user: currentUser } = useAuth();
    const {
        users,
        isLoading,
        error,
        handleDelete,
        handleInactivate,
        handleReactivate,
        handleResetPassword,
    } = useUsers();

    return (
        <Layout title="Usuários">
            <div className='flex flex-col gap-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-lg font-semibold text-gray-900'>
                            Usuários cadastrados
                        </h2>
                        <p className='text-sm text-gray-500 mt-0.5'>
                            {users.length} usuário{users.length !== 1 ? 's' : ''} encontrado{users.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                {isLoading && (
                    <div className='text-sm text-gray-500'>Carregando usuários...</div>
                )}

                {error && (
                    <div className='px-4 py-3 bg-red-50 border border-red-200 rounded-lg'>
                        <p className='text-sm text-red-600'>{error}</p>
                    </div>
                )}

                {!isLoading && !error && (
                    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden'>
                        <table className='w-full text-sm'>
                            <thead>
                                <tr className='border-b border-gray-200 bg-gray-50'>
                                    <th className='text-left px-4 py-3 font-medium text-gray-600'>Nome</th>
                                    <th className='text-left px-4 py-3 font-medium text-gray-600'>E-mail</th>
                                    <th className='text-left px-4 py-3 font-medium text-gray-600'>Role</th>
                                    <th className='text-left px-4 py-3 font-medium text-gray-600'>Status</th>
                                    <th className='text-left px-4 py-3 font-medium text-gray-600'>Criado em</th>
                                    <th className='px-4 py-3' />
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100'>
                                {users.map((user) => {
                                    const isSelf = user.id === currentUser?.id;
                                    const isGod = user.role === 'god';
                                    const isInactive = !!user.inactivatedAt;
                                    const isDeleted = !!user.deletedAt;
                                    const canAct = !isSelf && !isGod;

                                    return (
                                        <tr key={user.id} className='hover:bg-gray-50 transition-colors'>
                                            <td className='px-4 py-3 font-medium text-gray-900'>
                                                {user.name}
                                                {isSelf && (
                                                    <span className='ml-2 text-xs text-gray-400'>(você)</span>
                                                )}
                                            </td>
                                            <td className='px-4 py-3 text-gray-600'>{user.email}</td>
                                            <td className='px-4 py-3'>
                                                <RoleBadge role={user.role} />
                                            </td>
                                            <td className='px-4 py-3'>
                                                <StatusBadge user={user} />
                                            </td>
                                            <td className='px-4 py-3 text-gray-500'>
                                                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td className='px-4 py-3'>
                                                {canAct && !isDeleted && (
                                                    <div className='flex items-center gap-2 justify-end'>
                                                        {isInactive ? (
                                                            <button
                                                                onClick={() => handleReactivate(user.id)}
                                                                className='text-xs text-green-600 hover:underline'
                                                            >
                                                                Reativar
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleInactivate(user.id)}
                                                                className='text-xs text-yellow-600 hover:underline'
                                                            >
                                                                Inativar
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => handleResetPassword(user.id)}
                                                            className='text-xs text-blue-600 hover:underline'
                                                        >
                                                            Resetar Senha
                                                        </button>

                                                        <button
                                                            onClick={() => handleDelete(user.id)}
                                                            className='text-xs text-red-500 hover:underline'
                                                        >
                                                            Remover
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {users.length === 0 && (
                            <div className='px-4 py-8 text-center text-sm text-gray-400'>
                                Nenhum usuário encontrado
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}