export type TextInputProps = {
  onTextChange: (text: string) => void
  placeholder?: string
} & (
  | { value: string; initialValue?: never }
  | { value?: undefined; initialValue?: string }
)

export interface TextStats {
  characterCount: number
  wordCount: number
  readingTime: number
}

export interface StatsDisplayProps {
  stats: TextStats
  showReadingTime?: boolean
}

export interface CharacterCounterProps {
  minWords?: number
  maxWords?: number
  targetReadingTime?: number
}