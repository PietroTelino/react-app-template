import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
    title: string,
}

export function Header({ title }: HeaderProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/login');
    }

    return (
        <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6'>
            <h1 className='text-base font-semibold text-gray-900'>{title}</h1>
            <button
                onClick={handleLogout}
                className='text-sm text-gray-500 hover:text-red-600 transition-colors cursor-pointer'
            >
                Sair
            </button>
        </header>
    );
}