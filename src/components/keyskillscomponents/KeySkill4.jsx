import { useState, useEffect } from 'react';
import InitiativeDragDrop from './helpers/InitiativeDragDrop.jsx';

const initiatives = [
	{
		id: 'goodstart',
		name: 'Good Start Program',
		description:
			'Aims to promote healthy eating and exercise among Indigenous children through culturally appropriate programs.',
		ottawaArea: 'Develop personal skills',
		category: 'Indigenous Health',
		target: 'Children'
	},
	{
		id: 'fit4life',
		name: 'Fit 4 Life',
		description:
			'Supports physical activity in Indigenous youth by providing sports and recreation in local communities.',
		ottawaArea: 'Create supportive environments',
		category: 'Physical Activity',
		target: 'Youth'
	},
	{
		id: 'deadlychoices',
		name: 'Deadly Choices',
		description:
			'Encourages Indigenous Australians to make healthy lifestyle choices through education and media campaigns.',
		ottawaArea: 'Reorient health services',
		category: 'Health Education',
		target: 'All Ages'
	},
	{
		id: 'closinggap',
		name: 'Closing the Gap',
		description:
			'A national strategy aiming to reduce disadvantage among Aboriginal and Torres Strait Islander people, including health equity.',
		ottawaArea: 'Build healthy public policy',
		category: 'Policy',
		target: 'Population'
	},
	{
		id: 'roadtohealth',
		name: 'Aboriginal Road to Good Health',
		description:
			'A free Type 2 diabetes prevention program teaching nutrition and lifestyle skills.',
		ottawaArea: 'Strengthen community action',
		category: 'Disease Prevention',
		target: 'At-risk Adults'
	},
];

const ottawaAreas = [
	{ name: 'Build healthy public policy', color: 'bg-blue-500', description: 'Government action to create healthy policies' },
	{ name: 'Create supportive environments', color: 'bg-green-500', description: 'Physical and social environments that support health' },
	{ name: 'Strengthen community action', color: 'bg-purple-500', description: 'Empowering communities to take collective action' },
	{ name: 'Develop personal skills', color: 'bg-orange-500', description: 'Education and skill-building for individuals' },
	{ name: 'Reorient health services', color: 'bg-red-500', description: 'Shifting focus from treatment to prevention' }
];

