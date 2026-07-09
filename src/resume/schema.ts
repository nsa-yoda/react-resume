import type { ResumeDocument, ValidationError } from './types'

const isObject = value =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isString = value => typeof value === 'string'

const isBoolean = value => typeof value === 'boolean'

const validRemoteModes = ['remote', 'hybrid', 'on-site', 'in-person']
const validWorkTypes = [
  'full-time',
  'part-time',
  'contract',
  'internship',
  'weekend',
]
const validSectionTypes = [
  'information',
  'summary',
  'glance',
  'skills',
  'experience',
  'education',
  'achievements',
  'publications',
]

const validateDate = value =>
  typeof value === 'string' &&
  (value.toLowerCase() === 'present' || /^\d{4}-\d{2}-\d{2}$/.test(value))

const pushError = (
  errors: ValidationError[],
  path: string,
  message: string
) => {
  errors.push({ path, message })
}

const validateSummarySection = (section, errors) => {
  if (
    !Array.isArray(section.data?.content) ||
    section.data.content.length === 0
  ) {
    pushError(
      errors,
      `${section.id}.data.content`,
      'must be a non-empty string array'
    )
  }
}

const validateListSection = (section, errors, key = 'items') => {
  if (!Array.isArray(section.data?.[key])) {
    pushError(errors, `${section.id}.data.${key}`, 'must be an array')
  }
}

const validateInformationSection = (section, errors) => {
  const info = section.data

  if (!isObject(info?.name)) {
    pushError(errors, `${section.id}.data.name`, 'must be an object')
  }

  if (!isString(info?.title)) {
    pushError(errors, `${section.id}.data.title`, 'must be a string')
  }

  if (!isObject(info?.meta)) {
    pushError(errors, `${section.id}.data.meta`, 'must be an object')
    return
  }

  if (!isObject(info.meta.email)) {
    pushError(errors, `${section.id}.data.meta.email`, 'must be an object')
  }
}

const validateExperienceSection = (section, errors) => {
  validateListSection(section, errors)

  if (!Array.isArray(section.data?.workType)) {
    pushError(errors, `${section.id}.data.workType`, 'must be an array')
  }

  if (!isBoolean(section.data?.displayLongResponsibility)) {
    pushError(
      errors,
      `${section.id}.data.displayLongResponsibility`,
      'must be a boolean'
    )
  }

  if (!isBoolean(section.data?.displayShortResponsibility)) {
    pushError(
      errors,
      `${section.id}.data.displayShortResponsibility`,
      'must be a boolean'
    )
  }

  ;(section.data?.items || []).forEach((item, index) => {
    if (!validateDate(item?.dates?.start)) {
      pushError(
        errors,
        `${section.id}.data.items[${index}].dates.start`,
        'must be YYYY-MM-DD'
      )
    }

    if (!validateDate(item?.dates?.end)) {
      pushError(
        errors,
        `${section.id}.data.items[${index}].dates.end`,
        'must be YYYY-MM-DD or Present'
      )
    }

    if (!validRemoteModes.includes(item?.meta?.remote)) {
      pushError(
        errors,
        `${section.id}.data.items[${index}].meta.remote`,
        `must be one of ${validRemoteModes.join(', ')}`
      )
    }

    if (!validWorkTypes.includes(item?.meta?.type)) {
      pushError(
        errors,
        `${section.id}.data.items[${index}].meta.type`,
        `must be one of ${validWorkTypes.join(', ')}`
      )
    }
  })
}

const validateEducationSection = (section, errors) => {
  validateListSection(section, errors)

  ;(section.data?.items || []).forEach((item, index) => {
    if (!validateDate(item?.dates?.start)) {
      pushError(
        errors,
        `${section.id}.data.items[${index}].dates.start`,
        'must be YYYY-MM-DD'
      )
    }

    if (!validateDate(item?.dates?.end)) {
      pushError(
        errors,
        `${section.id}.data.items[${index}].dates.end`,
        'must be YYYY-MM-DD'
      )
    }
  })
}

const validatePublicationsSection = (section, errors) => {
  validateListSection(section, errors)

  ;(section.data?.items || []).forEach((item, index) => {
    if (!isString(item?.url)) {
      pushError(
        errors,
        `${section.id}.data.items[${index}].url`,
        'must be a string'
      )
    }
  })
}

const validators = {
  achievements: validateListSection,
  education: validateEducationSection,
  experience: validateExperienceSection,
  glance: validateListSection,
  information: validateInformationSection,
  publications: validatePublicationsSection,
  skills: validateListSection,
  summary: validateSummarySection,
}

export const validateResumeDocument = (
  document: Partial<ResumeDocument> | unknown
): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!isObject(document)) {
    pushError(errors, 'document', 'must be an object')
    return errors
  }

  const candidate = document as Partial<ResumeDocument>

  if (!Array.isArray(candidate.sections)) {
    pushError(errors, 'sections', 'must be an array')
    return errors
  }

  candidate.sections.forEach((section, index) => {
    if (!validSectionTypes.includes(section?.type)) {
      pushError(
        errors,
        `sections[${index}].type`,
        `must be one of ${validSectionTypes.join(', ')}`
      )
      return
    }

    if (!isString(section?.id)) {
      pushError(errors, `sections[${index}].id`, 'must be a string')
    }

    if (!isString(section?.title)) {
      pushError(errors, `sections[${index}].title`, 'must be a string')
    }

    if (!isBoolean(section?.display)) {
      pushError(errors, `sections[${index}].display`, 'must be a boolean')
    }

    validators[section.type]?.(section, errors)
  })

  return errors
}
