import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ResumeLayout from '../../components/primitives/ResumeLayout'
import { useViewOptions } from '../../resume/context'
import type { ThemeSection } from '../../resume/types'
import './stacked.css'

interface StackedThemeProps {
  sections: ThemeSection[]
}

export default function StackedTheme({
  sections,
}: StackedThemeProps): JSX.Element {
  const { font = 'sans' } = useViewOptions()

  return (
    <div
      className={`App resume-theme resume-theme-stacked resume-font-${font}`}
    >
      <Header />
      <ResumeLayout className='stacked-theme-shell'>
        {sections.map(({ id, Component }) => (
          <section className='stacked-theme-section' key={id}>
            <Component />
          </section>
        ))}
      </ResumeLayout>
      <Footer />
    </div>
  )
}
