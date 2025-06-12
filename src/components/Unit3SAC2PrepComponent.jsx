import React, { useState, useEffect } from "react";
import InteractiveAnnotationComponent from "./InteractiveAnnotationComponent.jsx";
import InteractiveMappingComponent from "./InteractiveMappingComponent.jsx";

// Comprehensive stimulus bank
const stimuli = {
  s1: {
    title: "Australian Health Survey Data",
    content: `<p><strong>Australian Health Survey 2022-23 Key Findings:</strong></p>
    <ul>
    <li>67% of adults are overweight or obese (BMI ≥25)</li>
    <li>Only 29% of adults meet physical activity guidelines</li>
    <li>15% of adults experience high levels of psychological distress</li>
    <li>Regional areas show 23% higher rates of preventable chronic diseases</li>
    </ul>
    <p><strong>Socioeconomic Disparities:</strong> Lowest socioeconomic areas have 2.1x higher rates of diabetes and 1.8x higher cardiovascular disease rates.</p>`
  },
  s2: {
    title: "Youth Mental Health Statistics",
    content: `<p><strong>Young Minds Matter Report 2023:</strong></p>
    <table border="1" style="border-collapse: collapse; width: 100%;">
    <tr><th>Age Group</th><th>Anxiety Disorders</th><th>Depression</th><th>Help-Seeking</th></tr>
    <tr><td>12-17 years</td><td>16.9%</td><td>5.8%</td><td>42%</td></tr>
    <tr><td>18-24 years</td><td>19.2%</td><td>8.3%</td><td>38%</td></tr>
    </table>
    <p>Barriers to help-seeking: stigma (67%), cost (45%), long wait times (38%), lack of culturally appropriate services (29%).</p>`
  },
  s3: {
    title: "Primary Healthcare Access",
    content: `<p><strong>GP Access and Bulk Billing Rates 2023:</strong></p>
    <ul>
    <li>National bulk billing rate: 77% (down from 85% in 2019)</li>
    <li>Average GP consultation fee: $89 (Medicare rebate: $41.20)</li>
    <li>Rural areas: 1 GP per 1,200 residents vs. 1 per 800 in cities</li>
    <li>Appointment wait times: 2-3 weeks for routine care</li>
    </ul>
    <p><strong>Impact:</strong> 1.2 million Australians delayed or avoided healthcare due to cost in 2022-23.</p>`
  },
  s4: {
    title: "Food Security and Nutrition",
    content: `<p><strong>Australian Food Security Report 2023:</strong></p>
    <ul>
    <li>3.7 million Australians experienced food insecurity in past year</li>
    <li>Low-income households spend 25% of income on food vs. 12% for high-income</li>
    <li>Remote communities: fresh produce costs 36% more than urban areas</li>
    <li>School breakfast programs reach 180,000 children nationally</li>
    </ul>
    <p>Food insecurity correlates with higher rates of obesity, diabetes, and mental health issues.</p>`
  },
  s5: {
    title: "Environmental Health Factors",
    content: `<p><strong>Environmental Health Impact Assessment 2023:</strong></p>
    <ul>
    <li>Air pollution causes 5,000 premature deaths annually</li>
    <li>Heat-related hospital admissions increased 38% (2018-2023)</li>
    <li>Poor housing conditions affect 400,000 households</li>
    <li>Water quality issues in 12% of remote Indigenous communities</li>
    </ul>
    <p>Climate change is recognized as the greatest health threat of the 21st century by WHO.</p>`
  },
  s6: {
    title: "Indigenous Health Outcomes",
    content: `<p><strong>Indigenous Health Report 2023:</strong></p>
    <table border="1" style="border-collapse: collapse; width: 100%;">
    <tr><th>Health Indicator</th><th>Indigenous</th><th>Non-Indigenous</th><th>Gap</th></tr>
    <tr><td>Life Expectancy (years)</td><td>73.6</td><td>81.9</td><td>8.3 years</td></tr>
    <tr><td>Infant Mortality (per 1000)</td><td>6.2</td><td>3.1</td><td>2x higher</td></tr>
    <tr><td>Diabetes Rate (%)</td><td>12.8</td><td>4.9</td><td>2.6x higher</td></tr>
    </table>
    <p>Social determinants: 24% live in overcrowded housing, 17% lack access to clean water.</p>`
  },
  s7: {
    title: "Health Expenditure Analysis",
    content: `<p><strong>Australian Health Expenditure 2022-23:</strong></p>
    <ul>
    <li>Total health spending: $220 billion (10.7% of GDP)</li>
    <li>Government funding: 67%, Private: 33%</li>
    <li>Hospital services: 40% of total spending</li>
    <li>Prevention: 1.8% of total health budget</li>
    </ul>
    <p><strong>Sustainability Concerns:</strong> Aging population will increase costs by 40% over next 20 years without intervention.</p>`
  },
  s8: {
    title: "Chronic Disease Prevalence",
    content: `<p><strong>Chronic Disease Statistics 2023:</strong></p>
    <ul>
    <li>87% of deaths caused by chronic diseases</li>
    <li>50% of adults have at least one chronic condition</li>
    <li>Cardiovascular disease: 1.2 million Australians</li>
    <li>Type 2 diabetes: 1.3 million Australians</li>
    <li>Cancer: 150,000 new cases annually</li>
    </ul>
    <p>Direct healthcare costs: $27 billion annually. Indirect costs (productivity loss): $35 billion.</p>`
  },
  s9: {
    title: "Maternal and Child Health",
    content: `<p><strong>Maternal & Child Health Outcomes 2023:</strong></p>
    <ul>
    <li>Maternal mortality rate: 5.8 per 100,000 births</li>
    <li>Infant mortality rate: 3.1 per 1,000 live births</li>
    <li>Low birth weight: 6.6% of births</li>
    <li>Breastfeeding initiation: 96%, exclusive at 6 months: 39%</li>
    </ul>
    <p>Disparities exist: Indigenous women 2.7x higher maternal mortality, rural areas have reduced specialist access.</p>`
  },
  s10: {
    title: "Digital Health Technology",
    content: `<p><strong>My Health Record and Digital Health 2023:</strong></p>
    <ul>
    <li>My Health Record uptake: 88% of population (22.8 million)</li>
    <li>Telehealth consultations: 25 million in 2022-23</li>
    <li>Health app usage: 67% of adults use health/fitness apps</li>
    <li>Digital literacy barriers: 15% of population lacks digital skills</li>
    </ul>
    <p>COVID-19 accelerated telehealth adoption by 3000%, particularly benefiting rural and elderly populations.</p>`
  },
  s11: {
    title: "Workplace Health and Safety",
    content: `<p><strong>Safe Work Australia Report 2023:</strong></p>
    <ul>
    <li>Work-related fatalities: 169 (rate: 1.2 per 100,000 workers)</li>
    <li>Serious injury claims: 104,770 annually</li>
    <li>Mental health claims increased 52% over 5 years</li>
    <li>Direct costs: $7.8 billion, Total economic impact: $61.8 billion</li>
    </ul>
    <p>High-risk industries: Construction, agriculture, transport. Psychological injury claims now 9% of all claims.</p>`
  },
  s12: {
    title: "Alcohol and Substance Use",
    content: `<p><strong>National Drug Strategy Household Survey 2022-23:</strong></p>
    <ul>
    <li>Risky alcohol consumption: 16.8% of adults</li>
    <li>Daily smoking: 8.8% (down from 24% in 1991)</li>
    <li>Illicit drug use: 16.4% in past year</li>
    <li>Pharmaceutical misuse: 3.7% of population</li>
    </ul>
    <p>Economic burden: Alcohol $36 billion, tobacco $137 billion, illicit drugs $8.2 billion annually.</p>`
  },
  s13: {
    title: "Aged Care Health Outcomes",
    content: `<p><strong>Aged Care Quality and Safety Report 2023:</strong></p>
    <ul>
    <li>Aged care residents: 245,000 in residential care</li>
    <li>Home care packages: 180,000 recipients</li>
    <li>Unplanned hospital admissions: 23% of residents annually</li>
    <li>Medication errors: 18 incidents per 1,000 bed days</li>
    </ul>
    <p>Royal Commission recommendations: $17.7 billion additional funding over 4 years, new care standards.</p>`
  },
  s14: {
    title: "School Health Programs", 
    content: `<p><strong>National School Health Programs Evaluation 2023:</strong></p>
    <ul>
    <li>School-based health services reach 3.8 million students</li>
    <li>Breakfast programs: 2,800 schools, 180,000 students</li>
    <li>Mental health programs: 85% of schools have initiatives</li>
    <li>Physical activity: Only 32% of students meet daily guidelines</li>
    </ul>
    <p>Evidence shows school health programs improve academic outcomes and reduce healthcare costs long-term.</p>`
  },
  s15: {
    title: "Health Workforce Shortages",
    content: `<p><strong>Health Workforce Crisis 2023:</strong></p>
    <ul>
    <li>GP shortage: 10,700 additional GPs needed by 2032</li>
    <li>Nursing vacancies: 85,000 positions unfilled</li>
    <li>Rural health workforce: 30% below metropolitan ratios</li>
    <li>Mental health professionals: 2-month average wait for psychologist</li>
    </ul>
    <p>Contributing factors: Aging workforce, increased demand, training bottlenecks, rural practice challenges.</p>`
  },
  s16: {
    title: "Health Insurance and Private Healthcare", 
    content: `<p><strong>Private Health Insurance Report 2023:</strong></p>
    <ul>
    <li>PHI coverage: 44.8% of population (down from 47% in 2015)</li>
    <li>Average premium increase: 2.9% annually</li>
    <li>Gap payments: Average $400 per hospital admission</li>
    <li>Young adult coverage (25-34): 32% (lowest demographic)</li>
    </ul>
    <p>Policy concerns: Premium affordability, coverage gaps, public hospital pressure from PHI decline.</p>`
  },
  s17: {
    title: "Preventive Health Investment",
    content: `<p><strong>National Preventive Health Strategy 2023:</strong></p>
    <ul>
    <li>Prevention spending: $1.8 billion (1.8% of health budget)</li>
    <li>Immunization coverage: 95.7% for 2-year-olds</li>
    <li>Cancer screening participation: Breast 54%, Cervical 58%, Bowel 44%</li>
    <li>Health check uptake: 38% of eligible population (45-49 years)</li>
    </ul>
    <p>ROI Analysis: Every $1 spent on prevention saves $4-14 in treatment costs.</p>`
  },
  s18: {
    title: "Social Determinants Impact",
    content: `<p><strong>Social Determinants of Health Analysis 2023:</strong></p>
    <ul>
    <li>Income inequality: Poorest 20% live 7 years less than richest 20%</li>
    <li>Education impact: University graduates live 9 years longer</li>
    <li>Housing stress: 1.3 million households spend >30% income on housing</li>
    <li>Social isolation: 1 in 4 Australians report loneliness</li>
    </ul>
    <p>WHO estimates: Social determinants account for 80% of health outcomes.</p>`
  },
  s19: {
    title: "Emergency Department Pressures",
    content: `<p><strong>Emergency Department Performance 2023:</strong></p>
    <ul>
    <li>ED presentations: 8.5 million annually (6% increase)</li>
    <li>4-hour treatment target met: 68% (target: 90%)</li>
    <li>Ambulance ramping: Average 34 minutes</li>
    <li>Mental health presentations: 180,000 (up 15%)</li>
    </ul>
    <p>Contributing factors: GP access issues, aging population, chronic disease complexity, staff shortages.</p>`
  },
  s20: {
    title: "Public Health Emergency Preparedness",
    content: `<p><strong>Health Emergency Preparedness Review 2023:</strong></p>
    <ul>
    <li>COVID-19 impact: 20,000+ deaths, $240 billion economic cost</li>
    <li>Hospital surge capacity: 30% increase in ICU beds maintained</li>
    <li>Vaccine distribution: 95% adult population double-vaccinated</li>
    <li>Supply chain resilience: 90-day medicine stockpile established</li>
    </ul>
    <p>Lessons learned: Need for better pandemic preparedness, mental health support, and international cooperation.</p>`
  }
};

