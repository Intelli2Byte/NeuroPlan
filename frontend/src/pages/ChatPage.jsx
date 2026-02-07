import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { Send, User, Bot, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';

export default function ChatPage() {
    const { studentData } = useUser();
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text: `Hello ${studentData.name || 'there'}! I'm NeuroPlan AI, your guide at ${studentData.university || 'your university'}. How can I help you optimize your ${studentData.course || 'academic'} journey today?`
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim() || isTyping) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response based on student data
        setTimeout(() => {
            const subjects = studentData.subjects || [];
            const subjectNames = subjects.map(s => s.name).join(', ');

            let response = "That's an interesting question! Based on your current profile, I recommend looking into more focused study sessions for your core subjects.";

            if (userMsg.toLowerCase().includes('schedule') || userMsg.toLowerCase().includes('time')) {
                response = `Looking at your ${studentData.collegeStartTime}-${studentData.collegeEndTime} college schedule, I've optimized your after-hours. You have great energy peaks in the evening—perfect for high-load subjects like ${subjects[0]?.name || 'your main course'}.`;
            } else if (userMsg.toLowerCase().includes('subject') || userMsg.toLowerCase().includes('study')) {
                if (subjects.length > 0) {
                    response = `You're currently taking ${subjectNames}. I noticed some may have high cognitive loads. Would you like a breakdown of how to tackle ${subjects[0]?.name} more effectively?`;
                } else {
                    response = "I see you haven't added many subjects yet. Head over to the Subjects page so I can give you a more personalized study plan!";
                }
            } else if (userMsg.toLowerCase().includes('hello') || userMsg.toLowerCase().includes('hi')) {
                response = `Hi ${studentData.name || 'Student'}! Ready to smash your goals for ${studentData.semester || 'this'} semester?`;
            } else if (userMsg.toLowerCase().includes('help')) {
                response = "I can help you with: 1) Schedule optimization, 2) Identifying study gaps, 3) Managing exam stress, or 4) Explaining complex topics. What's on your mind?";
            }

            setMessages(prev => [...prev, { role: 'bot', text: response }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <Layout showSidebar={true}>
            <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={24} color="var(--color-primary)" /> AI Academic Guide
                    </h1>
                    <p className="text-secondary" style={{ fontSize: 'var(--font-size-sm)' }}>Ask about study strategies, weak areas, or schedule optimization.</p>
                </div>

                <div className="card" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-bg-app)',
                    border: '1px solid var(--color-border)'
                }}>
                    <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        <AnimatePresence>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                        gap: 'var(--spacing-3)',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg-card)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: 'var(--shadow-sm)',
                                        border: '1px solid var(--color-border)'
                                    }}>
                                        {msg.role === 'user' ? <User size={16} color="white" /> : <Bot size={16} color="var(--color-primary)" />}
                                    </div>
                                    <div style={{
                                        maxWidth: '70%',
                                        padding: 'var(--spacing-3) var(--spacing-4)',
                                        borderRadius: 'var(--radius-lg)',
                                        borderTopLeftRadius: msg.role === 'bot' ? 0 : 'var(--radius-lg)',
                                        borderTopRightRadius: msg.role === 'user' ? 0 : 'var(--radius-lg)',
                                        backgroundColor: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg-card)',
                                        color: msg.role === 'user' ? 'white' : 'var(--color-text-main)',
                                        fontSize: 'var(--font-size-sm)',
                                        boxShadow: 'var(--shadow-sm)',
                                        lineHeight: '1.5'
                                    }}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ display: 'flex', gap: 'var(--spacing-3)', alignItems: 'center' }}
                                >
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        backgroundColor: 'var(--color-bg-card)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '1px solid var(--color-border)'
                                    }}>
                                        <Bot size={16} color="var(--color-primary)" />
                                    </div>
                                    <div style={{ padding: '8px 16px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-secondary)', fontSize: '12px', display: 'flex', gap: '4px' }}>
                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>•</motion.span>
                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>•</motion.span>
                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>•</motion.span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div ref={chatEndRef} />
                    </div>

                    <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    className="input-field"
                                    placeholder="Ask your AI Guide..."
                                    style={{ width: '100%', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-app)', paddingRight: '40px' }}
                                />
                                <Wand2 size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={isTyping}
                                className="btn btn-primary"
                                style={{ width: '45px', height: '45px', padding: 0, borderRadius: 'var(--radius-lg)', opacity: isTyping ? 0.6 : 1 }}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
