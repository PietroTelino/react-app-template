import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';

export function DashboardPage() {
    const { user } = useAuth();

    return (
        <Layout title='Dashboard'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-xl font-semibold text-gray-900'>
                    Olá, {user?.name} 👋
                </h2>
                <p className='text-sm text-gray-500'>
                    Bem-vindo de volta. Você está logado como{' '}
                    <span className='font-medium text-gray-700'>{user?.role}</span>.
                </p>
            </div>
        </Layout>
    );
}