import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function NotFoundPage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4'>
            <div className='text-center flex flex-col items-center gap-6 max-w-md'>
                <div className='text-8xl font-bold text-gray-200 dark:text-gray-800'>
                    404
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
                        Página não encontrada
                    </h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        A página que você está procurando não existe ou foi removida.
                    </p>
                </div>
                <div className='flex gap-3'>
                    <button
                        onClick={() => navigate(-1)}
                        className='
                            px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                            text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                            transition-colors
                        '
                    >
                        Voltar
                    </button>
                    <Link
                        to={isAuthenticated ? '/dashboard' : '/login'}
                        className='
                            px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700
                            text-white transition-colors
                        '
                    >
                            {isAuthenticated ? 'Ir para o dashboard' : 'Ir para o login'}
                    </Link>
                </div>
            </div>
        </div>
    );
}