export default function KeySkill4() {
	const [showAnswers, setShowAnswers] = useState(false);
	const [resetKey, setResetKey] = useState(Date.now());
	const [favorites, setFavorites] = useState(() => {
		const stored = localStorage.getItem('keySkill4Favorites');
		return stored ? JSON.parse(stored) : [];
	});
	const [completedMatches, setCompletedMatches] = useState(0);
	const [startTime, setStartTime] = useState(null);
	const [completionTime, setCompletionTime] = useState(null);
	const [showHints, setShowHints] = useState(false);

	useEffect(() => {
		localStorage.setItem('keySkill4Favorites', JSON.stringify(favorites));
	}, [favorites]);

	useEffect(() => {
		if (!startTime) {
			setStartTime(Date.now());
		}
	}, [startTime]);

	const handleReset = () => {
		setResetKey(Date.now());
		setShowAnswers(false);
		setCompletedMatches(0);
		setStartTime(Date.now());
		setCompletionTime(null);
		setShowHints(false);
	};

	const toggleFavorite = (initiativeId) => {
		setFavorites(prev => 
			prev.includes(initiativeId) 
				? prev.filter(id => id !== initiativeId)
				: [...prev, initiativeId]
		);
	};

	const handleMatchComplete = () => {
		const newCompleted = completedMatches + 1;
		setCompletedMatches(newCompleted);
		
		if (newCompleted === initiatives.length && !completionTime) {
			setCompletionTime(Date.now());
		}
	};

	const getProgressPercentage = () => {
		return Math.round((completedMatches / initiatives.length) * 100);
	};

	const getCompletionTimeString = () => {
		if (!completionTime || !startTime) return '';
		const seconds = Math.round((completionTime - startTime) / 1000);
		return `${seconds}s`;
	};

	return (
		<div className="max-w-6xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
							4
						</div>
						<div>
							<h2 className="text-3xl font-bold text-slate-200">Health Promotion Matching</h2>
							<p className="text-slate-400">Match Indigenous health initiatives to Ottawa Charter action areas</p>
						</div>
					</div>
					
					<div className="flex items-center gap-4">
						<div className="text-right">
							<div className="text-sm text-slate-400">Progress</div>
							<div className="text-xl font-bold text-orange-400">{getProgressPercentage()}%</div>
							{completionTime && (
								<div className="text-xs text-green-400">Completed in {getCompletionTimeString()}</div>
							)}
						</div>
						
						<div className="w-16 h-16 relative">
							<svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
								<path
									d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
									fill="none"
									stroke="rgb(51 65 85)"
									strokeWidth="2"
								/>
								<path
									d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
									fill="none"
									stroke="rgb(251 146 60)"
									strokeWidth="2"
									strokeDasharray={`${getProgressPercentage()}, 100`}
								/>
							</svg>
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-xs font-bold text-orange-400">{completedMatches}/{initiatives.length}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Control Panel */}
				<div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<button
								onClick={() => setShowHints(!showHints)}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 ${
									showHints 
										? 'bg-orange-500 text-white shadow-lg' 
										: 'bg-slate-700 text-slate-300 hover:bg-orange-600 hover:text-white'
								}`}
							>
								💡 {showHints ? 'Hide Hints' : 'Show Hints'}
							</button>
							
							<button
								onClick={() => setShowAnswers(!showAnswers)}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-green-400 ${
									showAnswers 
										? 'bg-green-500 text-white shadow-lg' 
										: 'bg-slate-700 text-slate-300 hover:bg-green-600 hover:text-white'
								}`}
							>
								✅ {showAnswers ? 'Hide Answers' : 'Show Answers'}
							</button>
							
							<button
								onClick={handleReset}
								className="px-4 py-2 bg-slate-600 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
							>
								🔄 Reset
							</button>
						</div>

						<div className="flex items-center gap-2 text-sm text-slate-400">
							<svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.119l-3.382-2.46a1 1 0 00-1.176 0l-3.382 2.46c-.784.57-1.838-.197-1.54-1.119l1.286-3.966a1 1 0 00-.364-1.118l-3.382-2.46c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
							</svg>
							{favorites.length} favorited
						</div>
					</div>
				</div>
			</div>

			{/* Hints Panel */}
			{showHints && (
				<div className="mb-6 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-xl p-6">
					<h3 className="text-lg font-semibold text-orange-300 mb-4 flex items-center gap-2">
						💡 Ottawa Charter Action Areas Guide
					</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{ottawaAreas.map((area, index) => (
							<div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
								<div className={`w-4 h-4 ${area.color} rounded-full mb-2`}></div>
								<h4 className="font-medium text-slate-200 mb-1">{area.name}</h4>
								<p className="text-xs text-slate-400">{area.description}</p>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Initiative Cards */}
			<div className="mb-6">
				<h3 className="text-lg font-semibold text-slate-200 mb-4">Health Initiatives to Match</h3>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{initiatives.map((initiative) => {
						const isFavorite = favorites.includes(initiative.id);
						return (
							<div key={initiative.id} className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-5 border border-slate-600 hover:border-orange-400 transition-all group">
								<div className="flex items-start justify-between mb-3">
									<div className="flex items-center gap-2">
										<span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
											{initiative.category}
										</span>
										<span className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs">
											{initiative.target}
										</span>
									</div>
									<button
										onClick={() => toggleFavorite(initiative.id)}
										className={`p-1 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
											isFavorite ? 'text-yellow-400 scale-110' : 'text-slate-400 hover:text-yellow-400 hover:scale-110'
										}`}
									>
										<svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.347-3.89a1 1 0 00-1.176 0l-5.347 3.89c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z" />
										</svg>
									</button>
								</div>
								
								<h4 className="font-semibold text-orange-300 mb-2 group-hover:text-orange-200 transition-colors">
									{initiative.name}
								</h4>
								<p className="text-sm text-slate-400 leading-relaxed mb-3">
									{initiative.description}
								</p>
								
								{showAnswers && (
									<div className="mt-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
											</svg>
											<span className="text-sm font-medium text-green-300">
												Correct Area: {initiative.ottawaArea}
											</span>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Drag and Drop Component */}
			<div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
				<InitiativeDragDrop
					key={resetKey}
					initiatives={initiatives}
					showAnswers={showAnswers}
					onMatchComplete={handleMatchComplete}
				/>
			</div>

			{/* Completion Message */}
			{completionTime && (
				<div className="mt-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 text-center">
					<div className="text-4xl mb-2">🎉</div>
					<h3 className="text-xl font-bold text-green-300 mb-2">Excellent Work!</h3>
					<p className="text-green-400">
						You've successfully matched all {initiatives.length} health initiatives in {getCompletionTimeString()}!
					</p>
					<p className="text-sm text-slate-400 mt-2">
						Understanding how health initiatives align with Ottawa Charter action areas is crucial for VCE HHD success.
					</p>
				</div>
			)}

			{/* Study Notes */}
			<div className="mt-8 bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
				<h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
					📚 Study Notes: Indigenous Health Initiatives
				</h3>
				<div className="space-y-3 text-sm text-slate-300 leading-relaxed">
					<p>• <strong>Cultural Appropriateness:</strong> Indigenous health initiatives must respect cultural values and involve community leaders in planning and implementation.</p>
					<p>• <strong>Holistic Approach:</strong> Programs often address multiple determinants simultaneously, recognizing the interconnected nature of health challenges.</p>
					<p>• <strong>Community Ownership:</strong> Successful initiatives are community-led and build on existing strengths and resources within Indigenous communities.</p>
					<p>• <strong>Ottawa Charter Alignment:</strong> Each action area can contribute to reducing health inequities when applied with cultural sensitivity and community engagement.</p>
				</div>
			</div>
		</div>
	);
}
