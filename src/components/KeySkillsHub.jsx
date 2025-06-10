import React, { useState, useMemo } from "react";
import KeySkill1 from "./keyskillscomponents/KeySkill1.jsx";
import KeySkill2 from "./keyskillscomponents/KeySkill2.jsx";
import KeySkill3 from "./keyskillscomponents/KeySkill3.jsx";
import KeySkill4 from "./keyskillscomponents/KeySkill4.jsx";
import KeySkill5 from "./keyskillscomponents/KeySkill5.jsx";
import KeySkill6 from "./keyskillscomponents/KeySkill6.jsx";
import KeySkill7 from "./keyskillscomponents/KeySkill7.jsx";
import KeySkill8 from "./keyskillscomponents/KeySkill8.jsx";
import KeySkill9 from "./keyskillscomponents/KeySkill9.jsx";
import KeySkill10 from "./keyskillscomponents/KeySkill10.jsx";

const keySkills = [
	{
		id: 1,
		title: "Life Expectancy Trends Analysis",
		description: "Analyze historical data and trends in Australian life expectancy",
		component: KeySkill1,
		category: "Data Analysis",
		difficulty: "Medium",
		estimatedTime: "15 min",
	},
	{
		id: 2,
		title: "Health Initiative Classification",
		description: "Categorize health initiatives by approach and impact",
		component: KeySkill2,
		category: "Health Promotion",
		difficulty: "Easy",
		estimatedTime: "10 min",
	},
	{
		id: 3,
		title: "Health Model Comparison",
		description: "Compare biomedical and social models of health",
		component: KeySkill3,
		category: "Health Models",
		difficulty: "Medium",
		estimatedTime: "12 min",
	},
	{
		id: 4,
		title: "Ottawa Charter Mapping",
		description: "Map initiatives to Ottawa Charter action areas",
		component: KeySkill4,
		category: "Ottawa Charter",
		difficulty: "Medium",
		estimatedTime: "15 min",
	},
	{
		id: 5,
		title: "Health Promotion Evaluation",
		description: "Evaluate health promotion programs and strategies",
		component: KeySkill5,
		category: "Health Promotion",
		difficulty: "Hard",
		estimatedTime: "20 min",
	},
	{
		id: 6,
		title: "Indigenous Health Initiative Assessment",
		description: "Assess Indigenous health programs and their effectiveness",
		component: KeySkill6,
		category: "Indigenous Health",
		difficulty: "Medium",
		estimatedTime: "18 min",
	},
	{
		id: 7,
		title: "Social Justice in Health Programs",
		description: "Analyze how programs promote social justice principles",
		component: KeySkill7,
		category: "Social Justice",
		difficulty: "Hard",
		estimatedTime: "22 min",
	},
	{
		id: 8,
		title: "Nutrition Initiative Evaluation",
		description: "Evaluate healthy eating programs and policies",
		component: KeySkill8,
		category: "Nutrition",
		difficulty: "Medium",
		estimatedTime: "16 min",
	},
	{
		id: 9,
		title: "Barriers to Dietary Change",
		description: "Identify and explain barriers to healthy eating",
		component: KeySkill9,
		category: "Nutrition",
		difficulty: "Easy",
		estimatedTime: "12 min",
	},
	{
		id: 10,
		title: "Australian Health System Analysis",
		description: "Analyze funding, sustainability, access, and equity in Australia's health system",
		component: KeySkill10,
		category: "Health System",
		difficulty: "Hard",
		estimatedTime: "25 min",
	},
];

const categories = ["All Categories", ...new Set(keySkills.map((skill) => skill.category))];
const difficulties = ["All Difficulties", "Easy", "Medium", "Hard"];

