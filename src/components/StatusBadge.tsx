import type { User } from '@/types';

interface StatusBadgeProps {
    user: Pick<User, 'deletedAt' | 'inactivatedAt'>,
}

export function StatusBadge({ user }: StatusBadgeProps) {
    if (user.deletedAt) {
        return (
            <span className='px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600'>
                Removido
            </span>
        );
    }

    if (user.inactivatedAt) {
        return (
            <span className='px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700'>
                Inativo
            </span>
        );
    }

    return (
        <span className='px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700'>
            Ativo
        </span>
    );
};