// Shared by survey.html and results.html.
window.SURVEY = {
  // Paste your Google Apps Script web app URL here (see SURVEY_SETUP.md).
  endpoint: 'https://script.google.com/macros/s/AKfycbwIq81c_vFJNbZ__Caklbo9gt0YmZhWYC8naoIv1_4--HES41sv9WO5bspA2fCbyQUU/exec',

  sections: [
    {
      title: 'Athletic Background',
      questions: [
        { id: 'q1', type: 'radio', label: 'What was the highest level of sports you competed at?',
          options: ['High school', 'Junior college', 'NCAA Division I', 'NCAA Division II', 'NCAA Division III', 'NAIA', 'Professional', 'Other'] },
        { id: 'q2', type: 'radio', label: 'How long has it been since you stopped competing?',
          options: ['Less than 6 months', '6–12 months', '1–2 years', '3–5 years', 'More than 5 years'] }
      ]
    },
    {
      title: 'Challenges',
      questions: [
        { id: 'q3', type: 'checkbox', label: 'What have been your biggest challenges transitioning away from sports?',
          options: ['Finding a career', 'Losing a structured routine', 'Loss of athletic identity', 'Financial adjustments', 'Mental or emotional challenges', 'Maintaining physical fitness', 'Finding a new purpose', 'Building relationships outside sports', 'Other', 'No significant challenges'],
          exclusive: 'No significant challenges' },
        { id: 'q4', type: 'scale', label: 'How prepared did you feel for life after sports?',
          min: 1, max: 5, minLabel: 'Not prepared at all', maxLabel: 'Extremely prepared' },
        { id: 'q5', type: 'text', label: 'What is one challenge you wish you had been better prepared for?' }
      ]
    },
    {
      title: 'Positive Experiences',
      questions: [
        { id: 'q6', type: 'checkbox', label: 'What have been the most positive aspects of life after sports?',
          options: ['More personal freedom', 'More time with family and friends', 'New career opportunities', 'Discovering new interests', 'Personal growth', 'Less physical stress', 'Financial opportunities', 'Building a new identity', 'Other', 'No significant positives yet'],
          exclusive: 'No significant positives yet' },
        { id: 'q7', type: 'checkbox', label: 'What skills from sports have helped you most in everyday life?',
          options: ['Discipline', 'Leadership', 'Teamwork', 'Communication', 'Time management', 'Resilience', 'Adaptability', 'Other'] },
        { id: 'q8', type: 'text', label: "What is something positive you've accomplished or discovered about yourself since leaving sports?" }
      ]
    },
    {
      title: 'Support and Opportunities',
      questions: [
        { id: 'q9', type: 'checkbox', label: 'What resources or support would have made your transition easier?',
          options: ['Career development and job placement', 'Mentorship from former athletes', 'Financial education', 'Mental health support', 'Fitness and wellness programs', 'Networking opportunities', 'Goal setting and accountability', 'Other', 'No additional support needed'],
          exclusive: 'No additional support needed' },
        { id: 'q10', type: 'text', label: 'If you could change one thing about how athletes are prepared for life after sports, what would it be?' }
      ]
    }
  ]
};
