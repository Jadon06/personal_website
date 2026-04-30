import React from 'react'
import './Projects.css'

const projects = [
  {
    numeral: 'I',
    logo: '/Logo.png',
    name: 'Canadian Athlete Network',
    url: 'https://canadian-athlete-directory-1c1o.vercel.app/',
    date: 'Feb 2026 – Apr 2026',
    bullets: [
      'Engineered a high-performance REST API with FastAPI, supporting advanced athlete discovery through K-Nearest Neighbours (KNN) search and secure email-based authentication.',
      "Implemented a real-time direct messaging system using FastAPI's WebSocket framework to enable seamless athlete-recruiter communication.",
      'Containerized the full application stack by separating frontend and backend services into independent Dockerfiles and orchestrating them with Docker Compose for reliable, reproducible deployments.',
      'Developing a modern, responsive frontend using React and TypeScript, focusing on clean UI patterns and scalable component architecture.',
    ],
  },
  {
    numeral: 'II',
    name: 'UFC Parlay Predictor',
    url: 'https://ufc-parlay-predictor.vercel.app/',
    date: 'Apr 2026 – May 2026',
    bullets: [
      'Scraped and cleaned 10,000+ UFC fight statistics using Pandas to build a structured dataset, engineering features such as fighter matchup history and using boolean masks to detect rematches.',
      'Designed a multi-LLM pipeline to ingest and parse raw UFC parlay text, using prompt engineering and structured JSON outputs to reliably extract fighters, odds, and bet types for downstream modeling.',
      'Implemented output validation and correction layers for LLM responses, enforcing schema constraints and reducing extraction errors through rule-based checks and fallback parsing strategies.',
      'Trained multiple XGBoost models on 5,000+ UFC fights to predict outcomes (win/loss, over/under, and survival time), integrating LLM-extracted features into a unified predictive betting framework.',
    ],
  },
  {
    numeral: 'III',
    name: 'Sacramento Kings NBA Performance Analysis & AI Pipeline',
    date: 'Apr 2026 – Present',
    bullets: [
      'Built a modular data extraction pipeline using BeautifulSoup and Requests to scrape 25+ years of structured data from Basketball Reference — including game logs, rosters, advanced metrics (Offensive/Defensive Rating, SRS, Pace), and player transaction histories — handling edge cases such as multi-level HTML headers, comment-hidden tables, and rate limiting.',
      'Developed an LSTM autoencoder in Keras/TensorFlow to encode 66-game regular season sequences into dense 16-dimensional latent representations, enabling unsupervised comparison of team seasons across different eras.',
      'Applied KMeans clustering and PCA dimensionality reduction to surface structural similarities between Sacramento Kings seasons and championship-winning teams since 2000, identifying that Kings seasons cluster as a statistically distinct group from champions across offensive rating, pace, and win patterns.',
      'Built a RAG agent using LangChain, ChromaDB, and Claude (Anthropic) to answer natural language queries over 50+ years of NBA transaction records — implementing RAG Fusion with reciprocal rank fusion to broaden semantic retrieval coverage, and enforcing structured JSON output via Pydantic schemas.',
      'Diagnosed and resolved multiple data integrity issues including ChromaDB batch size limits, pandas type coercion bugs across merged DataFrames, and inner-join data loss in multi-source merge pipelines.',
    ],
  },
  {
    numeral: 'IV',
    name: 'Wage Analysis',
    date: 'Sep 2025 – Dec 2025',
    bullets: [
      'Conducted EDA and data sanitization for data from 2021–2022 found on StatCan, analyzing how the rise of AI affected wages and concluding that AI had some relation to a decline in wages, though not the only contributor.',
      'Used Matplotlib and Seaborn to visualize data via heatmaps, scatterplots, and lineplots, while organizing datasets into clean, readable data using spatial and time-based aggregation across multiple Pandas dataframes.',
    ],
  },
  {
    numeral: 'V',
    name: 'Social Media API',
    date: 'Dec 2025 – Jan 2026',
    bullets: [
      'Developed scalable RESTful APIs using FastAPI and ORM integrations to streamline database operations, designing and optimizing PostgreSQL schemas with pgAdmin4 to improve query performance and data reliability.',
      'Containerized backend services with Docker and deployed on DigitalOcean with CI/CD pipelines supporting automated testing and continuous delivery using GitHub Actions.',
      'Configured and maintained Ubuntu servers with Nginx to provide secure, stable runtime environments, implementing feature flag testing to enable controlled rollouts and A/B experimentation for new API features.',
    ],
  },
]

