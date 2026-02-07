import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children, showSidebar = false }) {
    return (
        <div className="layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ display: 'flex', flex: 1 }}>
                {showSidebar && <Sidebar />}
                <main style={{ flex: 1, padding: 'var(--spacing-6)', backgroundColor: 'var(--color-bg-app)' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
