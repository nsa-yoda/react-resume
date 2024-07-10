import "./Education.css";
import education from "../../../data/Education.json";
import {formatDate} from "../../../utils";


function EducationFactory() {
  return education.map((edu, index) => {
      let outerClass = "row w-100";
      let innerClass = "title col-9";
      let dateClass = "date col-3";
      let responsibilitiesClass = "responsibilities row w-100";

      dateClass = !edu.dates.showDate ? "hidden " + dateClass : dateClass;
      innerClass = !edu.dates.showDate ? "title col-12" : innerClass;

      return (
      edu.meta.display && <div key={index} className="school">
        <div className={outerClass}>
          <div className={dateClass}>{`${formatDate(edu.dates.start)} to ${formatDate(edu.dates.end)}`}</div>
          <div className={innerClass}>
            <span className="blue-span"></span>{edu.degree.short_name} / {edu.school.name} <span className="float-right">{edu.school.location}</span>
          </div>
        </div>
        <div className={responsibilitiesClass}>
          <p className="col">{edu.degree.long_name}</p>
        </div>
      </div>
    )
  })
}

export default function Education(){
  return (
      education.length > 0 && (
          <div id="education" className="section">
            <h2 className="row">Education</h2>
            { EducationFactory() }
          </div>
      )
  )
}
