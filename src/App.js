import './App.css';

import Achievements from './components/Sections/Achievements/Achievements';
import Footer from "./components/Footer/Footer";
import Education from "./components/Sections/Education/Education";
import Experience from "./components/Sections/Experience/Experience";
import Skills from "./components/Sections/Skills/Skills";
import Glance from "./components/Sections/Glance/Glance";
import Summary from "./components/Sections/Summary/Summary";
import Information from "./components/Sections/Information/Information";
import Publications from "./components/Sections/Publications/Publications";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Information></Information>
        <Summary></Summary>
        <Glance></Glance>
        <Skills></Skills>
        <Experience></Experience>
        <Education></Education>
        <Achievements></Achievements>
        <Publications></Publications>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
