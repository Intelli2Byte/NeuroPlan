export function generateStudyPlan(data) {
    if (!data || !data.subjects || data.subjects.length === 0) return null;

    // Enhance subjects with difficulty score
    const subjects = data.subjects.map(s => ({
        ...s,
        // Formula: Credits * (6 - Confidence). 
        // Example: 4 credits * (6 - 2 conf) = 16. 
        // Example: 2 credits * (6 - 5 conf) = 2.
        difficulty: (s.credits || 3) * (6 - (s.confidence || 3)),
    }));

    const totalDifficulty = subjects.reduce((sum, s) => sum + s.difficulty, 0);
    const totalHours = (data.weekdayHours || 2) * 5 + (data.weekendHours || 5) * 2;

    // Calculate allocations
    const allocations = subjects.map(s => ({
        ...s,
        percentage: totalDifficulty > 0 ? Math.round((s.difficulty / totalDifficulty) * 100) : 0,
        recommendedHours: totalDifficulty > 0 ? Math.round((s.difficulty / totalDifficulty) * totalHours) : 0
    })).sort((a, b) => b.percentage - a.percentage); // Sort by highest allocation

    // Generate Insights
    const insights = [];
    const lowConfidence = subjects.filter(s => (s.confidence || 3) < 3);
    if (lowConfidence.length > 0) {
        insights.push(`Prioritize ${lowConfidence.map(s => s.name).join(', ')} due to lower confidence scores.`);
    }

    const highCredits = subjects.filter(s => (s.credits || 3) >= 4);
    if (highCredits.length > 0) {
        insights.push(`${highCredits[0].name} has a high credit weight. Ensure you break it down into smaller sessions.`);
    }

    if (data.preferredTime === 'night') {
        insights.push("Since you prefer night study, schedule complex topics like " + (allocations[0]?.name || 'Math') + " during your peak hours.");
    }

    // Mock Schedule Grid
    // Simply distributing top 3 subjects across the week for demo
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const schedule = {};

    days.forEach((day, index) => {
        // Round robin assignment for demo
        const subject1 = allocations[index % allocations.length];
        const subject2 = allocations[(index + 1) % allocations.length];

        schedule[day] = [
            { id: 1, subject: subject1.name, time: '1 hr', type: 'Concept' },
            { id: 2, subject: subject2.name, time: '1 hr', type: 'Practice' }
        ];
    });

    return {
        allocations,
        schedule,
        insights,
        stats: {
            totalSubjects: subjects.length,
            studyHealth: totalDifficulty > 50 ? 'Intense' : 'Balanced',
            cognitiveLoad: totalDifficulty > 50 ? 'High' : 'Moderate',
            weeklyHours: totalHours
        }
    };
}
