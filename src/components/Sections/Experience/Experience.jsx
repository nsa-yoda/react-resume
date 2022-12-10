import "./Experience.css";
import experiences from "../../../data/Experience.json";
import {formatDate} from "../../../utils";


const ExperienceFactory = () => {
  return experiences.map((exp, index) => {
    const separator = (exp.title && exp.company.name) ? " / " : ""
    const dateSeparator = (exp.dates.start && exp.dates.end) ? "." : ""
    return exp.meta.display && (
      <div key={index} className={`job ${exp.meta.class} separator`}>
        <div className="row">
          <div className="date col-8" title={`${exp.dates.start} to ${exp.dates.end}`}>
            {formatDate(exp.dates.start)} {dateSeparator} {formatDate(exp.dates.end)}
          </div>
          <div className="col-4 float-right">{exp.company.type}</div>
        </div>
        <div className="row">
          <div className="title col-8">
            <span className="blue-span">{exp.title}</span> {separator} {exp.company.name}
          </div>
          <div className="col-4 float-right">{exp.company.location}</div>
        </div>
        <div className="row">
          <div className="responsibilities col">
            <p>{exp.responsibilities}</p>
          </div>
        </div>
      </div>
    )
  })
}

export default function Experience() {
  return (
    experiences.length > 0 && <div id="experience" className="section">
      <h2 className="row">Experience</h2>
      {ExperienceFactory()}
    </div>
  )
}
