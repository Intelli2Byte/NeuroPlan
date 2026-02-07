import Layout from '../components/Layout';
import QuoteHeader from '../components/QuoteHeader';
import { useUser } from '../context/UserContext';
import { useTimer } from '../context/TimerContext';
import { Calendar, Book, TrendingUp, Bell, CheckCircle, Lightbulb, Target, Rocket, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TimerModal from '../components/TimerModal';

export default function DashboardPage() {
    const { studentData } = useUser();
    const { seconds } = useTimer();
    const subjects = studentData.subjects || [];
    const [isTimerOpen, setIsTimerOpen] = useState(false);

    const formatTime = (totalSeconds) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        return `${hrs}h ${mins}m`;
    };

    return (
        <Layout showSidebar={true}>
            <QuoteHeader />
            <TimerModal isOpen={isTimerOpen} onClose={() => setIsTimerOpen(false)} />

            <div style={{ marginBottom: 'var(--spacing-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: 'var(--spacing-2)' }}>
                        Welcome back, {studentData.name || 'Student'}!
                    </h1>
                    <p className="text-secondary" style={{ fontSize: 'var(--font-size-sm)' }}>
                        Optimization Active: <strong>{subjects.length > 0 ? subjects.length : '0'} subjects</strong> analyzed.
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={14} /> Schedule Rebalanced 2h ago
                    </span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-8)' }}>
                <SummaryCard
                    icon={Calendar}
                    title="Today's Snapshot"
                    content="09:00 - 17:00"
                    link="/schedule"
                    footer="Next: DBMS (10 mins)"
                />
                <SummaryCard
                    icon={TrendingUp}
                    title="Avg. Progress"
                    content="68%"
                    link="/progress"
                    footer="On track for sem goals"
                />
                <SummaryCard
                    icon={Target}
                    title="Smart Focus"
                    content="Maths III"
                    link="/chat"
                    footer="High cognitive load area"
                />
                <div onClick={() => setIsTimerOpen(true)} style={{ cursor: 'pointer' }}>
                    <SummaryCard
                        icon={Clock}
                        title="Focus Today"
                        content={formatTime(seconds)}
                        link="#"
                        footer="Click to start session"
                        isTimer={true}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--spacing-6)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-4)' }}>
                            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Lightbulb size={20} color="var(--color-warning)" /> Intelligence Hub
                            </h3>
                            <Link to="/chat" style={{ fontSize: '12px', color: 'var(--color-primary)', textDecoration: 'none' }}>Ask AI</Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                            <InsightItem text="Revise Trees before Graphs to close prerequisite gap." />
                            <InsightItem text="Confidence in OS improved (2→3). Suggested rebalance: +30m to DBMS." />
                            <InsightItem text="High energy peak detected at 7 PM. Use this for Maths III." />
                        </div>
                    </div>

                    <div className="card" style={{ backgroundColor: 'var(--color-primary-light)', border: 'none' }}>
                        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: 'var(--spacing-4)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
                            <Rocket size={20} /> Outcome-Oriented Summary
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
                            <OutcomeStat label="Estimated Completion" value="April 12" />
                            <OutcomeStat label="Confidence Boost" value="+15%" />
                            <OutcomeStat label="Workload Reduction" value="22%" />
                            <OutcomeStat label="Ready for Exams" value="85%" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: 'var(--spacing-4)' }}>Next Action Steps</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                        <StepItem text="Complete DBMS Theory Part 1" done={true} />
                        <StepItem text="Solve Discrete Maths Prereqs" done={false} />
                        <StepItem text="Check Career Alerts" done={false} />
                        <StepItem text="Update Attendance" done={false} />
                        <StepItem text="Review Daily Insights" done={false} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function SummaryCard({ icon: Icon, title, content, link, footer, isTimer = false }) {
    const cardStyle = {
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid var(--color-border)',
        transition: 'all 0.2s',
        display: 'block',
        height: '100%',
        cursor: isTimer ? 'pointer' : 'pointer'
    };

    const content_node = (
        <div className="summary-card-hover" style={{ padding: 'var(--spacing-6)', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
                <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                    <Icon size={18} />
                </div>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600', color: 'var(--color-text-secondary)' }}>{title}</span>
            </div>
            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '4px', color: 'var(--color-text-main)' }}>{content}</div>
            <div style={{ fontSize: '11px', color: isTimer ? 'var(--color-primary)' : 'var(--color-success)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {footer} {link !== '#' && '→'}
            </div>
        </div>
    );

    if (link === '#') return <div style={cardStyle} className="card no-padding">{content_node}</div>;

    return (
        <Link to={link} className="card no-padding" style={cardStyle}>
            {content_node}
        </Link>
    );
}

function InsightItem({ text }) {
    return (
        <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-warning)' }}>
            <span style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--color-text-main)' }}>{text}</span>
        </div>
    );
}

function OutcomeStat({ label, value }) {
    return (
        <div>
            <p style={{ fontSize: '10px', color: 'var(--color-primary)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</p>
            <p style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: 'var(--color-text-main)' }}>{value}</p>
        </div>
    );
}

function StepItem({ text, done }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', padding: 'var(--spacing-2) 0', opacity: done ? 0.5 : 1 }}>
            <div style={{ width: '16px', height: '16px', border: '2px solid var(--color-border)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {done && <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-primary)', borderRadius: '2px' }}></div>}
            </div>
            <span style={{ fontSize: '12px', textDecoration: done ? 'line-through' : 'none', fontWeight: done ? '400' : '500' }}>{text}</span>
        </div>
    );
}
