import './App.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Achievements from './components/Sections/Achievements/Achievements'
import Education from './components/Sections/Education/Education'
import Experience from './components/Sections/Experience/Experience'
import Glance from './components/Sections/Glance/Glance'
import Information from './components/Sections/Information/Information'
import Publications from './components/Sections/Publications/Publications'
import Skills from './components/Sections/Skills/Skills'
import Summary from './components/Sections/Summary/Summary'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header></Header>
        <div className='container'>
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
    </BrowserRouter>
  )
}

export default App
