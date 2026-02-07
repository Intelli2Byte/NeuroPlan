import { Layout, Calendar, Book, TrendingUp, Settings, Rocket, Bell, MessageSquare, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useUser } from '../context/UserContext';

const navItems = [
    { icon: Layout, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: Book, label: 'Subjects', path: '/subjects' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: MessageSquare, label: 'AI Chatbot', path: '/chat' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

const futureItems = [
    { icon: Bell, label: 'Internship Alerts', path: '/innovations' },
    { icon: Rocket, label: 'Future Innovations', path: '/innovations' },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside style={{
            width: '260px',
            backgroundColor: 'var(--color-bg-card)',
            borderRight: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 64px)',
            position: 'sticky',
            top: '64px'
        }}>
            <div style={{ padding: 'var(--spacing-4) 0', flex: 1 }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link key={item.path} to={item.path} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)',
                            padding: 'var(--spacing-3) var(--spacing-6)',
                            color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                            textDecoration: 'none',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 500,
                            borderRight: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                            transition: 'all 0.2s'
                        }}>
                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            <div style={{ padding: 'var(--spacing-4) 0', borderTop: '1px solid var(--color-border)' }}>
                <p style={{ padding: '0 var(--spacing-6) var(--spacing-4)', fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Smart Features</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', marginBottom: 'var(--spacing-6)' }}>
                    {futureItems.map((item) => (
                        <Link key={item.label} to={item.path} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-3)',
                            padding: 'var(--spacing-2) var(--spacing-6)',
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                            fontSize: 'var(--font-size-sm)',
                            opacity: item.label.includes('Future') ? 0.6 : 1
                        }}>
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    ))}
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-3)',
                        padding: 'var(--spacing-3) var(--spacing-6)',
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-error)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 500,
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
