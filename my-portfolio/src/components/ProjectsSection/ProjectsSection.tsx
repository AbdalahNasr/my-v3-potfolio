"use client";

import React, { useRef } from "react";
import { useLanguage } from "../LanguageToggle/LanguageContext";

const demoProjects = [
	{
		image:
			"https://cdn.pixabay.com/photo/2018/05/04/20/01/website-3374825_1280.jpg",
		title: "E-Commerce Platform",
		desc: "A modern e-commerce solution with 3D product previews and AR try-on features.",
		tech: ["React", "Three.js", "AR"],
		details:
			"A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
		bullets: [
			"User authentication and authorization",
			"Product catalog with search and filters",
			"Shopping cart and checkout process",
			"Payment integration with Stripe",
			"Admin dashboard for inventory management",
			"Order tracking and management",
		],
		link: "#",
	},
	{
		image:
			"https://cdn.pixabay.com/photo/2018/03/27/12/16/analytics-3265840_1280.jpg",
		title: "Analytics Dashboard",
		desc: "Interactive data visualization dashboard with real-time updates and customizable widgets.",
		tech: ["Next.js", "D3.js", "WebSocket"],
		details:
			"A collaborative task management application with real-time updates and team collaboration features.",
		bullets: [
			"Real-time collaboration",
			"Task assignment and tracking",
			"Project organization",
			"Team chat functionality",
			"File attachments",
			"Progress analytics",
		],
		link: "#",
	},
	{
		image:
			"https://cdn.pixabay.com/photo/2017/12/29/12/07/mobile-phone-3047321_1280.jpg",
		title: "Fitness Tracker App",
		desc: "A cross-platform fitness application with personalized workout plans and progress tracking.",
		tech: ["Flutter", "Firebase", "AI"],
		details:
			"A cross-platform fitness application with personalized workout plans and progress tracking.",
		bullets: [
			"Personalized workout plans",
			"Progress tracking",
			"Nutrition logging",
			"Social sharing",
			"Goal setting",
		],
		link: "#",
	},
];

const cardColors = [
	{
		light: "#fbbf24", // amber-400
		dark: "#b45309", // amber-700
	},
	{
		light: "#38bdf8", // sky-400
		dark: "#0369a1", // sky-800
	},
	{
		light: "#a78bfa", // violet-400
		dark: "#6d28d9", // violet-800
	},
];

function useTheme(): "light" | "dark" {
	if (typeof window === "undefined") return "light";
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function useCardParallax() {
	const ref = useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const handleMove = (e: MouseEvent) => {
			const rect = el.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			const rotateX = ((y - centerY) / centerY) * 10;
			const rotateY = ((x - centerX) / centerX) * 10;
			el.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
			el.style.boxShadow = `0 12px 40px 0 rgba(0,0,0,0.18), 0 0 32px 2px rgba(80,180,255,0.12)`;
		};
		const handleLeave = () => {
			el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
			el.style.boxShadow = "";
		};
		el.addEventListener("mousemove", handleMove);
		el.addEventListener("mouseleave", handleLeave);
		return () => {
			el.removeEventListener("mousemove", handleMove);
			el.removeEventListener("mouseleave", handleLeave);
		};
	}, []);

	return ref;
}

const en = require("../../locales/en.json");
const ar = require("../../locales/ar.json");

