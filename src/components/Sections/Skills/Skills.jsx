import "./Skills.css";
import skills from "../../../data//Skills.json";
import {rand} from "../../../utils";

const SkillsFactory = () => {
  let output = [];
  for(let i = 0; i < skills.length; i+=3){
    let slice = skills.slice(i, i+3)
    output.push(
      <div key={rand()} className="col">
        <div>{slice[0]}</div>
        <div>{slice[1]}</div>
        <div>{slice[2]}</div>
      </div>
    )
  }
  return output;
}

export default function Skills() {
  return (
    skills.length > 0 && <div id="skills" className="section">
      <h2 className="row">Skills</h2>
      <div className="row">
        { SkillsFactory() }
      </div>
    </div>
  )
}
