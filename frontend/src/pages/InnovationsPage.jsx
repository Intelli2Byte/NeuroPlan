import Layout from '../components/Layout';
import { Briefcase, Zap, Star, ExternalLink } from 'lucide-react';

export default function InnovationsPage() {
    return (
        <Layout showSidebar={true}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: 'var(--spacing-2)' }}>Future Innovations</h1>
            <p className="text-secondary" style={{ marginBottom: 'var(--spacing-8)' }}>AI-powered career guidance and real-time opportunities.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
                <InnovationCard
                    icon={Briefcase}
                    title="Internship Alerts"
                    active={true}
                    description="Real-time notifications for internships matching your skill set and university course."
                    tags={['Active', 'Real-time']}
                />
                <InnovationCard
                    icon={Zap}
                    title="Skill Recommendations"
                    active={false}
                    description="AI will analyze your subjects and suggest high-demand industry skills to learn."
                    tags={['Planned']}
                />
                <InnovationCard
                    icon={Star}
                    title="Hackathon Tracker"
                    active={false}
                    description="Never miss a competition. Integrated tracker for national and international hackathons."
                    tags={['Upcoming']}
                />
            </div>

            <div className="card" style={{ marginTop: 'var(--spacing-8)', backgroundColor: 'var(--color-primary-light)', border: 'none' }}>
                <h2 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-primary-hover)', marginBottom: 'var(--spacing-2)' }}>Current Opportunities</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                    <OpportunityItem title="Software Dev Intern" company="Google India" location="Bangalore" stipend="Competitive" />
                    <OpportunityItem title="Data Analytics Intern" company="TCS" location="Remote" stipend="Paid" />
                </div>
            </div>
        </Layout>
    );
}

function InnovationCard({ icon: Icon, title, description, tags, active }) {
    return (
        <div className="card" style={{ opacity: active ? 1 : 0.7 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-4)' }}>
                <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: active ? 'var(--color-primary-light)' : '#F3F4F6' }}>
                    <Icon size={24} color={active ? 'var(--color-primary)' : '#9CA3AF'} />
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {tags.map(tag => (
                        <span key={tag} style={{ fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', backgroundColor: tag === 'Active' ? '#DCFCE7' : '#F3F4F6', color: tag === 'Active' ? '#166534' : '#4B5563' }}>{tag}</span>
                    ))}
                </div>
            </div>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: 'var(--spacing-2)' }}>{title}</h3>
            <p className="text-secondary" style={{ fontSize: 'var(--font-size-sm)', lineHeight: '1.4' }}>{description}</p>
        </div>
    );
}

function OpportunityItem({ title, company, location, stipend }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)' }}>
            <div>
                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>{title}</h4>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{company} • {location}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-success)' }}>{stipend}</p>
                <button className="btn-ghost" style={{ fontSize: '11px', padding: '0', height: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Apply Now <ExternalLink size={10} />
                </button>
            </div>
        </div>
    );
}