const ProjectsSection: React.FC = () => {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");
	const { lang } = useLanguage();
	const t = lang === "ar" ? ar : en;

	React.useEffect(() => {
		const updateTheme = () => {
			setTheme(
				document.documentElement.classList.contains("dark") ? "dark" : "light"
			);
		};
		updateTheme();
		window.addEventListener("storage", updateTheme);
		const observer = new MutationObserver(updateTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => {
			window.removeEventListener("storage", updateTheme);
			observer.disconnect();
		};
	}, []);

	return (
		<section
			id="projects"
			style={{
				minHeight: "100vh",
				background:
					theme === "dark"
						? "linear-gradient(135deg, #18181b 0%, #312e81 100%)"
						: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
				padding: "4rem 0",
				position: "relative",
				transition: "background 0.3s",
			}}
		>
			<style>{`
			.project-card {
				position: relative;
				transition: box-shadow 0.5s, transform 0.3s;
				z-index: 1;
				border-radius: 15px;
				overflow: hidden;
				background: ${theme === "dark" ? "#1e1e1e" : "#fff"};
			}
			.project-card::before {
				content: '';
				position: absolute;
				top: 0; left: 0; right: 0; bottom: 0;
				border-radius: inherit;
				z-index: -1;
				background: ${theme === "dark"
					? "radial-gradient(circle, rgba(38,41,199,0.66) 0%, rgba(199,87,190,0.86) 50%, rgba(234,83,237,1) 100%)"
					: "radial-gradient(circle, rgba(149,76,233,0.85) 0%, rgba(76,201,240,0.7) 50%, rgba(255,255,255,0.2) 100%)"};
				background-size: 300% 300%;
				animation: gradientShift 3s ease infinite;
				opacity: 1;
				filter: blur(2.5px) brightness(1.15);
			}
			@keyframes gradientShift {
				0% { background-position: 0% 50%; }
				50% { background-position: 100% 50%; }
				100% { background-position: 0% 50%; }
			}
			.project-card:hover {
				box-shadow: 0 0 10px rgba(38,41,199,0.5), 0 0 20px rgba(199,87,190,0.4), 0 0 30px rgba(234,83,237,0.3);
				transform: scale(1.045);
			}
		`}</style>
			<div
				style={{
					maxWidth: 1200,
					margin: "0 auto",
					padding: "0 1.5rem",
				}}
			>
				<h2
					style={{
						fontSize: "2.5rem",
						fontWeight: 700,
						textAlign: "center",
						marginBottom: "3rem",
						color: "#954ce9",
						transition: "color 0.3s",
					}}
				>
					{t.projects.title}
				</h2>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
						gap: "2rem",
					}}
				>
					{demoProjects.map((project, idx) => {
						const cardRef = useCardParallax();
						return (
							<div
								key={project.title}
								className="project-card"
								ref={cardRef}
								style={{
									borderRadius: 15,
									padding: "2rem 1.5rem 1.5rem 1.5rem",
									display: "flex",
									flexDirection: "column",
									minHeight: 420,
									position: "relative",
									color: theme === "dark" ? "#e2e8f0" : "#2d3748",
									boxShadow: theme === "dark"
										? "0 8px 32px rgba(0,0,0,0.32)"
										: "0 8px 32px rgba(0,0,0,0.12)",
									background: theme === "dark" ? "#1e1e1e" : "#fff",
									transition:
										"background 0.3s, color 0.3s, box-shadow 0.3s, transform 0.3s",
								}}
							>
								<img
									src={project.image}
									alt={project.title}
									style={{
										width: "100%",
										height: 160,
										objectFit: "cover",
										borderRadius: 12,
										marginBottom: 16,
										boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
									}}
								/>
								<h3
									style={{
										fontSize: "1.5rem",
										fontWeight: 700,
										marginBottom: 8,
									}}
								>
									{project.title}
								</h3>
								<p
									style={{
										fontSize: "1.1rem",
										marginBottom: 12,
									}}
								>
									{project.desc}
								</p>
								<div
									style={{
										display: "flex",
										flexWrap: "wrap",
										gap: 8,
										marginBottom: 16,
									}}
								>
									{project.tech.map((tech) => (
										<span
											key={tech}
											style={{
												background:
													theme === "dark"
													? "linear-gradient(90deg, #ba68ff 0%, #954ce9 100%)"
													: "linear-gradient(90deg, #954ce9 0%, #4cc9f0 100%)",
												color: "#fff",
												borderRadius: 8,
												padding: "2px 12px",
												fontSize: 13,
												fontWeight: 600,
												boxShadow: theme === "dark"
													? "0 1px 6px #ba68ff44"
													: "0 1px 6px #4cc9f044",
												transition: "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s",
												cursor: "pointer",
												display: "inline-block",
											}}
										onMouseEnter={e => {
											e.currentTarget.style.transform = "scale(1.08)";
											e.currentTarget.style.boxShadow = theme === "dark"
												? "0 2px 12px 0 #ba68ff88"
												: "0 2px 12px 0 #4cc9f088";
										}}
										onMouseLeave={e => {
											e.currentTarget.style.transform = "scale(1)";
											e.currentTarget.style.boxShadow = theme === "dark"
												? "0 1px 6px #ba68ff44"
												: "0 1px 6px #4cc9f044";
										}}
										>
											{tech}
										</span>
									))}
								</div>
								<ul
									style={{
										fontSize: 14,
										marginBottom: 16,
										paddingLeft: 18,
									}}
								>
									{project.bullets.map((b, i) => (
										<li key={i}>{b}</li>
									))}
								</ul>
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									style={{
										marginTop: "auto",
										display: "inline-block",
										background:
											theme === "dark"
												? "linear-gradient(90deg, #ba68ff 0%, #954ce9 100%)"
												: "linear-gradient(90deg, #954ce9 0%, #4cc9f0 100%)",
										color: "#fff",
										border: "none",
										borderRadius: 8,
										padding: "10px 24px",
										fontWeight: 600,
										textDecoration: "none",
										boxShadow: theme === "dark"
											? "0 2px 12px rgba(149,76,233,0.18)"
											: "0 2px 12px rgba(76,201,240,0.18)",
										transition: "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s",
										fontSize: 16,
										letterSpacing: 0.5,
										cursor: "pointer",
									}}
									onMouseEnter={e => {
										e.currentTarget.style.transform = "scale(1.06)";
										e.currentTarget.style.boxShadow = theme === "dark"
											? "0 4px 24px 0 #ba68ff88"
											: "0 4px 24px 0 #4cc9f088";
									}}
									onMouseLeave={e => {
										e.currentTarget.style.transform = "scale(1)";
										e.currentTarget.style.boxShadow = theme === "dark"
											? "0 2px 12px rgba(149,76,233,0.18)"
											: "0 2px 12px rgba(76,201,240,0.18)";
									}}
								>
									Visit Project
								</a>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ProjectsSection;
