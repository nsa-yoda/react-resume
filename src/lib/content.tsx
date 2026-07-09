import React from 'react'

const stripPunctuation = (word: string): string =>
  word.replace(/[.,!?;:()]/g, '')

const splitWithWhitespace = (input: string): string[] => input.split(/(\s+)/)

export const highlightText = (
  input: string,
  highlightWords: string[] = []
): React.ReactNode => {
  if (typeof input !== 'string' || input.length === 0) {
    return input || ''
  }

  const highlightLookup = new Set(
    highlightWords.map(word => String(word).toLowerCase())
  )

  return splitWithWhitespace(input).map((part, index) => {
    if (part.trim().length === 0) {
      return part
    }

    const cleanedWord = stripPunctuation(part).toLowerCase()
    if (!highlightLookup.has(cleanedWord)) {
      return part
    }

    return <mark key={`${cleanedWord}-${index}`}>{part}</mark>
  })
}
