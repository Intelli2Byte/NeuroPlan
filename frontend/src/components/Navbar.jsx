import { Link } from 'react-router-dom';
import { BookOpen, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import ProductivityTimer from './ProductivityTimer';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated } = useUser();

    return (
        <nav style={{
            height: '64px',
            backgroundColor: 'var(--color-bg-card)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--spacing-8)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                <BookOpen size={24} color="var(--color-primary)" />
                <Link to="/" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-text-main)', textDecoration: 'none' }}>
                    NeuroPlan
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                {isAuthenticated && <ProductivityTimer />}
                <button
                    onClick={toggleTheme}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
        </nav>
    );
}
