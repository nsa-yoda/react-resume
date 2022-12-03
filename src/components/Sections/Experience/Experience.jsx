import "./Experience.css";
import experiences from "../../../data/Experience.json";
import {formatDate} from "../../../utils";


const ExperienceFactory = () => {
  return experiences.map((experience, index) => {
    return experience.meta.display && (
      <div key={index}>
        <div className={`job ${experience.meta.class}`}>
          <div className="row">
            <div className="date col-8" title={`${experience.dates.start} to ${experience.dates.end}`}>
              {formatDate(experience.dates.start)} . {formatDate(experience.dates.end)}
            </div>
            <div className="col-4 float-right">{experience.company.type}</div>
          </div>
          <div className="row">
            <div className="title col-8">
              <span className="blue-span">{experience.title}</span> / {experience.company.name}
            </div> 
            <div className="col-4 float-right">{experience.company.location}</div>
          </div>
          <div className="row">
            <div className="responsibilities col">
              <p>{experience.responsibilities}</p>
            </div>
          </div>
        </div>
        <hr className={`${experience.meta.class}-hr`}/>
      </div>
    )
  })
}

export default function Experience() {
  return (
    <div id="experience" className="section">
      <h2 className="row">Experience</h2>
      {ExperienceFactory()}
    </div>
  )
}
