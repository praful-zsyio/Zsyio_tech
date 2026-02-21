import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Auth context expects (username, password), but our "username" is the email
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        }
        // Errors are silently ignored
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--base))] text-[hsl(var(--text))] px-4">
            <div className="max-w-md w-full bg-[hsl(var(--mantle))] p-8 rounded-2xl border border-[hsl(var(--surface1))] shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--blue))] to-[hsl(var(--purple))]">
                    Welcome Back
                </h2>



                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--subtext0))] mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--overlay0))]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[hsl(var(--base))] border border-[hsl(var(--surface0))] rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[hsl(var(--blue))] transition-colors"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[hsl(var(--subtext0))] mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--overlay0))]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[hsl(var(--base))] border border-[hsl(var(--surface0))] rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[hsl(var(--blue))] transition-colors"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[hsl(var(--blue))] hover:bg-[hsl(var(--sapphire))] text-white font-semibold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
