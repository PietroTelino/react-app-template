import type { User } from '@/types';

const styles: Record<User['role'], string> = {
    god: 'bg-purple-100 text-purple-700',
    administrator: 'bg-blue-100 text-blue-700',
    user: 'bg-gray-100 text-gray-600',
};

export function RoleBadge({ role }: { role: User['role'] }) {
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${styles[role]}`}>
            {role}
        </span>
    );
};