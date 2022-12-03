import "./Information.css";
import information from "../../../data/Information.json";

const InformationSocials = () => {
  return information.meta.socials.map((social, index) => {
    return (
      <li key={index}>{social}</li>
    )
  })
}
export default function Information(){
  return (
    <div id="vital_information" className="section">
      <div className="row">
        <div id="name" className="col text-left">
          <h1 id="first_name">
            {information.name.first} {information.name.middle} {information.name.last}
          </h1>
          <h2 id="last_name">
            {information.title}
          </h2>
        </div>

        <div id="contact_information" className="col text-right">
          <div className="row">
            <ul id="contact_information_list">
              <li>{information.meta.location}</li>
              <li>{information.meta.phone}</li>
              <li>{information.meta.email}</li>
              { InformationSocials() }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