// Campaign-specific stimuli
const campaigns = {
  quit: {
    title: "Quit Smoking Campaign",
    content: `<p><strong>Quit Campaign - Australia's Anti-Smoking Initiative:</strong></p>
    <p>Running since 1997, the Quit campaign uses graphic imagery and real stories to encourage smoking cessation.</p>
    <ul>
    <li><strong>TV/Digital Ads:</strong> Graphic health consequences, personal testimonials</li>
    <li><strong>Quitline:</strong> 13 7848 counselling service, 200,000+ calls annually</li>
    <li><strong>Online Support:</strong> quit.org.au, mobile apps, social media engagement</li>
    <li><strong>Healthcare Integration:</strong> GP referral programs, nicotine replacement therapy</li>
    </ul>
    <p><strong>Results:</strong> Smoking rates declined from 24% (1997) to 11% (2023). Campaign awareness: 85%.</p>`
  },
  sunSmart: {
    title: "SunSmart Campaign",
    content: `<p><strong>SunSmart - Cancer Council's Skin Cancer Prevention:</strong></p>
    <p>Launched 1988, promoting sun protection through "Slip, Slop, Slap, Seek, Slide" message.</p>
    <ul>
    <li><strong>Mass Media:</strong> TV, radio, print campaigns during summer months</li>
    <li><strong>School Programs:</strong> SunSmart schools policy, shade audits</li>
    <li><strong>Community Engagement:</strong> UV alerts, workplace programs</li>
    <li><strong>Policy Advocacy:</strong> Building codes for shade, sunscreen standards</li>
    </ul>
    <p><strong>Impact:</strong> Melanoma incidence stabilized, sunscreen use increased from 10% to 70%.</p>`
  },
  ruok: {
    title: "R U OK? Mental Health Campaign",
    content: `<p><strong>R U OK? - National Mental Health Awareness:</strong></p>
    <p>Founded 2009, encouraging meaningful conversations about mental health.</p>
    <ul>
    <li><strong>Annual Day:</strong> Second Thursday September, 8 million+ reach</li>
    <li><strong>Workplace Programs:</strong> 12,000+ organizations registered</li>
    <li><strong>Educational Resources:</strong> Conversation guides, training workshops</li>
    <li><strong>Community Events:</strong> Local conversations, ambassador network</li>
    </ul>
    <p><strong>Outcomes:</strong> 85% awareness, 72% had meaningful mental health conversation.</p>`
  },
  go25: {
    title: "Go for 2&5 Nutrition Campaign",
    content: `<p><strong>Go for 2&5® - National Fruit and Vegetable Campaign:</strong></p>
    <p>Promoting consumption of 2 serves fruit, 5 serves vegetables daily.</p>
    <ul>
    <li><strong>Mass Media:</strong> TV, digital, print advertising</li>
    <li><strong>School Programs:</strong> Crunch&Sip, kitchen garden programs</li>
    <li><strong>Community Initiatives:</strong> Farmers markets, community gardens</li>
    <li><strong>Healthcare Integration:</strong> GP referrals to dietitians</li>
    </ul>
    <p><strong>Challenge:</strong> Only 7% of adults meet vegetable guidelines, 54% meet fruit guidelines.</p>`
  },
  cervical: {
    title: "National Cervical Screening Program",
    content: `<p><strong>Cervical Screening Program - Cancer Prevention:</strong></p>
    <p>Transitioned from Pap tests to HPV testing in 2017, targeting women 25-74 years.</p>
    <ul>
    <li><strong>Screening Protocol:</strong> 5-yearly HPV tests (was 2-yearly Pap tests)</li>
    <li><strong>Reminder System:</strong> National register sends invitations/reminders</li>
    <li><strong>Culturally Appropriate:</strong> Indigenous, CALD community engagement</li>
    <li><strong>Self-Collection:</strong> Option for under-screened women</li>
    </ul>
    <p><strong>Results:</strong> 58% participation rate, cervical cancer incidence reduced 50% since 1991.</p>`
  },
  playStreets: {
    title: "Play Streets Active Communities",
    content: `<p><strong>Play Streets - Community Physical Activity Initiative:</strong></p>
    <p>Temporary street closures to create safe play spaces for children and families.</p>
    <ul>
    <li><strong>Community-Led:</strong> Resident-organized, council-supported events</li>
    <li><strong>Regular Programming:</strong> Monthly/weekly closures in participating neighborhoods</li>
    <li><strong>Multi-Activity:</strong> Cycling, games, social interaction opportunities</li>
    <li><strong>Health Promotion:</strong> Links to local health services, activity programs</li>
    </ul>
    <p><strong>Impact:</strong> 180+ communities participating, increased physical activity, social cohesion.</p>`
  },
  swapIt: {
    title: "Swap It Don't Stop It",
    content: `<p><strong>Swap It Don't Stop It - Healthy Food Choices:</strong></p>
    <p>NSW Health campaign promoting small dietary changes for big health improvements.</p>
    <ul>
    <li><strong>Simple Swaps:</strong> Water for soft drink, brown bread for white</li>
    <li><strong>Digital Focus:</strong> Interactive website, mobile app, social media</li>
    <li><strong>Community Programs:</strong> Workplace wellness, school canteen support</li>
    <li><strong>Partnerships:</strong> Food industry, retailers, health services</li>
    </ul>
    <p><strong>Reach:</strong> 2.1 million website visits, 67% recall rate, positive behavior change reported.</p>`
  },
  thisGirlCan: {
    title: "This Girl Can Physical Activity",
    content: `<p><strong>This Girl Can - Women's Physical Activity Campaign:</strong></p>
    <p>Celebrating women being active regardless of shape, size, or ability.</p>
    <ul>
    <li><strong>Body Positive:</strong> Real women, diverse representation</li>
    <li><strong>Barrier Breaking:</strong> Addresses fear of judgment, lack of confidence</li>
    <li><strong>Community Building:</strong> Local activities, social media communities</li>
    <li><strong>Partnership Approach:</strong> Sports organizations, councils, health services</li>
    </ul>
    <p><strong>Results:</strong> 37% of women aware of campaign took up physical activity, confidence increased.</p>`
  }
};

