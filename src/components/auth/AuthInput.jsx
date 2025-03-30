import React from 'react';

const AuthInput = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    icon: Icon,
    ...props
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-gray-700 text-sm font-medium mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                )}
                <input
                    type={type}
                    className={`
                        w-full
                        px-4 py-2
                        ${Icon ? 'pl-10' : ''}
                        border
                        rounded-lg
                        bg-white
                        text-gray-700
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        placeholder-gray-400
                        ${error ? 'border-red-500' : 'border-gray-300'}
                        transition-all
                    `}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default AuthInput;
