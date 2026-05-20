import { Layout } from '@/components/Layout';
import { RoleBadge } from '@/components/RoleBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { ActiveUsersTab } from '@/components/users/ActiveUsersTab';
import { DeletedUsersTab } from '@/components/users/DeletedUsersTab';
import { useState } from 'react';

type Tab = 'active' | 'deleted';

export function UsersPage() {
    const [activeTab, setActiveTab] = useState<Tab>('active');

    return (
        <Layout title="Usuários">
            <div className='flex flex-col gap-6'>
                <div className='flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit'>
                    {([
                        { key: 'active', label: 'Ativos' },
                        { key: 'deleted', label: 'Deletados' },
                    ] as { key: Tab; label: string }[]).map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`
                                px-4 py-1.5 rounded-md text-sm font-medium transition-colors
                                ${activeTab === tab.key
                                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {activeTab === 'active' ? <ActiveUsersTab /> : <DeletedUsersTab />}
            </div>
        </Layout>
    );
}