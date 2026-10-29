import { useState } from 'react'
import StatsDisplay from '../StatsDisplay/StatsDisplay'
import TextInput from '../TextInput/TextInput'
import type { CharacterCounterProps } from '../../types'

function CharacterCounter({
  minWords,
  maxWords,
  targetReadingTime,
}: CharacterCounterProps) {
  const [text, setText] = useState('')
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const stats = {
    characterCount: text.length,
    wordCount,
    readingTime: wordCount === 0 ? 0 : Math.ceil(wordCount / 200),
  }

  let wordCountMessage: string | undefined
  if (minWords !== undefined && wordCount < minWords) {
    wordCountMessage = `Add ${minWords - wordCount} more ${minWords - wordCount === 1 ? 'word' : 'words'}.`
  } else if (maxWords !== undefined && wordCount > maxWords) {
    wordCountMessage = `Remove ${wordCount - maxWords} ${wordCount - maxWords === 1 ? 'word' : 'words'}.`
  } else if (minWords !== undefined || maxWords !== undefined) {
    wordCountMessage = 'Word count is within the specified range.'
  }

  return (
    <section aria-labelledby="character-counter-title">
      <h2 id="character-counter-title">Character Counter</h2>
      <TextInput
        onTextChange={setText}
        placeholder="Enter your text"
      />
      <StatsDisplay stats={stats} showReadingTime />
      {wordCountMessage && <p aria-live="polite">{wordCountMessage}</p>}
      {targetReadingTime !== undefined && (
        <p>
          Target reading time: {targetReadingTime}{' '}
          {targetReadingTime === 1 ? 'minute' : 'minutes'}
        </p>
      )}
    </section>
  )
}

export default CharacterCounter