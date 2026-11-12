import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi'
import { iconForProject, iconForTool } from '../utils/helpers.js'

function ProjectCard({ project, index, onDetails }) {
  return (
    <article className={`project-card project-${project.accent}`}>
      <div className="project-art">
        <img className="project-art-photo" src={project.image} alt={project.imageAlt} loading="lazy" onError={(event) => { event.currentTarget.hidden = true }} />
        <span className="project-art-shade" />
        <div className="project-art-grid" />
        <span className="project-art-icon">{iconForProject(project.icon)}</span>
        <div className="project-art-window">
          <div className="project-art-topline">
            <i />
            <i />
            <i />
          </div>
          <div className="project-art-bars">
            {[38, 64, 46, 81, 58, 93, 70].map((height, barIndex) => (
              <span key={barIndex} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
        <span className="project-art-number">0{index + 1}</span>
      </div>
      <div className="project-card-content">
        <div className="project-card-topline">
          <span className="project-category">{project.category}</span>
          <button
            className="icon-button project-details-button"
            type="button"
            onClick={() => onDetails(project)}
            aria-label={`View details for ${project.title}`}
          >
            <FiArrowUpRight />
          </button>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-list">
          {project.tools.map((tool) => <span className="tag" key={tool}>{iconForTool(tool)}{tool}</span>)}
        </div>
        <div className="project-links">
          <button type="button" onClick={() => onDetails(project)}>View details <FiArrowUpRight aria-hidden="true" /></button>
          <a href="#dashboard">
            Sample dashboard <FiExternalLink aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard