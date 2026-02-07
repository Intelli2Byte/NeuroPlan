import Layout from '../components/Layout';
import QuoteHeader from '../components/QuoteHeader';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { Clock, Bell, Info, ShieldAlert, Zap, BookOpen, Layers, Layout as LayoutIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SchedulePage() {
    const { studentData } = useUser();
    const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const getCognitiveLoad = (subjectName) => {
        if (subjectName.toLowerCase().includes('math') || subjectName.toLowerCase().includes('algorithm')) return 'High';
        if (subjectName.toLowerCase().includes('dbms') || subjectName.toLowerCase().includes('os')) return 'Medium';
        return 'Low';
    };

    const getLoadColor = (load) => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        switch (load) {
            case 'High': return {
                bg: isDark ? '#450a0a' : '#FEE2E2',
                border: '#EF4444',
                text: isDark ? '#fca5a5' : '#B91C1C',
                icon: ShieldAlert
            };
            case 'Medium': return {
                bg: isDark ? '#172554' : '#DBEAFE',
                border: '#3B82F6',
                text: isDark ? '#93c5fd' : '#1E40AF',
                icon: Zap
            };
            case 'Low': return {
                bg: isDark ? '#052c16' : '#DCFCE7',
                border: '#10B981',
                text: isDark ? '#86efac' : '#166534',
                icon: BookOpen
            };
            default: return { bg: 'transparent', border: 'var(--color-border)', text: 'var(--color-text-main)', icon: Layers };
        }
    };

    return (
        <Layout showSidebar={true}>
            <QuoteHeader />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-6)' }}>
                <div>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-text-main)' }}>Intelligence Timetable</h1>
                    <p className="text-secondary" style={{ fontSize: 'var(--font-size-sm)' }}>
                        College Timings: <strong style={{ color: 'var(--color-primary)' }}>{studentData.collegeStartTime} - {studentData.collegeEndTime}</strong>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link to="/dashboard" className="btn btn-secondary" style={{ fontSize: '12px', gap: '8px' }}>
                        <LayoutIcon size={14} /> Dashboard
                    </Link>
                    <div style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '8px 16px', borderRadius: 'var(--radius-md)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--color-primary)' }}>
                        <Bell size={14} />
                        <span>Next: Practice DBMS (10:00 AM)</span>
                    </div>
                </div>
            </div>

            <div className="card" style={{
                padding: 0,
                overflow: 'hidden',
                height: 'calc(100vh - 280px)',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-card)'
            }}>
                <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0, textAlign: 'left', minWidth: '800px' }}>
                        <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--color-bg-card)' }}>
                            <tr>
                                <th style={{ padding: 'var(--spacing-4)', borderBottom: '2px solid var(--color-border)', borderRight: '1px solid var(--color-border)', width: '100px', backgroundColor: 'var(--color-bg-app)', color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase' }}>Time</th>
                                {days.map(day => (
                                    <th key={day} style={{ padding: 'var(--spacing-4)', borderBottom: '2px solid var(--color-border)', borderRight: '1px solid var(--color-border)', fontWeight: 'bold', color: 'var(--color-primary)', backgroundColor: 'var(--color-bg-app)' }}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timeSlots.map((time, idx) => {
                                const isCollegeTime = time >= studentData.collegeStartTime && time < studentData.collegeEndTime;
                                return (
                                    <tr key={time}>
                                        <td style={{ padding: 'var(--spacing-4)', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: '600', backgroundColor: 'var(--color-bg-app)' }}>{time}</td>
                                        {days.map(day => {
                                            const subject = idx % 3 === 0 ? 'DBMS' : (idx % 4 === 0 ? 'Maths III' : 'Networking');
                                            const load = getCognitiveLoad(subject);
                                            const theme = getLoadColor(load);
                                            const Icon = theme.icon;

                                            return (
                                                <td key={`${day}-${time}`} style={{ overflow: 'hidden', padding: '6px', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', backgroundColor: isCollegeTime ? 'rgba(14, 165, 233, 0.1)' : 'transparent' }}>
                                                    {isCollegeTime ? (
                                                        <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>At College</div>
                                                    ) : (
                                                        idx > 9 ? (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                style={{
                                                                    padding: '8px',
                                                                    backgroundColor: theme.bg,
                                                                    borderRadius: 'var(--radius-md)',
                                                                    borderLeft: `4px solid ${theme.border}`,
                                                                    fontSize: '11px',
                                                                    height: '100%',
                                                                    border: `1px solid ${theme.border}44`,
                                                                    borderLeftWidth: '4px'
                                                                }}
                                                            >
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                                                    <span style={{ fontWeight: 'bold', color: theme.text }}>{subject}</span>
                                                                    <Icon size={12} color={theme.text} />
                                                                </div>
                                                                <div style={{ display: 'flex', gap: '4px', opacity: 0.8 }}>
                                                                    <span style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', color: theme.text }}>{idx % 2 === 0 ? 'Practice' : 'Learning'}</span>
                                                                    <span style={{ fontSize: '9px', color: theme.text }}>• {load} Load</span>
                                                                </div>
                                                            </motion.div>
                                                        ) : null
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ marginTop: 'var(--spacing-6)', display: 'flex', gap: 'var(--spacing-6)', flexWrap: 'wrap', backgroundColor: 'var(--color-bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <LegendItem load="High" label="High Cognitive Load" color="#EF4444" />
                <LegendItem load="Medium" label="Medium Load" color="#3B82F6" />
                <LegendItem load="Low" label="Low Load (Quick Wins)" color="#10B981" />
                <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--color-border)' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    <Layers size={14} /> Mode: Focused Learning
                </div>
            </div>
        </Layout>
    );
}

function LegendItem({ color, label, load }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: color, borderRadius: '2px' }}></div>
            <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--color-text-main)' }}>{label}</span>
        </div>
    );
}
