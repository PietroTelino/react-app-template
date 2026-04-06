import { useState, useEffect } from 'react';
import type { User } from '@/types';

interface UserFormModalProps {
    isOpen: boolean;
    editingUser: User | null;
    onClose: () => void;
    onCreate: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
    onEdit: (id: string, data: { name: string; email: string }) => Promise<void>;
}

interface FormState {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
}

export function UserFormModal({ isOpen, editingUser, onClose, onCreate, onEdit }: UserFormModalProps) {
    const isEditing = !!editingUser;

    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingUser) {
            setForm({
                name: editingUser.name,
                email: editingUser.email,
                password: '',
                role: editingUser.role,
            });
        } else {
            setForm({ name: '', email: '', password: '', role: 'user' });
        }
        setErrors({});
    }, [editingUser, isOpen]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    function validate(): boolean {
        const newErrors: FormErrors = {};

        if (!form.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }

        if (!form.email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'E-mail inválido';
        }

        if (!isEditing) {
            if (!form.password) {
                newErrors.password = 'Senha é obrigatória';
            } else if (form.password.length < 8) {
                newErrors.password = 'Mínimo 8 caracteres';
            } else if (!/[^a-zA-Z0-9]/.test(form.password)) {
                newErrors.password = 'Deve conter pelo menos 1 caractere especial';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            if (isEditing) {
                await onEdit(editingUser.id, { name: form.name, email: form.email });
            } else {
                await onCreate(form);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/40' onClick={onClose} />
            <div className='relative bg-white rounded-2xl shadow-lg w-full max-w-md mx-4 p-6 flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-base font-semibold text-gray-900'>
                        {isEditing ? 'Editar usuário' : 'Novo usuário'}
                    </h2>
                    <button
                        onClick={onClose}
                        className='text-gray-400 hover:text-gray-600 transition-colors text-lg'
                    >
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-700'>Nome</label>
                        <input
                            name='name'
                            type='text'
                            value={form.name}
                            onChange={handleChange}
                            placeholder='Nome completo'
                            className={`
                                w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                                placeholder:text-gray-400 text-gray-900
                                ${errors.name
                                    ? 'border-red-400 bg-red-50'
                                    : 'border-gray-300 focus:border-blue-500'
                                }
                            `}
                        />
                        {errors.name && <p className='text-xs text-red-500'>{errors.name}</p>}
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-700'>E-mail</label>
                        <input
                            name='email'
                            type='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder='email@exemplo.com'
                            className={`
                                w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                                placeholder:text-gray-400 text-gray-900
                                ${errors.email
                                    ? 'border-red-400 bg-red-50'
                                    : 'border-gray-300 focus:border-blue-500'
                                }
                            `}
                        />
                        {errors.email && <p className='text-xs text-red-500'>{errors.email}</p>}
                    </div>

                    {!isEditing && (
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-sm font-medium text-gray-700'>Senha</label>
                            <input
                                name='password'
                                type='password'
                                value={form.password}
                                onChange={handleChange}
                                placeholder='••••••••'
                                className={`
                                    w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                                    placeholder:text-gray-400 text-gray-900
                                    ${errors.password
                                        ? 'border-red-400 bg-red-50'
                                        : 'border-gray-300 focus:border-blue-500'
                                    }
                                `}
                            />
                            {errors.password && <p className='text-xs text-red-500'>{errors.password}</p>}
                        </div>
                    )}

                    {!isEditing && (
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-sm font-medium text-gray-700'>Perfil</label>
                            <select
                                name='role'
                                value={form.role}
                                onChange={handleChange}
                                className='w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-blue-500 text-gray-900 bg-white'
                            >
                                <option value='user'>Usuário</option>
                                <option value='administrator'>Administrador</option>
                            </select>
                        </div>
                    )}

                    <div className='flex gap-2 justify-end pt-1'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors'
                        >
                            Cancelar
                        </button>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white transition-colors'
                        >
                            {isSubmitting
                                ? 'Salvando...'
                                : isEditing ? 'Salvar alterações' : 'Criar usuário'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}