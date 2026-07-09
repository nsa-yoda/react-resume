import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ResumeLayout from '../../components/primitives/ResumeLayout'
import { useViewOptions } from '../../resume/context'
import type { ThemeSection } from '../../resume/types'
import './classic.css'

interface ClassicThemeProps {
  sections: ThemeSection[]
}

export default function ClassicTheme({ sections }: ClassicThemeProps) {
  const { font = 'sans' } = useViewOptions()

  return (
    <div
      className={`App resume-theme resume-theme-classic resume-font-${font}`}
    >
      <Header />
      <ResumeLayout>
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </ResumeLayout>
      <Footer />
    </div>
  )
}