// Extended response questions with strategic stimulus mapping
const practiceQuestions = [
  {
    id: 1,
    title: "Health Promotion & Ottawa Charter",
    question: "Analyse how health promotion initiatives use Ottawa Charter action areas to address health inequities. Using examples, evaluate the effectiveness of at least two action areas in promoting sustainable health outcomes. (12 marks)",
    stimulusMappings: ['s6', 's3', 's7', 's1']
  },
  {
    id: 2,
    title: "Social Justice & Health Access",
    question: "Evaluate how social justice principles are applied in Australian health initiatives. Discuss the extent to which current approaches achieve equity, access, and participation for vulnerable populations. (10 marks)",
    stimulusMappings: ['s19', 's7', 'sunSmart', 's1']
  },
  {
    id: 3,
    title: "Health System Sustainability",
    question: "Discuss the challenges facing Australia's health system sustainability. Analyse the role of government and private sector partnerships in addressing these challenges, and suggest improvements. (12 marks)",
    stimulusMappings: ['s7', 's8', 's10', 'ruok']
  },
  {
    id: 4,
    title: "Indigenous Health Strategies",
    question: "Evaluate the effectiveness of strategies addressing Indigenous health disparities. Analyse how cultural safety and community control principles are implemented and their impact on health outcomes. (11 marks)",
    stimulusMappings: ['s6', 's11', 's7', 's3']
  },
  {
    id: 5,
    title: "Youth Health Promotion",
    question: "Analyse approaches to promoting youth health and wellbeing in Australia. Evaluate the effectiveness of school-based and community programs in addressing mental health and lifestyle factors. (10 marks)",
    stimulusMappings: ['s16', 's15', 's14', 'go25']
  },
  {
    id: 6,
    title: "Preventive Health Investment",
    question: "Discuss the role of preventive health strategies in reducing healthcare costs and improving population health. Evaluate the cost-effectiveness of prevention versus treatment approaches. (12 marks)",
    stimulusMappings: ['s6', 'quit', 's19', 's7']
  },
  {
    id: 7,
    title: "Health Workforce Planning",
    question: "Analyse the challenges of health workforce distribution in Australia. Evaluate strategies to address shortages in rural and remote areas and their impact on health access. (10 marks)",
    stimulusMappings: ['s15', 's10', 's14', 's16']
  },
  {
    id: 8,
    title: "Digital Health Innovation",
    question: "Evaluate the impact of digital health technologies on health service delivery and patient outcomes. Discuss the opportunities and barriers to implementing digital health solutions. (11 marks)",
    stimulusMappings: ['s15', 's10', 's14', 's16']
  },
  {
    id: 9,
    title: "Food Security & Nutrition",
    question: "Analyse the relationship between food security and health outcomes in Australia. Evaluate the effectiveness of interventions addressing nutritional health disparities. (10 marks)",
    stimulusMappings: ['s5', 's13', 's4', 's19']
  },
  {
    id: 10,
    title: "Emergency Health Preparedness",
    question: "Discuss Australia's health system capacity to respond to health emergencies. Analyse lessons learned from COVID-19 and evaluate preparedness for future health crises. (12 marks)",
    stimulusMappings: ['s20', 's8', 's2', 's9']
  },
  {
    id: 11,
    title: "Tobacco Control Strategies",
    question: "Evaluate the comprehensive approach to tobacco control in Australia. Analyse how policy, education, and support services work together to reduce smoking rates and their effectiveness. (11 marks)",
    stimulusMappings: ['quit', 's7', 's3', 's6']
  },
  {
    id: 12,
    title: "Cancer Prevention Programs",
    question: "Analyse the effectiveness of Australia's cancer prevention and early detection programs. Evaluate how these programs address population health priorities and health equity. (10 marks)",
    stimulusMappings: ['s7', 'cervical', 's11', 'playStreets']
  },
  {
    id: 13,
    title: "Healthy Communities Initiative",
    question: "Discuss community-based approaches to health promotion. Evaluate how local initiatives address social determinants of health and create supportive environments. (12 marks)",
    stimulusMappings: ['s16', 's15', 'swapIt', 's10']
  },
  {
    id: 14,
    title: "Chronic Disease Management",
    question: "Analyse integrated approaches to chronic disease prevention and management. Evaluate the role of primary healthcare and community programs in reducing chronic disease burden. (11 marks)",
    stimulusMappings: ['s7', 's8', 's3', 's16']
  },
  {
    id: 15,
    title: "Health Service Integration",
    question: "Evaluate the coordination between different levels of healthcare in Australia. Discuss how integration between primary, secondary, and tertiary care affects patient outcomes and system efficiency. (10 marks)",
    stimulusMappings: ['s3', 's9', 's7', 's11']
  },
  {
    id: 16,
    title: "Health Equity & Gender",
    question: "Analyse gender-specific health issues and the effectiveness of targeted health promotion strategies. Evaluate how programs address barriers to health participation for different gender groups. (12 marks)",
    stimulusMappings: ['s1', 's19', 'thisGirlCan', 's10']
  }
];

