import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import WizardStep1 from '../components/WizardStep1';
import WizardStep2 from '../components/WizardStep2';
import WizardStep3 from '../components/WizardStep3';
import WizardStep4 from '../components/WizardStep4';
import { useUser } from '../context/UserContext';
import { ArrowLeft } from 'lucide-react';

export default function WizardPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { studentData, updateStudentData } = useUser();
    const [step, setStep] = useState(location.state?.step || 1);
    const [data, setData] = useState(location.state?.studentData || studentData);

    const updateData = (newData) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else {
            updateStudentData(data);
            navigate('/dashboard');
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <WizardStep1 data={data} updateData={updateData} />;
            case 2: return <WizardStep2 data={data} updateData={updateData} />;
            case 3: return <WizardStep3 data={data} updateData={updateData} />;
            case 4: return <WizardStep4 data={data} updateData={updateData} />;
            default: return null;
        }
    };

    return (
        <Layout>
            <div className="container" style={{ maxWidth: '800px', marginTop: 'var(--spacing-8)' }}>
                <div className="card">
                    <div style={{ marginBottom: 'var(--spacing-6)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
                            <p className="text-secondary" style={{ fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Step {step} of 4</p>
                            {location.state?.fromSettings && (
                                <button
                                    onClick={() => navigate('/settings')}
                                    className="btn-ghost"
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', padding: '4px 8px' }}
                                >
                                    <ArrowLeft size={14} /> Back to Settings
                                </button>
                            )}
                        </div>
                        <div style={{ width: '100%', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '4px' }}>
                            <div style={{ width: `${(step / 4) * 100}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px', transition: 'width 0.3s' }}></div>
                        </div>
                    </div>

                    <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-6)' }}>
                        {step === 1 && "Basic Information"}
                        {step === 2 && "Subject Intelligence"}
                        {step === 3 && "Daily Routine"}
                        {step === 4 && "Goal Alignment"}
                    </h1>

                    <div style={{ minHeight: '350px' }}>
                        {renderStep()}
                    </div>

                    <div className="actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-8)' }}>
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className="btn btn-secondary"
                            style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
                        >
                            Back
                        </button>
                        <button onClick={handleNext} className="btn btn-primary">
                            {step === 4 ? 'Build My NeuroPlan' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
