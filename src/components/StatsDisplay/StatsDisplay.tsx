import type { StatsDisplayProps } from '../../types'

function StatsDisplay({ stats, showReadingTime = false }: StatsDisplayProps) {
  return (
    <section className="text-stats" aria-label="Text statistics">
      <dl>
        <div className="text-stats__item">
          <dt>Characters</dt>
          <dd>{stats.characterCount}</dd>
        </div>
        <div className="text-stats__item">
          <dt>Words</dt>
          <dd>{stats.wordCount}</dd>
        </div>
        {showReadingTime && (
          <div className="text-stats__item">
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