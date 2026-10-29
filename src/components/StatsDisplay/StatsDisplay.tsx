import type { StatsDisplayProps } from '../../types'

function StatsDisplay({ stats, showReadingTime = false }: StatsDisplayProps) {
  return (
    <section aria-label="Text statistics">
      <dl>
        <div>
          <dt>Characters</dt>
          <dd>{stats.characterCount}</dd>
        </div>
        <div>
          <dt>Words</dt>
          <dd>{stats.wordCount}</dd>
        </div>
        {showReadingTime && (
          <div>
            <dt>Reading time</dt>
            <dd>
              {stats.readingTime} {stats.readingTime === 1 ? 'minute' : 'minutes'}
            </dd>
          </div>
        )}
      </dl>
    </section>
  )
}

export default StatsDisplay