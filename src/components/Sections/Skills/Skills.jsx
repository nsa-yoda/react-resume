import "./Skills.css";
import skills from "../../../data/Skills.json";
import {rand} from "../../../utils";

const SkillsFactory = () => {
  let output = [];
  let arrow = "\u276F";
  let skillsColumns = 6;
  let sliceLen = Math.ceil(skills.length / skillsColumns);

  for(let i = 0; i < skills.length; i+=sliceLen){
    let slice = skills.slice(i, i+sliceLen)
    output.push(
      <div key={rand()} className="col">
        <div>{slice[0] && arrow} {slice[0]}</div>
        <div>{slice[1] && arrow} {slice[1]}</div>
        <div>{slice[2] && arrow} {slice[2]}</div>
        <div>{slice[3] && arrow} {slice[3]}</div>
      </div>
    )
  }
  return output
}

export default function Skills() {
  return (
    skills.length > 0 && (
      <div id='skills' className='section'>
        <h2 className='row'>Skills</h2>
        <div className='row'>{SkillsFactory()}</div>
      </div>
    )
  )
}
