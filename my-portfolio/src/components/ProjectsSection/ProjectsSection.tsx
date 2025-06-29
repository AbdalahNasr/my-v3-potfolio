"use client";

import React, { useRef } from "react";
import { useLanguage } from "../LanguageToggle/LanguageContext";
import styles from './ProjectsSection.module.scss';

const projectImages = [
	"https://cdn.pixabay.com/photo/2018/05/04/20/01/website-3374825_1280.jpg",
	"https://cdn.pixabay.com/photo/2018/03/27/12/16/analytics-3265840_1280.jpg",
	"https://cdn.pixabay.com/photo/2017/12/29/12/07/mobile-phone-3047321_1280.jpg"
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

	// Get projects from locale JSON
	const projectsList = t.projects.projectsList;
	const projectKeys = Object.keys(projectsList);

	// Create refs for each card
	const cardRefs = React.useMemo(() => projectKeys.map(() => React.createRef<HTMLDivElement>()), [projectKeys.length]);

	React.useEffect(() => {
		cardRefs.forEach((ref) => {
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
		});
	}, [cardRefs]);

	return (
		<section
			id="projects"
			className={
				styles.projectsSection +
				" w-full max-w-screen overflow-x-hidden px-4 py-20 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
			}
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
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					style={{
						width: "100%",
						margin: "0 auto",
					}}
				>
					{projectKeys.map((key, idx) => {
						const project = projectsList[key];
						const image = projectImages[idx] || projectImages[0];
						return (
							<div
								key={project.title}
								className="project-card"
								ref={cardRefs[idx]}
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
									src={image}
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
									{project.description}
								</p>
								<div
									style={{
										display: "flex",
										flexWrap: "wrap",
										gap: 8,
										marginBottom: 16,
									}}
								>
									{project.technologies && project.technologies.map((tech: string) => (
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
									{project.features && project.features.map((b: string, i: number) => (
										<li key={i}>{b}</li>
									))}
								</ul>
					{project.link && project.repo ? (
					  <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
						<a
						  href={project.link}
						  target="_blank"
						  rel="noopener noreferrer"
						  style={{
							display: "inline-flex",
							alignItems: "center",
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
						  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						  </svg>
						  {t.projects.liveDemo}
						</a>
						<a
						  href={project.repo}
						  target="_blank"
						  rel="noopener noreferrer"
						  style={{
							display: "inline-flex",
							alignItems: "center",
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
						  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
							<path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
						  </svg>
						  GitHub
						</a>
					  </div>
					) : (
					  <a
						href={project.repo || project.link || "#ok"}
						target="_blank"
						rel="noopener noreferrer"
						style={{
						  display: "inline-flex",
						  alignItems: "center",
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
						  marginTop: "auto"
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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
						  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
						</svg>
						GitHub
					  </a>
					)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ProjectsSection;
