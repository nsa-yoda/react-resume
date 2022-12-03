import "./Glance.css";
import glance from "../../../data/AtAGlance.json";
import {replaceYearsExperience} from "../../../utils";

const AtAGlanceFactory = () => {
  return glance.map((datum, index) => {
    return (
      <div key={index} className="row">
        <div className="col-12">
          {replaceYearsExperience(datum)}
        </div>
      </div>
    )
  })
}

export default function Glance(){
  return (
    <div id="glance" className="section">
      <h2 className="row">At A Glance</h2>
      { AtAGlanceFactory() }
    </div>
  )
}
