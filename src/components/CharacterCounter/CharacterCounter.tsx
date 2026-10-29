import { useState } from 'react'
import StatsDisplay from '../StatsDisplay/StatsDisplay'
import TextInput from '../TextInput/TextInput'
import type { CharacterCounterProps, TextStats } from '../../types'

function countWords(text: string) {
  let wordCount = 0
  const wordPattern = /\S+/g

  while (wordPattern.exec(text) !== null) {
    wordCount += 1
  }

  return wordCount
}

function CharacterCounter({
  minWords,
  maxWords,
  targetReadingTime,
}: CharacterCounterProps) {
  const [text, setText] = useState('')
  const [stats, setStats] = useState<TextStats>({
    characterCount: 0,
    wordCount: 0,
    readingTime: 0,
  })

  function handleTextChange(nextText: string) {
    const wordCount = countWords(nextText)
    setText(nextText)
    setStats({
      characterCount: nextText.length,
      wordCount,
      readingTime: wordCount === 0 ? 0 : Math.ceil(wordCount / 200),
    })
  }

  let wordCountMessage: string | undefined
  if (minWords !== undefined && stats.wordCount < minWords) {
    const wordsNeeded = minWords - stats.wordCount
    wordCountMessage = `Add ${wordsNeeded} more ${wordsNeeded === 1 ? 'word' : 'words'}.`
  } else if (maxWords !== undefined && stats.wordCount > maxWords) {
    const wordsOverLimit = stats.wordCount - maxWords
    wordCountMessage = `Remove ${wordsOverLimit} ${wordsOverLimit === 1 ? 'word' : 'words'}.`
  } else if (minWords !== undefined || maxWords !== undefined) {
    wordCountMessage = 'Word count is within the specified range.'
  }

  return (
    <section className="character-counter" aria-labelledby="character-counter-title">
      <h1 id="character-counter-title">Character Counter</h1>
      <TextInput
        onTextChange={handleTextChange}
        placeholder="Enter your text"
        value={text}
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