import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const { login, isAuthenticated } = useUser();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({
                email,
                ...(isLogin ? {} : { name })
            });
            // Immediate navigation after state update
            navigate('/dashboard');
        } catch (error) {
            console.error('Authentication failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <Layout>
            <div style={{ maxWidth: '400px', margin: 'var(--spacing-12) auto' }}>
                <div className="card">
                    <h2 className="text-center" style={{ marginBottom: 'var(--spacing-6)' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        {!isLogin && (
                            <div className="input-group">
                                <label className="input-label">Full Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="student@college.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--spacing-2)' }}>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-center text-secondary" style={{ marginTop: 'var(--spacing-4)', fontSize: 'var(--font-size-sm)' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="btn-ghost"
                            style={{ padding: '0', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
