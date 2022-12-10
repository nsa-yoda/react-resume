import "./Information.css";
import information from "../../../data/Information.json";
import isUrl from "../../../utils/utils";
import normalizeUrl from "normalize-url";

const InformationSocials = () => {
  return information.meta.socials.map((social, index) => {
    const wrapper = (social) => {
      if (isUrl(social)){
        return (
          <a href={normalizeUrl(social)} rel="noreferrer" target="_blank">{social}</a>
        )
      }
      return social;
    }

    return (
      <li key={index}>{wrapper(social)}</li>
    )
  })
}
export default function Information(){
  const email = information.meta.email.address
  const link = information.meta.email.link
  return (
    information.meta.display && <div id="vital_information" className="section">
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
              {information.meta.location && <li>{information.meta.location}</li>}
              {information.meta.phone && <li>{information.meta.phone}</li>}
              {email && <li>{link ? <a href={`mailto:${email}`}>{email}</a> : email}</li>}
              { InformationSocials() }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


