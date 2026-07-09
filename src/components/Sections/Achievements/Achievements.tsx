import DetailRows from '../../primitives/DetailRows'
import Section from '../../primitives/Section'
import SectionTitle from '../../primitives/SectionTitle'
import { useResumeSection, useResumeSectionData } from '../../../resume/context'
import type { AchievementItem, ListSectionData } from '../../../resume/types'

interface AchievementsData extends ListSectionData<AchievementItem> {
  displaySeparator: boolean
}

const AchievementsFactory = (achievementsSection: AchievementsData) => {
  return (
    <DetailRows
      asideClassName='blue-span'
      descriptionFor={award => award.description}
      items={achievementsSection.items.filter(award => award.meta.display)}
      keyFor={(award, index) => `${award.name}-${index}`}
      renderAside={award => award.year}
      showSeparator={achievementsSection.displaySeparator}
      titleFor={award => award.name}
    />
  )
}

export default function Achievements() {
  const { isVisible, section } = useResumeSection('achievements')
  const achievements = useResumeSectionData<AchievementsData>('achievements', {
    displaySeparator: true,
    items: [],
  })

  return (
    isVisible &&
    achievements.items.length > 0 && (
      <Section id='achievements'>
        <SectionTitle>{section?.title}</SectionTitle>
        {AchievementsFactory(achievements)}
      </Section>
    )
  )
}
