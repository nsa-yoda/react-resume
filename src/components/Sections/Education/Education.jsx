import "./Education.css";
import education from "../../../data/Education.json";
import {formatDate} from "../../../utils";


function EducationFactory() {
  return education.map((edu, index) => {
    return (
      edu.meta.display && <div key={index} className="school">
        <div className="row w-100">
          <div className="date col-3">{`${formatDate(edu.dates.start)} to ${formatDate(edu.dates.end)}`}</div>
          <div className="title col-9">
            <span className="blue-span"></span>{edu.degree.short_name} / {edu.school.name} <span className="float-right">{edu.school.location}</span>
          </div>
        </div>
        <div className="responsibilities row w-100">
          <p className="col">{edu.degree.long_name}</p>
        </div>
      </div>
    )
  })
}

export default function Education(){
  return (
    <div id="education" className="section">
      <h2 className="row">Education</h2>
      { EducationFactory() }
    </div>
  )
}
