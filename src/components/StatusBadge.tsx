import type { User } from '@/types';

interface StatusBadgeProps {
    user: Pick<User, 'deletedAt' | 'inactivatedAt'>;
}

export function StatusBadge({ user }: StatusBadgeProps) {
    if (user.deletedAt) {
        return (
            <span className='px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400'>
                Removido
            </span>
        );
    }

    if (user.inactivatedAt) {
        return (
            <span className='px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400'>
                Inativo
            </span>
        );
    }

    return (
        <span className='px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'>
            Ativo
        </span>
    );
};