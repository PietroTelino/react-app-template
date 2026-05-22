import { useLoginForm } from '@/hooks/useLoginForm';
import { Link } from 'react-router-dom';

export function LoginPage() {
    const { form, errors, isSubmitting, handleChange, handleSubmit } = useLoginForm();

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-gray-900'>Entrar</h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        Acesse sua conta para continuar
                    </p>
                </div>

                {errors.general && (
                    <div className='mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg'>
                        <p className='text-sm text-red-600'>{errors.general}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className='space-y-5'>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='email' className='text-sm font-medium text-gray-700'>
                            E-mail
                        </label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder='seu@email.com'
                            className={`
                                w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                                placeholder:text-gray-400 text-gray-900
                                ${errors.email
                                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                                    : 'border-gray-300 bg-white focus:border-blue-500'
                                }
                            `}
                        />
                        {errors.email && (
                            <p className='text-xs text-red-500'>{errors.email}</p>
                        )}
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='password' className='text-sm font-medium text-gray-700'>
                            Senha
                        </label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='current-password'
                            value={form.password}
                            onChange={handleChange}
                            placeholder='••••••••'
                            className={`
                                w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                                placeholder:text-gray-400 text-gray-900
                                ${errors.password
                                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                                    : 'border-gray-300 bg-white focus:border-blue-500'
                                }
                            `}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className='flex justify-end'>
                        <a href='/forgot-password' className='text-xs text-blue-600 hover:text-blue-700 hover:underline'>
                            Esqueceu a senha?
                        </a>
                    </div>

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='
                            w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700
                            disabled:bg-blue-400 disabled:cursor-not-allowed
                            text-white text-sm font-medium rounded-lg
                            transition-colors
                        '
                    >
                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </button>
                    <p className='text-sm text-center text-gray-500'>
                        Não tem uma conta?{' '}
                        <Link to='/register' className='text-blue-600 hover:underline font-medium'>
                            Criar conta
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}