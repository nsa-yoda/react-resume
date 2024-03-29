import './Publications.css'
import publications from '../../../data/Publications.json'

const PublicationFactory = () => {
  return publications.map((pub, index) => {
    return (
      pub.meta.display && (
        <div key={index} className='row separator'>
          <span className='col-2'>
            <strong>{pub.name}</strong>
          </span>
          <span className='col-8'>{pub.description}</span>
          <span className='col-2 blue-span float-right'>{pub.url}</span>
        </div>
      )
    )
  })
}

export default function Publications() {
  return (
    publications.length > 0 && (
      <div id='publications' className='section'>
        <h2 className='row'>Publications and Software</h2>
        {PublicationFactory()}
      </div>
    )
  )
}
