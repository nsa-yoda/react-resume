import "./Summary.css";
import summary from "../../../data/Summary.json";

export default function Summary(){
  return (
    <div id="summary" className="section">
      { summary[0] }
    </div>
  )
}
