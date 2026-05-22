import { Link } from 'react-router-dom';
import { useRegisterForm } from '@/hooks/useRegisterForm';

const fields = [
    { name: 'name', label: 'Nome', type: 'text', placeholder: 'Seu nome completo', autoComplete: 'name' },
    { name: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com', autoComplete: 'email' },
    { name: 'password', label: 'Senha', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
    { name: 'confirmPassword', label: 'Confirmar senha', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
] as const;

export function RegisterPage() {
    const { form, errors, isSubmitting, handleChange, handleSubmit } = useRegisterForm();

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
                <div className="mb-8">
                    <h1 className='text-2xl font-bold text-gray-900'>Criar conta</h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        Preencha os dados abaixo para se registrar
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-5'>
                    {fields.map((field) => (
                        <div key={field.name} className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-700'>
                            {field.label}
                        </label>
                        <input
                            name={field.name}
                            type={field.type}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            className={`
                                w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                                placeholder:text-gray-400 text-gray-900
                                ${errors[field.name]
                                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                                    : 'border-gray-300 bg-white focus:border-blue-500'
                                }
                            `}
                        />
                        {errors[field.name] && (
                            <p className='text-xs text-red-500'>{errors[field.name]}</p>
                        )}
                        </div>
                    ))}

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='
                            w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700
                            disabled:bg-blue-400 disabled:cursor-not-allowed
                            text-white text-sm font-medium rounded-lg transition-colors mt-1
                        '
                    >
                        {isSubmitting ? 'Criando conta...' : 'Criar conta'}
                    </button>

                    <p className='text-sm text-center text-gray-500'>
                        Já tem uma conta?{' '}
                        <Link to='/login' className='text-blue-600 hover:underline font-medium'>
                            Entrar
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}