export default function Projects({ onScroll }: { onScroll?: React.UIEventHandler<HTMLDivElement> }) {
  return (
    <div className="projects-page" onScroll={onScroll}>
      <header className="projects-header">
        <h2 className="projects-title">Projects</h2>
        <div className="tech-icons" aria-label="Tech stack">
          {/* Python */}
          <svg viewBox="0 0 24 24" className="tech-icon" role="img" aria-label="Python">
            <path fill="#3776AB" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031V15.18s-.109-3.402 3.353-3.402h5.773s3.243.052 3.243-3.143V3.514S18.357 0 11.914 0zm-3.22 1.867a1.051 1.051 0 1 1 0 2.103 1.051 1.051 0 0 1 0-2.103z"/>
            <path fill="#FFD43B" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.131S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.752s.109 3.402-3.353 3.402H9.44s-3.243-.052-3.243 3.143v5.121S5.643 24 12.086 24zm3.22-1.867a1.051 1.051 0 1 1 0-2.103 1.051 1.051 0 0 1 0 2.103z"/>
          </svg>
          {/* TypeScript */}
          <svg viewBox="0 0 24 24" className="tech-icon" role="img" aria-label="TypeScript">
            <path fill="#3178C6" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.12 1.21-.358 1.658a3.09 3.09 0 0 1-.999 1.106 4.277 4.277 0 0 1-1.498.596 8.36 8.36 0 0 1-1.885.196 12.104 12.104 0 0 1-1.746-.121 8.908 8.908 0 0 1-1.508-.386V17.28a4.57 4.57 0 0 0 .782.399 6.16 6.16 0 0 0 .925.26 8.23 8.23 0 0 0 2.183.18 3.42 3.42 0 0 0 .818-.096 2.1 2.1 0 0 0 .646-.278.844.844 0 0 0 .341-.496.978.978 0 0 0-.016-.51 1.02 1.02 0 0 0-.32-.496 4.863 4.863 0 0 0-.718-.453c-.297-.156-.655-.315-1.073-.477a16.8 16.8 0 0 1-1.122-.523 7.36 7.36 0 0 1-.918-.575 3.863 3.863 0 0 1-.661-.684 2.785 2.785 0 0 1-.424-.852c-.1-.33-.15-.695-.15-1.095 0-.63.113-1.17.34-1.62a3.42 3.42 0 0 1 .96-1.142 4.21 4.21 0 0 1 1.45-.683 6.81 6.81 0 0 1 1.82-.228zm-8.567 1.885v8.89h3.361v2.476H7.272v-2.476h3.361v-8.89H7.272V9.75h6.709v1.885h-3.36z"/>
          </svg>
          {/* JavaScript */}
          <svg viewBox="0 0 24 24" className="tech-icon" role="img" aria-label="JavaScript">
            <path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
          </svg>
          {/* Rust */}
          <svg viewBox="0 0 24 24" className="tech-icon" role="img" aria-label="Rust">
            <path fill="#CE412B" d="M23.834 11.703a12.002 12.002 0 0 1-8.74 11.575 12.002 12.002 0 0 1-13.644-5.77 12.002 12.002 0 0 1 1.154-13.498A12.002 12.002 0 0 1 15.963.334a12.002 12.002 0 0 1 7.871 11.369zM11.934 1.43a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21zm.012 1.902l.392 1.183h1.27l-1.028.746.39 1.184-1.024-.744-1.023.744.388-1.184-1.024-.746h1.265l.394-1.183zm-5.157 2.767l.392 1.183h1.27l-1.024.745.39 1.184-1.024-.744-1.022.744.387-1.184-1.024-.745h1.264l.391-1.183zm10.34 0l.39 1.183h1.27l-1.024.745.39 1.184-1.023-.744-1.024.744.39-1.184-1.025-.745h1.265l.39-1.183zM4.388 11.308l.392 1.183h1.27l-1.024.745.39 1.184-1.024-.744-1.023.744.389-1.184-1.025-.745h1.265l.39-1.183zm14.993 0l.392 1.183h1.27l-1.025.745.39 1.184-1.023-.744-1.024.744.39-1.184-1.025-.745h1.264l.391-1.183zM6.78 16.424l.392 1.183h1.27l-1.024.745.39 1.184-1.024-.744-1.022.744.387-1.184-1.024-.745h1.264l.391-1.183zm10.34 0l.39 1.183h1.27l-1.024.745.39 1.184-1.023-.744-1.024.744.39-1.184-1.025-.745h1.265l.39-1.183zm-5.17 3.236l.392 1.183h1.27l-1.024.745.39 1.184-1.024-.744-1.023.744.389-1.184-1.025-.745h1.265l.39-1.183zM8.49 9.029l2.367 1.463-.316.511-2.367-1.463zm6.512 1.974l-.316-.511 2.367-1.463.316.511zM7.938 12l.176-.617 2.736.783-.176.617zm7.92.166l-.176-.617 2.736-.783.176.617zm-6.148 2.402l2.367-1.463.316.511-2.367 1.463zM12 10.705a1.295 1.295 0 1 1 0 2.59 1.295 1.295 0 0 1 0-2.59zm-2.57 1.47H7.986v.65h1.138v1.765H7.986v.65h3.444v-.65H10.29v-1.765h1.14v-.65zm5.14 0h-.65v2.06a.65.65 0 1 0 1.3 0v-2.06h-.65z"/>
          </svg>
          {/* C++ */}
          <svg viewBox="0 0 24 24" className="tech-icon" role="img" aria-label="C++">
            <path fill="#00599C" d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 0 1 6.156 3.553l-3.076 1.78a3.567 3.567 0 0 0-3.08-1.78A3.56 3.56 0 0 0 8.444 12 3.56 3.56 0 0 0 12 15.555a3.57 3.57 0 0 0 3.08-1.778l3.078 1.78A7.135 7.135 0 0 1 12 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/>
          </svg>
        </div>
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
