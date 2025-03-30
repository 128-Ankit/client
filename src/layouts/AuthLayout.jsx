import React from 'react'

const AuthLayout = ({ children, title, subtitle, features }) => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 whitespace-pre-line mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-lg mb-8">{subtitle}</p>
          <div className="space-y-4">
            {features?.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          © 2024 Your Company. All rights reserved.
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout