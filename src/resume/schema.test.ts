import { expect, it } from 'vitest'
import { validateResumeDocument } from './schema'
import canonicalResume from '../../data/Resume.json'

it('accepts the canonical resume document shape', () => {
  expect(validateResumeDocument(canonicalResume)).toEqual([])
})

it('reports invalid experience enums and dates', () => {
  const invalidDocument = {
    sections: [
      {
        id: 'experience',
        type: 'experience',
        title: 'Experience',
        display: true,
        audiences: [],
        data: {
          displayLongResponsibility: true,
          displayShortResponsibility: true,
          workType: [],
          items: [
            {
              company: {},
              dates: {
                start: 'today',
                end: 'later',
              },
              meta: {
                remote: 'somewhere',
                type: 'gig',
              },
            },
          ],
        },
      },
    ],
  }

  const errors = validateResumeDocument(invalidDocument)

  expect(errors.some(error => error.path.includes('dates.start'))).toBe(true)
  expect(errors.some(error => error.path.includes('meta.remote'))).toBe(true)
  expect(errors.some(error => error.path.includes('meta.type'))).toBe(true)
})
