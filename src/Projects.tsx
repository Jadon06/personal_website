import React from 'react'
import './Projects.css'

const projects = [
  {
    numeral: 'I',
    logo: '/Logo.png',
    name: 'Canadian Athlete Network',
    url: 'https://canadian-athlete-directory-1c1o.vercel.app/',
    date: 'Feb 2026 – Present',
    bullets: [
      'Engineered a high-performance REST API with FastAPI, supporting advanced athlete discovery through K-Nearest Neighbours (KNN) search and secure email-based authentication.',
      "Implemented a real-time direct messaging system using FastAPI's WebSocket framework to enable seamless athlete-recruiter communication.",
      'Containerized the full application stack by separating frontend and backend services into independent Dockerfiles and orchestrating them with Docker Compose for reliable, reproducible deployments.',
      'Developing a modern, responsive frontend using React and TypeScript, focusing on clean UI patterns and scalable component architecture.',
    ],
  },
  {
    numeral: 'II',
    name: 'Social Media API',
    date: 'Dec 2025 – Jan 2026',
    bullets: [
      'Developed scalable RESTful APIs using FastAPI and ORM integrations to streamline database operations, designing and optimizing PostgreSQL schemas with pgAdmin4 to improve query performance and data reliability.',
      'Containerized backend services with Docker and deployed on DigitalOcean with CI/CD pipelines supporting automated testing and continuous delivery using GitHub Actions.',
      'Configured and maintained Ubuntu servers with Nginx to provide secure, stable runtime environments, implementing feature flag testing to enable controlled rollouts and A/B experimentation for new API features.',
    ],
  },
  {
    numeral: 'III',
    name: 'Wage Analysis',
    date: 'Sep 2025 – Dec 2025',
    bullets: [
      'Conducted EDA and data sanitization for data from 2021–2022 found on StatCan, analyzing how the rise of AI affected wages and concluding that AI had some relation to a decline in wages, though not the only contributor.',
      'Used Matplotlib and Seaborn to visualize data via heatmaps, scatterplots, and lineplots, while organizing datasets into clean, readable data using spatial and time-based aggregation across multiple Pandas dataframes.',
    ],
  },
  {
    numeral: 'IV',
    name: 'UFC Parlay Predictor',
    date: 'Aug 2025 – Sep 2025',
    bullets: [
      'Scraped and cleaned 10,000+ UFC fight statistics using Pandas to build a structured dataset, analyzing fighter matchups with boolean masks to detect rematches.',
      'Visualized trends with Seaborn/Matplotlib to prepare features for model training, and built regression models with Scikit-Learn to predict strikes, takedowns, and knockdowns.',
    ],
  },
]

export default function Projects({ onScroll }: { onScroll?: React.UIEventHandler<HTMLDivElement> }) {
  return (
    <div className="projects-page" onScroll={onScroll}>
      <header className="projects-header">
        <h2 className="projects-title">Projects</h2>
        <div className="projects-title-rule" />
      </header>
      <div className="projects-grid">
        {projects.map((p) => (
          <article className="project-card" key={p.name}>
            <div className="project-card-header">
              {'logo' in p
                ? <img src={p.logo} alt="" className="project-logo" />
                : <span className="project-numeral">{p.numeral}</span>
              }
              <div>
                <h3 className="project-name">
                  {'url' in p
                    ? <a className="project-link" href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>
                    : p.name}
                </h3>
                <span className="project-date">{p.date}</span>
              </div>
            </div>
            <ul className="project-bullets">
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
