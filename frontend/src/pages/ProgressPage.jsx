import Layout from '../components/Layout';
import { TrendingUp, CheckCircle, Clock, AlertTriangle, Calendar, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProgressPage() {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.autoPrint) {
            // Wait for animations to settle
            const timer = setTimeout(() => {
                window.print();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const stats = [
        { icon: CheckCircle, label: "Tasks Done", value: "24", color: "green" },
        { icon: Clock, label: "Study Hours", value: "128h", color: "blue" },
        { icon: TrendingUp, label: "Consistency", value: "82%", color: "orange" },
        { icon: Calendar, label: "Days Active", value: "12", color: "red" }
    ];

    const subjects = [
        { label: "DBMS", progress: 75, color: "#10B981", load: "Med" },
        { label: "Operating Systems", progress: 40, color: "#3B82F6", load: "Med" },
        { label: "Engineering Maths", progress: 15, color: "#EF4444", load: "High" },
        { label: "Computer Networks", progress: 60, color: "#F59E0B", load: "Low" }
    ];

    return (
        <Layout showSidebar={true}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: 'var(--spacing-6)' }}>Academic Performance</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-8)' }}>
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>

            <div className="card">
                <h2 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-6)', fontWeight: 'bold' }}>Subject-wise Completion</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
                    {subjects.map((sub, idx) => (
                        <motion.div
                            key={sub.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.15 }}
                        >
                            <ProgressBar {...sub} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

function StatCard({ icon: Icon, label, value, color }) {
    const colors = { green: '#10B981', blue: '#3B82F6', orange: '#F59E0B', red: '#EF4444' };
    return (
        <div className="card" style={{ padding: 'var(--spacing-4)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', border: '1px solid var(--color-border)' }}>
            <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: `${colors[color]}15`, color: colors[color] }}>
                <Icon size={24} />
            </div>
            <div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '2px', fontWeight: '600', textTransform: 'uppercase' }}>{label}</p>
                <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold' }}>{value}</p>
            </div>
        </div>
    );
}

function ProgressBar({ label, progress, color, load }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'flex-end' }}>
                <div>
                    <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', display: 'block' }}>{label}</span>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>Load: {load}</span>
                </div>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: color }}>{progress}% Complete</span>
            </div>
            <div style={{ width: '100%', height: '12px', backgroundColor: 'var(--color-bg-app)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ height: '100%', backgroundColor: color, borderRadius: '6px' }}
                ></motion.div>
            </div>
        </div>
    );
}
