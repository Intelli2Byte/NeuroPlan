import Layout from '../components/Layout';
import { Book, Plus, Search } from 'lucide-react';

export default function SubjectsPage() {
    return (
        <Layout showSidebar={true}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-6)' }}>
                <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold' }}>Subjects & Credits</h1>
                <button className="btn btn-primary" style={{ gap: '8px' }}>
                    <Plus size={18} /> Add Subject
                </button>
            </div>

            <div className="input-group" style={{ marginBottom: 'var(--spacing-6)' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} className="text-secondary" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Search subjects (e.g. DBMS, OS...)"
                        style={{ paddingLeft: '40px', width: '100%', maxWidth: '400px' }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-6)' }}>
                <SubjectCard name="DBMS" credits={4} university="Mumbai University" status="In Progress" />
                <SubjectCard name="Operating Systems" credits={3} university="Mumbai University" status="In Progress" />
                <SubjectCard name="Computer Networks" credits={4} university="Mumbai University" status="Not Started" />
            </div>
        </Layout>
    );
}

function SubjectCard({ name, credits, university, status }) {
    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Book size={20} color="var(--color-primary)" />
                </div>
                <div>
                    <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold' }}>{name}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{university}</p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '99px' }}>{credits} Credits</span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: status === 'In Progress' ? 'var(--color-primary)' : 'var(--color-text-secondary)', fontWeight: 'bold' }}>{status}</span>
            </div>
        </div>
    );
}
