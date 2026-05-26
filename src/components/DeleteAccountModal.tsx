interface DeleteAccountModalProps {
    isOpen: boolean;
    password: string;
    passwordError: string;
    isSubmitting: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DeleteAccountModal({
    isOpen,
    password,
    passwordError,
    isSubmitting,
    onClose,
    onConfirm,
    onPasswordChange,
}: DeleteAccountModalProps) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/40' onClick={onClose} />
            <div className='relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg w-full max-w-md mx-4 p-6 flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-base font-semibold text-gray-900 dark:text-white'>
                        Remover conta
                    </h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Esta ação é irreversível. Sua conta será desativada imediatamente e você será desconectado.
                    </p>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Digite sua senha para confirmar
                    </label>
                    <input
                        type='password'
                        value={password}
                        onChange={onPasswordChange}
                        placeholder='••••••••'
                        autoFocus
                        className={`
                            w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
                            placeholder:text-gray-400 dark:placeholder:text-gray-600
                            text-gray-900 dark:text-white
                            ${passwordError
                                ? 'border-red-400 bg-red-50 dark:bg-red-950'
                                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-red-500'
                            }
                        `}
                    />
                    {passwordError && (
                        <p className='text-xs text-red-500'>{passwordError}</p>
                    )}
                </div>
                <div className='flex gap-2 justify-end'>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className='
                            px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700
                            text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800
                            disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                        '
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className='
                            px-4 py-2 text-sm rounded-lg border border-transparent
                            bg-red-600 hover:bg-red-700 text-white
                            disabled:bg-red-400 disabled:cursor-not-allowed transition-colors
                        '
                    >
                        {isSubmitting ? 'Removendo...' : 'Remover conta'}
                    </button>
                </div>
            </div>
        </div>
    );
};