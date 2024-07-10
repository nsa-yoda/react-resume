import './Achievements.css'
import achievements from '../../../data/Achievements.json'

const AchievementsFactory = () => {
  return achievements.map((award, index) => {
    return (
      award.meta.display && (
        <div className='row separator' key={index}>
          <span className='col-4'>
            <strong>{award.name}</strong>
          </span>
          <span className='col-6'>{award.description}</span>
          <span className='col-2 blue-span float-right'>{award.year}</span>
        </div>
      )
    )
  })
}

export default function Achievements() {
  return (
    achievements.length > 0 && (
      <div className='section' id='achievements'>
        <h2 className='row'>Awards, Achievements, and Certifications</h2>
        {AchievementsFactory()}
      </div>
    )
  )
}