export default function Unit3SAC2PrepComponent() {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedStimulus, setSelectedStimulus] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [completedQuestions, setCompletedQuestions] = useState(() => {
    const saved = localStorage.getItem('sac2-prep-progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('sac2-prep-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState("questions");

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('sac2-prep-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  useEffect(() => {
    localStorage.setItem('sac2-prep-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const categories = [
    { value: "all", label: "All Questions", icon: "📚" },
    { value: "health-promotion", label: "Health Promotion", icon: "🎯" },
    { value: "social-justice", label: "Social Justice", icon: "⚖️" },
    { value: "sustainability", label: "Health Systems", icon: "🏥" },
    { value: "population-health", label: "Population Health", icon: "👥" },
    { value: "prevention", label: "Prevention", icon: "🛡️" }
  ];

  const getQuestionCategory = (question) => {
    const title = question.title.toLowerCase();
    if (title.includes('promotion') || title.includes('ottawa')) return 'health-promotion';
    if (title.includes('justice') || title.includes('equity')) return 'social-justice';
    if (title.includes('system') || title.includes('sustainability')) return 'sustainability';
    if (title.includes('prevention') || title.includes('preventive')) return 'prevention';
    return 'population-health';
  };

  const filteredQuestions = practiceQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || getQuestionCategory(question) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (questionId) => {
    setFavorites(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const toggleCompleted = (questionId) => {
    setCompletedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const currentQuestion = practiceQuestions[selectedQuestion];
  const availableStimuli = currentQuestion.stimulusMappings;
  const currentStimulusKey = availableStimuli[selectedStimulus];
  
  // Get stimulus content from either stimuli or campaigns object
  const getStimulusContent = (key) => {
    const stimulus = stimuli[key] || campaigns[key];
    return stimulus ? stimulus.content : '<p>Stimulus not found</p>';
  };

  const getStimulusTitle = (key) => {
    const stimulus = stimuli[key] || campaigns[key];
    return stimulus ? stimulus.title : 'Unknown Stimulus';
  };

  const progressPercentage = Math.round((Object.values(completedQuestions).filter(Boolean).length / practiceQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📝 Unit 3 SAC 2 Preparation
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-6 max-w-4xl mx-auto">
              Master extended response questions with interactive tools, authentic stimuli, and strategic practice
            </p>
            
            {/* Progress Indicator */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Practice Progress</span>
                <span>{progressPercentage}% Complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{practiceQuestions.length}</div>
                <div className="text-sm text-purple-100">Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{Object.keys({...stimuli, ...campaigns}).length}</div>
                <div className="text-sm text-purple-100">Stimuli</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{favorites.length}</div>
                <div className="text-sm text-purple-100">Favorites</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold">{Object.values(completedQuestions).filter(Boolean).length}</div>
                <div className="text-sm text-purple-100">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-slate-800/95 dark:border-slate-700">        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-3">
            {[
              { id: "questions", label: "Question Browser", icon: "📚" },
              { id: "practice", label: "Active Practice", icon: "✏️" },
              { id: "tools", label: "Interactive Tools", icon: "🛠️" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-800 border-2 border-purple-300 dark:bg-purple-900 dark:text-purple-200'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 dark:text-slate-400 dark:hover:text-purple-400 dark:hover:bg-purple-900/20'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Question Browser Tab */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            {/* Introduction Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎯</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Extended Response Practice Questions
                  </h2>
                  <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                    Master VCE HHD extended response questions with 16 comprehensive practice questions, each mapped to 4 relevant stimulus materials. 
                    Practice analyzing different data sources, developing arguments, and structuring high-scoring responses.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Practice Features</h3>
                      <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                        <li>• Interactive annotation tools</li>
                        <li>• Multiple stimulus perspectives</li>
                        <li>• Question deconstruction guidance</li>
                        <li>• Response planning templates</li>
                      </ul>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                      <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Question Types</h3>
                      <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1">
                        <li>• Health promotion analysis (10-12 marks)</li>
                        <li>• Policy evaluation questions</li>
                        <li>• Social determinants analysis</li>
                        <li>• System sustainability discussions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search practice questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    aria-label="Search practice questions"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">🔍</span>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.value
                          ? 'bg-purple-100 text-purple-800 border-2 border-purple-300 dark:bg-purple-900 dark:text-purple-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                      }`}
                      aria-pressed={selectedCategory === category.value}
                    >
                      <span className="mr-1">{category.icon}</span>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                Showing {filteredQuestions.length} of {practiceQuestions.length} questions
                {searchTerm && (
                  <span className="ml-2 text-purple-600 dark:text-purple-400">
                    for "{searchTerm}"
                  </span>
                )}
              </div>
            </div>

            {/* Questions Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                        Question {question.id}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFavorite(question.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(question.id)
                              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                          }`}
                          aria-label={favorites.includes(question.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          {favorites.includes(question.id) ? '❤️' : '🤍'}
                        </button>
                        <button
                          onClick={() => toggleCompleted(question.id)}
                          className={`p-2 rounded-full transition-colors ${
                            completedQuestions[question.id]
                              ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                              : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                          }`}
                          aria-label={completedQuestions[question.id] ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {completedQuestions[question.id] ? '✅' : '⭕'}
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {question.title}
                    </h3>
                    
                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed">
                        {question.question}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-slate-400">
                        {question.stimulusMappings.length} stimuli available
                      </div>
                      <button
                        onClick={() => {
                          setSelectedQuestion(practiceQuestions.findIndex(q => q.id === question.id));
                          setSelectedStimulus(0);
                          setActiveTab("practice");
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        Start Practice →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-gray-600 dark:text-slate-400 mb-4">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Practice Tab */}
        {activeTab === "practice" && (
          <div className="space-y-6">
            {/* Question and Stimulus Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Question Selection */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
                  📚 Select Practice Question
                </h3>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {practiceQuestions.map((q, i) => (
                    <button
                      key={q.id}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                        i === selectedQuestion
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 dark:bg-slate-700 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-600"
                      }`}
                      onClick={() => {
                        setSelectedQuestion(i);
                        setSelectedStimulus(0);
                      }}
                    >
                      <div className="font-semibold">Q{q.id}</div>
                      <div className="text-xs opacity-75">{q.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stimulus Selection */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
                  📊 Select Stimulus Material
                </h3>
                <div className="space-y-2">
                  {availableStimuli.map((stimulusKey, i) => (
                    <button
                      key={stimulusKey}
                      className={`w-full p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                        i === selectedStimulus
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 dark:bg-slate-700 text-green-600 dark:text-green-300 hover:bg-green-50 dark:hover:bg-slate-600"
                      }`}
                      onClick={() => setSelectedStimulus(i)}
                    >
                      <div className="font-semibold">Stimulus {i + 1}</div>
                      <div className="text-xs opacity-75">{getStimulusTitle(stimulusKey)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Question and Stimulus Display */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Question Panel */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                      Question {currentQuestion.id}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentQuestion.title}
                    </h3>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <p className="text-gray-800 dark:text-slate-200 leading-relaxed">
                      {currentQuestion.question}
                    </p>
                  </div>
                </div>
                
                {/* Stimulus Panel */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                      Stimulus {selectedStimulus + 1}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {getStimulusTitle(currentStimulusKey)}
                    </h4>
                  </div>
                  <div 
                    className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-gray-800 dark:text-slate-200 max-h-64 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: getStimulusContent(currentStimulusKey) }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Tools Tab */}
        {activeTab === "tools" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🛠️ Interactive Practice Tools
              </h2>
              <p className="text-gray-600 dark:text-slate-300 mb-6">
                Use these tools to analyze questions, annotate stimuli, and plan your responses systematically.
              </p>
              
              <div className="space-y-8">
                <InteractiveAnnotationComponent
                  question={currentQuestion.question}
                  stimulus={getStimulusContent(currentStimulusKey)}
                />
                <InteractiveMappingComponent key={`${selectedQuestion}-${selectedStimulus}`} />
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl shadow-lg text-white p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-3">💡 How to Use This Tool</h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Follow this systematic approach to maximize your SAC 2 preparation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">1. Question Analysis</h3>
              <p className="text-purple-100 text-sm mb-4">
                Start by deconstructing the question using the annotation tool. Identify command words, key concepts, and mark allocation guidance.
              </p>
              <ul className="text-purple-200 text-sm space-y-1">
                <li>• Highlight command words</li>
                <li>• Identify key concepts</li>
                <li>• Note mark allocation</li>
                <li>• Plan response structure</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">2. Stimulus Exploration</h3>
              <p className="text-purple-100 text-sm mb-4">
                Switch between the 4 mapped stimuli for each question. Each provides different data perspectives and evidence for your response.
              </p>
              <ul className="text-purple-200 text-sm space-y-1">
                <li>• Compare different data sources</li>
                <li>• Identify key statistics</li>
                <li>• Note trends and patterns</li>
                <li>• Extract relevant evidence</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">3. Response Planning</h3>
              <p className="text-purple-100 text-sm mb-4">
                Use the mapping tool to plan your response structure and ensure you address all parts of the question with relevant evidence.
              </p>
              <ul className="text-purple-200 text-sm space-y-1">
                <li>• Structure your argument</li>
                <li>• Link evidence to points</li>
                <li>• Check all parts addressed</li>
                <li>• Practice under time pressure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
