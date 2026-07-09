import normalizeUrl from 'normalize-url'
import DetailRows from '../../primitives/DetailRows'
import Section from '../../primitives/Section'
import SectionTitle from '../../primitives/SectionTitle'
import { useResumeSection, useResumeSectionData } from '../../../resume/context'
import type { ListSectionData, PublicationItem } from '../../../resume/types'

interface PublicationsData extends ListSectionData<PublicationItem> {
  displaySeparator: boolean
}

const PublicationFactory = (publicationsSection: PublicationsData) => {
  return (
    <DetailRows
      asideClassName='blue-span'
      descriptionFor={pub => pub.description}
      items={publicationsSection.items.filter(pub => pub.display)}
      keyFor={(pub, index) => `${pub.name}-${index}`}
      renderAside={pub => (
        <a href={normalizeUrl(pub.url)} rel='noreferrer' target='_blank'>
          {pub.url}
        </a>
      )}
      showSeparator={publicationsSection.displaySeparator}
      titleFor={pub => pub.name}
    />
  )
}

export default function Publications() {
  const { isVisible, section } = useResumeSection('publications')
  const publications = useResumeSectionData<PublicationsData>('publications', {
    displaySeparator: true,
    items: [],
  })

  return (
    isVisible &&
    publications.items.length > 0 && (
      <Section id='publications'>
        <SectionTitle>{section?.title}</SectionTitle>
        {PublicationFactory(publications)}
      </Section>
    )
  )
}
