import { Fragment } from 'react'

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`section-heading${centered ? ' section-heading-centered' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>
        {title.split('<br />').map((line, index) => (
          <Fragment key={line}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export default SectionHeading
