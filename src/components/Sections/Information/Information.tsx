import React from 'react'
import './Information.css'
import isUrl from '../../../utils'
import normalizeUrl from 'normalize-url'
import LinkList from '../../primitives/LinkList'
import Section from '../../primitives/Section'
import {
  useResumeSection,
  useResumeSectionData,
  useViewOptions,
} from '../../../resume/context'
import type { InformationData } from '../../../resume/types'

interface ContactEmailItem {
  address: string
  link: boolean
}

type ContactItem = string | ContactEmailItem

const renderSocial = (social: string): React.ReactNode => {
  if (isUrl(social)) {
    return (
      <a href={normalizeUrl(social)} rel='noreferrer' target='_blank'>
        {social}
      </a>
    )
  }
  return social
}

export default function Information(): JSX.Element | false {
  const { isVisible } = useResumeSection('information')
  const information = useResumeSectionData<InformationData>('information', {
    meta: {
      display: true,
      email: {
        address: '',
        link: false,
      },
      location: '',
      phone: '',
      socials: [],
    },
    name: {
      first: '',
      middle: '',
      last: '',
    },
    title: '',
  })
  const { hideContact } = useViewOptions()
  const contactInfo = hideContact !== true
  const email = information.meta.email.address
  const link = information.meta.email.link
  const fullName = [
    information.name.first,
    information.name.middle,
    information.name.last,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    isVisible &&
    information.meta.display && (
      <Section id='vital_information'>
        <div className='row'>
          <div id='name' className='col text-left'>
            <h1 id='first_name'>{fullName}</h1>
            <h2 id='last_name'>{information.title}</h2>
          </div>

          {contactInfo && (
            <div id='contact_information' className='col text-right'>
              <div className='row'>
                <div className='col'>
                  <LinkList
                    className='contact-information-list'
                    items={
                      [
                        information.meta.location,
                        information.meta.phone,
                        email
                          ? {
                              address: email,
                              link,
                            }
                          : null,
                        ...information.meta.socials,
                      ].filter(Boolean) as ContactItem[]
                    }
                    renderItem={(item: ContactItem) => {
                      if (typeof item === 'string') {
                        return renderSocial(item)
                      }

                      return item.link ? (
                        <a href={`mailto:${item.address}`}>{item.address}</a>
                      ) : (
                        item.address
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
    )
  )
}
