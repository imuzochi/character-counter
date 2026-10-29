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
  } else if (minWords === undefined && maxWords !== undefined) {
    wordCountMessage = 'Within the word limit.'
  } else if (minWords !== undefined || maxWords !== undefined) {
    wordCountMessage = 'Word count is within the specified range.'
  }

  const wordGoal = maxWords ?? minWords
  const progressValue =
    wordGoal === undefined ? undefined : Math.min(stats.wordCount, wordGoal)
  const isOverWordGoal = maxWords !== undefined && stats.wordCount > maxWords

  return (
    <section className="character-counter" aria-labelledby="character-counter-title">
      <h1 id="character-counter-title">Character Counter</h1>
      <p className="character-counter__description">
        Track your text length, word count, and estimated reading time.
      </p>
      <TextInput
        onTextChange={handleTextChange}
        placeholder="Enter your text"
        value={text}
      />
      <StatsDisplay stats={stats} showReadingTime />
      {wordGoal !== undefined && progressValue !== undefined && wordGoal > 0 && (
        <div
          className={`word-goal${isOverWordGoal ? ' word-goal--over' : ''}`}
        >
          <div className="word-goal__label">
            <span>Word goal</span>
            <span>
              {stats.wordCount} / {wordGoal} words
            </span>
          </div>
          <progress
            aria-label={`Word goal progress: ${stats.wordCount} of ${wordGoal} words`}
            value={progressValue}
            max={wordGoal}
          />
        </div>
      )}
      {wordCountMessage && (
        <p
          className={`word-count-message${isOverWordGoal ? ' word-count-message--over' : ''}`}
          aria-live="polite"
        >
          {wordCountMessage}
        </p>
      )}
      {targetReadingTime !== undefined && (
        <p className="reading-time-target">
          Target reading time: {targetReadingTime}{' '}
          {targetReadingTime === 1 ? 'minute' : 'minutes'}
        </p>
      )}
    </section>
  )
}

export default CharacterCounter