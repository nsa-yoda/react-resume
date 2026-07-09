import React, { useState } from 'react'
import { parse, stringify } from 'yaml'
import ResumeRenderer from '../ResumeRenderer'
import { importJsonResume } from '../resume/importers/jsonResume'
import { validateResumeDocument } from '../resume/schema'
import { resumeDocument } from '../resume/document'
import { starterTemplates } from './starterTemplates'
import './editor.css'

const cloneValue = value => JSON.parse(JSON.stringify(value))

const parseDelimitedList = value =>
  value
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean)

const moveItem = (items, index, direction) => {
  const nextItems = [...items]
  const target = index + direction

  if (target < 0 || target >= items.length) {
    return items
  }

  ;[nextItems[index], nextItems[target]] = [nextItems[target], nextItems[index]]
  return nextItems
}

const downloadFile = (filename, content, contentType) => {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

const updateSection = (draft, sectionId, updater) => ({
  ...draft,
  sections: draft.sections.map(section =>
    section.id === sectionId ? updater(section) : section
  ),
})

const getSection = (draft, sectionId) =>
  draft.sections.find(section => section.id === sectionId)

const defaultSection = type => ({
  id: `${type}-${Date.now()}`,
  type,
  title: type[0].toUpperCase() + type.slice(1),
  display: true,
  audiences: ['default', 'public', 'recruiter'],
  data: {
    items: [],
  },
})

function SectionEditor({ draft, onChange, sectionId }) {
  const section = getSection(draft, sectionId)

  if (!section) {
    return null
  }

  const updateMeta = patch => {
    onChange(
      updateSection(draft, section.id, current => ({
        ...current,
        ...patch,
      }))
    )
  }

  const updateData = nextData => {
    onChange(
      updateSection(draft, section.id, current => ({
        ...current,
        data: nextData,
      }))
    )
  }

  return (
    <div className='editor-panel'>
      <h3>Section Editor</h3>
      <label>
        Title
        <input
          type='text'
          value={section.title}
          onChange={event => updateMeta({ title: event.target.value })}
        />
      </label>
      <label className='editor-inline-checkbox'>
        <input
          checked={section.display}
          type='checkbox'
          onChange={event => updateMeta({ display: event.target.checked })}
        />
        Display
      </label>
      <label>
        Audiences
        <input
          type='text'
          value={section.audiences.join(', ')}
          onChange={event =>
            updateMeta({
              audiences: event.target.value
                .split(',')
                .map(value => value.trim())
                .filter(Boolean),
            })
          }
        />
      </label>

      {section.type === 'summary' && (
        <label>
          Paragraphs
          <textarea
            rows={6}
            value={section.data.content.join('\n\n')}
            onChange={event =>
              updateData({
                ...section.data,
                content: event.target.value
                  .split(/\n{2,}/)
                  .map(value => value.trim())
                  .filter(Boolean),
              })
            }
          />
        </label>
      )}

      {(section.type === 'glance' || section.type === 'skills') && (
        <>
          {section.type === 'skills' && (
            <div className='editor-grid'>
              <label>
                Columns
                <input
                  type='number'
                  value={section.data.columns || 4}
                  onChange={event =>
                    updateData({
                      ...section.data,
                      columns: Number(event.target.value) || 4,
                    })
                  }
                />
              </label>
              <label>
                Bullet
                <input
                  type='text'
                  value={section.data.arrow || '\u276F'}
                  onChange={event =>
                    updateData({
                      ...section.data,
                      arrow: event.target.value,
                    })
                  }
                />
              </label>
            </div>
          )}
          <label>
            Items
            <textarea
              rows={8}
              value={(section.data.items || []).join('\n')}
              onChange={event =>
                updateData({
                  ...section.data,
                  items: parseDelimitedList(event.target.value),
                })
              }
            />
          </label>
        </>
      )}

      {section.type === 'information' && (
        <>
          <div className='editor-grid'>
            <label>
              First Name
              <input
                type='text'
                value={section.data.name.first}
                onChange={event =>
                  updateData({
                    ...section.data,
                    name: {
                      ...section.data.name,
                      first: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label>
              Middle Name
              <input
                type='text'
                value={section.data.name.middle}
                onChange={event =>
                  updateData({
                    ...section.data,
                    name: {
                      ...section.data.name,
                      middle: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label>
              Last Name
              <input
                type='text'
                value={section.data.name.last}
                onChange={event =>
                  updateData({
                    ...section.data,
                    name: {
                      ...section.data.name,
                      last: event.target.value,
                    },
                  })
                }
              />
            </label>
          </div>
          <div className='editor-grid'>
            <label>
              Title
              <input
                type='text'
                value={section.data.title}
                onChange={event =>
                  updateData({
                    ...section.data,
                    title: event.target.value,
                  })
                }
              />
            </label>
            <label>
              Location
              <input
                type='text'
                value={section.data.meta.location}
                onChange={event =>
                  updateData({
                    ...section.data,
                    meta: {
                      ...section.data.meta,
                      location: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label>
              Phone
              <input
                type='text'
                value={section.data.meta.phone}
                onChange={event =>
                  updateData({
                    ...section.data,
                    meta: {
                      ...section.data.meta,
                      phone: event.target.value,
                    },
                  })
                }
              />
            </label>
            <label>
              Email
              <input
                type='text'
                value={section.data.meta.email.address}
                onChange={event =>
                  updateData({
                    ...section.data,
                    meta: {
                      ...section.data.meta,
                      email: {
                        ...section.data.meta.email,
                        address: event.target.value,
                      },
                    },
                  })
                }
              />
            </label>
          </div>
          <label>
            Social Links
            <textarea
              rows={6}
              value={section.data.meta.socials.join('\n')}
              onChange={event =>
                updateData({
                  ...section.data,
                  meta: {
                    ...section.data.meta,
                    socials: parseDelimitedList(event.target.value),
                  },
                })
              }
            />
          </label>
        </>
      )}

      {['experience', 'education', 'achievements', 'publications'].includes(
        section.type
      ) && (
        <>
          <label>
            Section Data JSON
            <textarea
              rows={16}
              value={JSON.stringify(section.data, null, 2)}
              onChange={event => {
                try {
                  updateData(JSON.parse(event.target.value))
                } catch (error) {
                  // Keep the textarea editable even with invalid JSON.
                }
              }}
            />
          </label>
          <p className='editor-help'>
            This editor keeps list operations ergonomic, but complex records
            still use JSON for now.
          </p>
        </>
      )}
    </div>
  )
}

export default function ResumeEditor() {
  const [draft, setDraft] = useState(cloneValue(resumeDocument))
  const [activeSectionId, setActiveSectionId] = useState(
    resumeDocument.layout.sections[0]
  )
  const [previewAudience, setPreviewAudience] = useState('default')
  const [importFormat, setImportFormat] = useState('json')
  const [importValue, setImportValue] = useState('')
  const [errors, setErrors] = useState([])

  const validateDraft = nextDraft => {
    const nextErrors = validateResumeDocument(nextDraft)
    setErrors(nextErrors)
  }

  const applyDraft = nextDraft => {
    setDraft(nextDraft)
    validateDraft(nextDraft)
  }

  const moveSection = (sectionId, direction) => {
    const index = draft.layout.sections.indexOf(sectionId)
    applyDraft({
      ...draft,
      layout: {
        ...draft.layout,
        sections: moveItem(draft.layout.sections, index, direction),
      },
    })
  }

  const removeSection = sectionId => {
    applyDraft({
      ...draft,
      layout: {
        ...draft.layout,
        sections: draft.layout.sections.filter(id => id !== sectionId),
      },
      sections: draft.sections.filter(section => section.id !== sectionId),
    })
    if (activeSectionId === sectionId) {
      setActiveSectionId(draft.layout.sections[0] || '')
    }
  }

  const duplicateSection = sectionId => {
    const section = getSection(draft, sectionId)
    const duplicatedSection = {
      ...cloneValue(section),
      id: `${section.id}-copy`,
      title: `${section.title} Copy`,
    }
    applyDraft({
      ...draft,
      layout: {
        ...draft.layout,
        sections: [...draft.layout.sections, duplicatedSection.id],
      },
      sections: [...draft.sections, duplicatedSection],
    })
  }

  const addSection = type => {
    const nextSection = defaultSection(type)
    applyDraft({
      ...draft,
      layout: {
        ...draft.layout,
        sections: [...draft.layout.sections, nextSection.id],
      },
      sections: [...draft.sections, nextSection],
    })
    setActiveSectionId(nextSection.id)
  }

  const importDraft = () => {
    try {
      let nextDraft

      if (importFormat === 'yaml') {
        nextDraft = parse(importValue)
      } else if (importFormat === 'json-resume') {
        nextDraft = importJsonResume(JSON.parse(importValue))
      } else {
        nextDraft = JSON.parse(importValue)
      }

      applyDraft(nextDraft)
    } catch (error) {
      setErrors([{ path: 'import', message: error.message }])
    }
  }

  const exportJson = () =>
    downloadFile(
      'Resume.json',
      `${JSON.stringify(draft, null, 2)}\n`,
      'application/json'
    )

  const exportYaml = () =>
    downloadFile('Resume.yaml', stringify(draft), 'text/yaml')

  const activeSection = getSection(draft, activeSectionId)

  return (
    <div className='resume-editor'>
      <aside className='editor-sidebar'>
        <h1>Resume Editor</h1>
        <div className='editor-panel'>
          <label>
            Theme
            <select
              value={draft.theme.active}
              onChange={event =>
                applyDraft({
                  ...draft,
                  theme: {
                    ...draft.theme,
                    active: event.target.value,
                  },
                })
              }
            >
              <option value='classic'>classic</option>
              <option value='stacked'>stacked</option>
            </select>
          </label>
          <label>
            Preview Audience
            <select
              value={previewAudience}
              onChange={event => setPreviewAudience(event.target.value)}
            >
              <option value='default'>default</option>
              <option value='public'>public</option>
              <option value='recruiter'>recruiter</option>
            </select>
          </label>
          <label>
            Starter Template
            <select
              defaultValue='engineering'
              onChange={event =>
                applyDraft(cloneValue(starterTemplates[event.target.value]))
              }
            >
              <option value='engineering'>engineering</option>
              <option value='academic'>academic</option>
            </select>
          </label>
        </div>

        <div className='editor-panel'>
          <h3>Sections</h3>
          {draft.layout.sections.map(sectionId => {
            const section = getSection(draft, sectionId)

            return (
              <div className='section-row' key={sectionId}>
                <button
                  type='button'
                  onClick={() => setActiveSectionId(sectionId)}
                >
                  {section?.title || sectionId}
                </button>
                <div className='section-row-actions'>
                  <button
                    type='button'
                    onClick={() => moveSection(sectionId, -1)}
                  >
                    ↑
                  </button>
                  <button
                    type='button'
                    onClick={() => moveSection(sectionId, 1)}
                  >
                    ↓
                  </button>
                  <button
                    type='button'
                    onClick={() => duplicateSection(sectionId)}
                  >
                    Copy
                  </button>
                  <button
                    type='button'
                    onClick={() => removeSection(sectionId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
          <div className='editor-inline-actions'>
            <button type='button' onClick={() => addSection('summary')}>
              Add Summary
            </button>
            <button type='button' onClick={() => addSection('skills')}>
              Add Skills
            </button>
            <button type='button' onClick={() => addSection('publications')}>
              Add Publications
            </button>
          </div>
        </div>

        {activeSection && (
          <SectionEditor
            draft={draft}
            onChange={applyDraft}
            sectionId={activeSection.id}
          />
        )}

        <div className='editor-panel'>
          <h3>Import / Export</h3>
          <label>
            Import Format
            <select
              value={importFormat}
              onChange={event => setImportFormat(event.target.value)}
            >
              <option value='json'>Resume JSON</option>
              <option value='yaml'>Resume YAML</option>
              <option value='json-resume'>JSON Resume</option>
            </select>
          </label>
          <label>
            Source
            <textarea
              rows={10}
              value={importValue}
              onChange={event => setImportValue(event.target.value)}
            />
          </label>
          <div className='editor-inline-actions'>
            <button type='button' onClick={importDraft}>
              Import
            </button>
            <button type='button' onClick={exportJson}>
              Export JSON
            </button>
            <button type='button' onClick={exportYaml}>
              Export YAML
            </button>
            <button
              type='button'
              onClick={() => applyDraft(cloneValue(resumeDocument))}
            >
              Reset
            </button>
          </div>
        </div>

        <div className='editor-panel'>
          <h3>Validation</h3>
          {errors.length === 0 ? (
            <p>No validation errors.</p>
          ) : (
            <ul className='editor-errors'>
              {errors.map((error, index) => (
                <li key={`${error.path}-${index}`}>
                  <strong>{error.path}</strong>: {error.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <section className='editor-preview'>
        <ResumeRenderer audience={previewAudience} document={draft} />
      </section>
    </div>
  )
}
