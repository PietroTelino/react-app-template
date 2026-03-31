import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
    label: string;
    path: string;
    roles?: Array<'user' | 'administrator' | 'god'>;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Perfil', path: '/profile' },
    { label: 'Sessões', path: '/sessions' },
    { label: 'Usuários', path: '/users', roles: ['administrator', 'god'] },
    { label: 'Auditoria', path: '/audit', roles: ['administrator', 'god'] },
];

export function Sidebar() {
    const { user } = useAuth();

    const visibleItems = navItems.filter((items) => {
        if (!items.roles) return true;
        return user?.role && items.roles.includes(user.role);
    });

    return (
        <aside className='w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col'>
            <div className='h-16 flex items-center px-6 border-b border-gray-200'>
                <span className='text-lg font-bold text-gray-900'>MyApp</span>
            </div>

            <nav className='flex-1 px-3 py-4 flex flex-col gap-1'>
                {visibleItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                            ${isActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }
                        `}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className='px-4 py-4 border-t border-gray-200'>
                <div className='flex flex-col gap-0.5'>
                    <span className='text-sm font-medium text-gray-900 truncate'>
                        {user?.name}
                    </span>
                    <span className='text-xs text-gray-500 truncate'>{user?.email}</span>
                    <span className='text-xs text-gray-400 capitalize'>{user?.role}</span>
                </div>
            </div>
        </aside>
    );
}