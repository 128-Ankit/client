import React from 'react';

const AuthLayout = ({ children, title, subtitle, features }) => {
    return (
        <div className="min-h-screen bg-[#020420] pt-5 flex">
            {/* Left Side - Brand Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-white">
                <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-t from-white via-transparent to-transparent"></div>
                <div className="relative z-10 px-16 flex flex-col justify-center">
                    <div className="absolute -left-20 -top-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                    <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                    
                    <h1 className="text-blue-600 text-6xl font-bold leading-tight mb-6">
                        {title}
                    </h1>
                    <p className="text-gray-800 text-lg mb-8">{subtitle}</p>
                    <div className="grid grid-cols-2 gap-4">
                        {features.map((item) => (
                            <div key={item} className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 hover:border-blue-500 transition-colors">
                                <span className="text-blue-600 text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white relative overflow-hidden">
                <div className="w-full max-w-md relative">
                    <div className="absolute -left-20 top-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                    <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
