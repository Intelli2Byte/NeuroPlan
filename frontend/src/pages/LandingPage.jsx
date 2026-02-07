import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Brain, Clock, Zap, BookOpen } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function LandingPage() {
    const { isAuthenticated } = useUser();

    return (
        <Layout>
            <div className="landing-container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', paddingTop: 'var(--spacing-12)' }}>
                <div className="hero">
                    <h1 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-4)' }}>
                        Your Academic <span className="text-primary">Operating System</span>
                    </h1>
                    <p className="text-secondary" style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-8)', maxWidth: '600px', margin: '0 auto var(--spacing-8)' }}>
                        NeuroPlan helps Indian engineering students master their schedule, track credits, and stay ahead with real-time internship alerts.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'center' }}>
                        {isAuthenticated ? (
                            <Link to="/dashboard" className="btn btn-primary" style={{ padding: 'var(--spacing-3) var(--spacing-6)', fontSize: 'var(--font-size-base)' }}>Go to Dashboard</Link>
                        ) : (
                            <>
                                <Link to="/auth" className="btn btn-primary" style={{ padding: 'var(--spacing-3) var(--spacing-6)', fontSize: 'var(--font-size-base)' }}>Get Started</Link>
                                <Link to="/auth" className="btn btn-secondary" style={{ padding: 'var(--spacing-3) var(--spacing-6)', fontSize: 'var(--font-size-base)' }}>Login</Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="features-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--spacing-6)',
                    marginTop: 'var(--spacing-12)',
                    textAlign: 'left'
                }}>
                    <FeatureCard icon={Brain} title="Smart Analysis" description="Understands your academic workload and adapts to your pace." />
                    <FeatureCard icon={Clock} title="Adaptive Planning" description="Dynamic schedules that evolve as you progress." />
                    <FeatureCard icon={Zap} title="Cognitive Balancing" description="We balances heavy subjects with lighter ones to prevent burnout." />
                    <FeatureCard icon={BookOpen} title="Gap Identification" description="Identifies prerequisites and foundational gaps automatically." />
                </div>
            </div>
        </Layout>
    );
}

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)'
            }}>
                <Icon size={20} />
            </div>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600' }}>{title}</h3>
            <p className="text-secondary" style={{ fontSize: 'var(--font-size-sm)' }}>{description}</p>
        </div>
    );
}