export default function KeySkillsHub() {
	const [selectedSkill, setSelectedSkill] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("All Categories");
	const [difficultyFilter, setDifficultyFilter] = useState("All Difficulties");
	const [favorites, setFavorites] = useState(() => {
		const stored = localStorage.getItem("keySkillsFavorites");
		return stored ? JSON.parse(stored) : [];
	});
	const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

	const filteredSkills = useMemo(() => {
		let skills = keySkills;

		// Apply search filter
		if (searchTerm) {
			skills = skills.filter(
				(skill) =>
					skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
					skill.category.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Apply category filter
		if (categoryFilter !== "All Categories") {
			skills = skills.filter((skill) => skill.category === categoryFilter);
		}

		// Apply difficulty filter
		if (difficultyFilter !== "All Difficulties") {
			skills = skills.filter((skill) => skill.difficulty === difficultyFilter);
		}

		// Apply favorites filter
		if (showOnlyFavorites) {
			skills = skills.filter((skill) => favorites.includes(skill.id));
		}

		return skills;
	}, [searchTerm, categoryFilter, difficultyFilter, showOnlyFavorites, favorites]);

	const toggleFavorite = (skillId) => {
		setFavorites((prev) => {
			const updated = prev.includes(skillId)
				? prev.filter((id) => id !== skillId)
				: [...prev, skillId];
			localStorage.setItem("keySkillsFavorites", JSON.stringify(updated));
			return updated;
		});
	};

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case "Easy":
				return "bg-green-600 text-green-100";
			case "Medium":
				return "bg-yellow-600 text-yellow-100";
			case "Hard":
				return "bg-red-600 text-red-100";
			default:
				return "bg-slate-600 text-slate-200";
		}
	};

	const getCategoryIcon = (category) => {
		switch (category) {
			case "Data Analysis":
				return "📊";
			case "Health Promotion":
				return "🎯";
			case "Health Models":
				return "🏥";
			case "Ottawa Charter":
				return "📋";
			case "Indigenous Health":
				return "🪃";
			case "Social Justice":
				return "⚖️";
			case "Nutrition":
				return "🥗";
			case "Health System":
				return "🏛️";
			default:
				return "🎪";
		}
	};

	if (selectedSkill) {
		const SkillComponent = selectedSkill.component;
		return (
			<div className="max-w-6xl mx-auto">
				<div className="mb-6 flex items-center gap-4">
					<button
						onClick={() => setSelectedSkill(null)}
						className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
					>
						← Back to Hub
					</button>
					<div>
						<h1 className="text-2xl font-bold text-purple-300">
							{getCategoryIcon(selectedSkill.category)} {selectedSkill.title}
						</h1>
						<p className="text-slate-400 text-sm">{selectedSkill.description}</p>
					</div>
				</div>
				<SkillComponent />
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-purple-400 mb-2">🎪 Key Skills Hub</h1>
				<p className="text-slate-400 max-w-3xl">
					Master essential VCE HHD skills through interactive activities. Each skill builds your understanding
					of key concepts and prepares you for assessments with hands-on practice.
				</p>
			</div>

			{/* Search and Filter Bar */}
			<div className="mb-8 flex flex-col lg:flex-row lg:items-center gap-4 sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md py-4 rounded-xl shadow-md">
				<input
					type="text"
					placeholder="Search skills..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full lg:w-80 px-4 py-2 rounded-md bg-slate-800 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
					aria-label="Search key skills"
				/>

				<select
					value={categoryFilter}
					onChange={(e) => setCategoryFilter(e.target.value)}
					className="px-4 py-2 rounded-md bg-slate-800 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
					aria-label="Filter by category"
				>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>

				<select
					value={difficultyFilter}
					onChange={(e) => setDifficultyFilter(e.target.value)}
					className="px-4 py-2 rounded-md bg-slate-800 text-slate-200 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
					aria-label="Filter by difficulty"
				>
					{difficulties.map((difficulty) => (
						<option key={difficulty} value={difficulty}>
							{difficulty}
						</option>
					))}
				</select>

				<button
					className={`px-3 py-2 rounded-md text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 ${
						showOnlyFavorites
							? "bg-purple-700 text-white border-purple-500"
							: "bg-slate-800 text-slate-300 border-slate-600 hover:bg-purple-900 hover:text-purple-200"
					}`}
					onClick={() => setShowOnlyFavorites((f) => !f)}
					aria-pressed={showOnlyFavorites}
					aria-label="Show only favorite skills"
				>
					{showOnlyFavorites ? "Show All" : "Show Favorites"}
				</button>

				<span className="text-xs text-slate-500" aria-live="polite">
					{filteredSkills.length} skills
				</span>

				<div className="ml-auto flex items-center gap-4">
					<div className="flex items-center gap-2">
						<svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.119l-3.382-2.46a1 1 0 00-1.176 0l-3.382 2.46c-.784.57-1.838-.197-1.54-1.119l1.286-3.966a1 1 0 00-.364-1.118l-3.382-2.46c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
						</svg>
						<span className="text-xs text-yellow-300" title="Favorited skills">
							{favorites.length} favorited
						</span>
					</div>

					<button
						className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
						aria-label="Key skills help"
						title="How to use key skills"
						onClick={() =>
							alert(
								"Click on any skill card to start practicing. Use filters to find specific topics. Favorite challenging skills for quick access. Each skill includes interactive elements and immediate feedback."
							)
						}
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="10" />
							<path d="M12 16v-4M12 8h.01" />
						</svg>
					</button>
				</div>
			</div>

			{/* Skills Grid */}
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredSkills.length === 0 ? (
					<div className="col-span-full text-center py-12 text-slate-400">
						<svg
							className="w-16 h-16 mx-auto mb-4 text-slate-500"
							fill="none"
							stroke="currentColor"
							strokeWidth="1"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.488.901-6.077 2.378l-.096.074c-.487.365-.896.833-1.208 1.386C4.392 19.394 4.259 20 4.5 20.5S5.606 21 6.162 21h11.676c.556 0 1.054-.606.792-1.122a7.929 7.929 0 00-1.208-1.386l-.096-.074z"
							/>
						</svg>
						<p>No skills found with current filters.</p>
					</div>
				) : (
					filteredSkills.map((skill, index) => {
						const isFavorite = favorites.includes(skill.id);

						return (
							<div
								key={skill.id}
								className="skill-card bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-lg border border-slate-600 hover:border-purple-400 transition-all group cursor-pointer animate-fade-in"
								style={{ animationDelay: `${index * 0.1}s` }}
								onClick={() => setSelectedSkill(skill)}
							>
								<div className="flex items-start justify-between mb-4">
									<div className="text-4xl group-hover:scale-110 transition-transform">
										{getCategoryIcon(skill.category)}
									</div>

									<button
										className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-transform duration-150 ${
											isFavorite
												? "text-yellow-400 scale-110"
												: "text-slate-400 hover:text-yellow-400 hover:scale-110"
										}`}
										onClick={(e) => {
											e.stopPropagation();
											toggleFavorite(skill.id);
										}}
										aria-label={
											isFavorite
												? `Remove skill ${skill.id} from favorites`
												: `Add skill ${skill.id} to favorites`
										}
										title={isFavorite ? "Remove from favorites" : "Add to favorites"}
									>
										<svg
											className="w-5 h-5"
											fill={isFavorite ? "currentColor" : "none"}
											stroke="currentColor"
											strokeWidth="2"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.347-3.89a1 1 0 00-1.176 0l-5.347 3.89c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z"
											/>
										</svg>
									</button>
								</div>

								<h3 className="text-lg font-semibold text-purple-200 group-hover:text-purple-100 transition-colors mb-2">
									Key Skill {skill.id}: {skill.title}
								</h3>

								<p className="text-slate-300 text-sm leading-relaxed mb-4 group-hover:text-slate-200 transition-colors">
									{skill.description}
								</p>

								<div className="flex flex-wrap items-center gap-2 mb-4">
									<span className="bg-slate-700 text-purple-200 px-2 py-1 rounded text-xs">
										{skill.category}
									</span>
									<span
										className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
											skill.difficulty
										)}`}
									>
										{skill.difficulty}
									</span>
									<span className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs">
										⏱️ {skill.estimatedTime}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<div className="text-xs text-slate-400">Click to start practicing</div>
									<div className="text-purple-400 group-hover:text-purple-300 transition-colors">
										<svg
											className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M13 7l5 5m0 0l-5 5m5-5H6"
											/>
										</svg>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>

			{/* Footer Tips */}
			<div className="mt-8 p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-lg border border-slate-600">
				<h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
					💡 Study Tips for Key Skills
				</h3>

				<div className="grid md:grid-cols-2 gap-6 text-sm">
					<div>
						<h4 className="font-semibold text-purple-200 mb-2">Practice Strategy:</h4>
						<ul className="list-disc pl-5 space-y-1 text-slate-300">
							<li>Start with easier skills to build confidence</li>
							<li>Use favorites to track challenging areas</li>
							<li>Practice data analysis skills regularly</li>
							<li>Connect skills to real-world examples</li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold text-purple-200 mb-2">Assessment Preparation:</h4>
						<ul className="list-disc pl-5 space-y-1 text-slate-300">
							<li>Focus on skills matching your SAC requirements</li>
							<li>Practice explaining your reasoning clearly</li>
							<li>Use correct VCE HHD terminology</li>
							<li>Time yourself on harder skills</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
