import "./Experience.css";
import experiences from "../../../data/Experience.json";
import highlightWords from "../../../data/Highlighter.json";
import {formatDate} from "../../../utils";

const Highlighter = (input) => {
    let words = input.split(/\s+/);

    // Iterate over each word and wrap it in <mark> tags if it matches any word in the highlight list
    let highlightedWords = words.map(word => {
        // Remove punctuation from the word for accurate matching
        let cleanedWord = word.replace(/[.,!?;:()]/g, '');
        if (highlightWords.includes(cleanedWord.toLowerCase())) {
            return `<mark>${word}</mark>`;
        }
        return word;
    });

    return highlightedWords.join(' ');
}

const ExperienceFactory = () => {
    const arrowSymbol = String.fromCodePoint(0x02794)

    const metaTypeFinder = (metaType) => {
        let output = "";
        switch(metaType) {
            case "contract": output = "C"; break;
            case "full-time": output = "FT"; break;
            case "part-time": output = "PT"; break;
            default: output = "";
        }
        if(output.length > 0){
            return "[" + output + "]";
        }
        return output;
    }

    return experiences.map((experience, index) => {
        return experience.meta.display && (
            <div key={index}>
                <div className={`job ${experience.meta.class}`}>
                    <div className="row">
                        <div className="date col-8" title={`${experience.dates.start} to ${experience.dates.end}`}>
                            {formatDate(experience.dates.start)} {experience.dates.end ? arrowSymbol : ""} {formatDate(experience.dates.end)}
                        </div>
                        <div className="col-4 float-right">{experience.company.type}
                            {experience.meta.remote === "remote" ? ", Remote" : ""}
                            {experience.meta.remote === "hybrid" ? ", Hybrid" : ""}
                            {experience.meta.remote === "in-person" ? ", In Person" : ""}
                        </div>
                    </div>
                    <div className="row">
                        <div className="title col-8">
                            <span className="blue-span">{experience.title}</span> / {experience.company.name} {metaTypeFinder(experience.meta.type)}
                        </div>
                        <div className="col-4 float-right">{experience.company.location}</div>
                    </div>
                    <div className="row">
                        <div className="responsibilities col" dangerouslySetInnerHTML={{__html: Highlighter(experience.responsibilities) }}/>
                    </div>
                </div>
                <hr className={`${experience.meta.class}-hr`}/>
            </div>
        )
    })
}

export default function Experience() {
    return (
        experiences.length > 0 && (
            <div id="experience" className="section">
                <h2 className="row">Experience</h2>
                <figcaption className={"blockquote-footer"}>
                    Key &raquo; C: Contract, FT: Full Time, PT: Part Time &laquo;
                </figcaption>
                {ExperienceFactory()}
            </div>
        )
    )
}
