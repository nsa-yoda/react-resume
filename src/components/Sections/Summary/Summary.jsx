import "./Summary.css";
import summary from "../../../data/Summary.json";

export default function Summary(){
  return (
    summary.length > 0 && <div id="summary" className="section">
      { summary[0] }
    </div>
  )
}
