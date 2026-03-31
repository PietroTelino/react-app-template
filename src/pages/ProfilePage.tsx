import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useChangePassword } from '@/hooks/useChangePassword';
import { usePreferences } from '@/hooks/usePreferences';

export function ProfilePage() {
    const { user } = useAuth();
    const passwordForm = useChangePassword();
    const preferences = usePreferences();

    return (
        <Layout title='Perfil'>
            <div className='flex flex-col gap-8 max-w-xl'>
                <div className='bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4'>
                    <h2 className='text-base font-semibold text-gray-900'>
                        Informações da conta
                    </h2>
                    <div className='flex flex-col gap-3 text-sm'>
                        <div className='flex flex-col gap-0.5'>
                            <span className='text-xs text-gray-500'>Nome</span>
                            <span className='text-gray-900 font-medium'>{user?.name}</span>
                        </div>
                        <div className='flex flex-col gap-0.5'>
                            <span className='text-xs text-gray-500'>E-mail</span>
                            <span className='text-gray-900 font-medium'>{user?.email}</span>
                        </div>
                        <div className='flex flex-col gap-0.5'>
                            <span className='text-xs text-gray-500'>Perfil</span>
                            <span className='text-gray-900 font-medium capitalize'>{user?.role}</span>
                        </div>
                    </div>
                </div>
                <div className='bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4'>
                    <div>
                        <h2 className='text-base font-semibold text-gray-900'>Tema</h2>
                        <p className='text-sm text-gray-500 mt-0.5'>
                            Escolha a aparência da interface
                        </p>
                    </div>
                    <div className='flex gap-3'>
                        {(['light', 'dark'] as const).map((theme) => (
                            <button
                                key={theme}
                                onClick={() => preferences.handleThemeChange(theme)}
                                disabled={preferences.isSubmitting}
                                className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium
                                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                                    ${preferences.currentTheme === theme
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }
                                `}
                            >
                                {theme === 'light' ? '☀️ Claro' : '🌙 Escuro'}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4'>
                    <div>
                        <h2 className='text-base font-semibold text-gray-900'>Alterar senha</h2>
                        <p className='text-sm text-gray-500 mt-0.5'>
                            Sua nova senha deve ter no mínimo 8 caracteres e 1 caractere especial
                        </p>
                    </div>
                    <form onSubmit={passwordForm.handleSubmit} noValidate className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-sm font-medium text-gray-700'>
                                Senha atual
                            </label>
                            <input
                                name='currentPassword'
                                type='password'
                                value={passwordForm.form.currentPassword}
                                onChange={passwordForm.handleChange}
                                placeholder='••••••••'
                                className={`
                                    w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                                    placeholder:text-gray-400 text-gray-900
                                    ${passwordForm.errors.currentPassword
                                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                                        : 'border-gray-300 bg-white focus:border-blue-500'
                                    }
                                `}
                            />
                            {passwordForm.errors.currentPassword && (
                                <p className="text-xs text-red-500">{passwordForm.errors.currentPassword}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label className="text-sm font-medium text-gray-700">
                                Nova senha
                            </label>
                            <input
                                name='newPassword'
                                type='password'
                                value={passwordForm.form.newPassword}
                                onChange={passwordForm.handleChange}
                                placeholder='••••••••'
                                className={`
                                    w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                                    placeholder:text-gray-400 text-gray-900
                                    ${passwordForm.errors.newPassword
                                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                                        : 'border-gray-300 bg-white focus:border-blue-500'
                                    }
                                `}
                            />
                            {passwordForm.errors.newPassword && (
                                <p className='text-xs text-red-500'>{passwordForm.errors.newPassword}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-sm font-medium text-gray-700'>
                                Confirmar nova senha
                            </label>
                            <input
                                name='confirmPassword'
                                type='password'
                                value={passwordForm.form.confirmPassword}
                                onChange={passwordForm.handleChange}
                                placeholder='••••••••'
                                className={`
                                    w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                                    placeholder:text-gray-400 text-gray-900
                                    ${passwordForm.errors.confirmPassword
                                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                                        : 'border-gray-300 bg-white focus:border-blue-500'
                                    }
                                `}
                            />
                            {passwordForm.errors.confirmPassword && (
                                <p className='text-xs text-red-500'>{passwordForm.errors.confirmPassword}</p>
                            )}
                        </div>
                        <button
                            type='submit'
                            disabled={passwordForm.isSubmitting}
                            className='w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors'
                        >
                            {passwordForm.isSubmitting ? 'Salvando...' : 'Alterar senha'}
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}