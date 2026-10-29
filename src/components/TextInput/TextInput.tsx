import type { TextInputProps } from '../../types'

function TextInput({
  onTextChange,
  placeholder,
  initialValue = '',
  value,
}: TextInputProps) {
  return (
    <textarea
      rows={6}
      aria-label={placeholder || 'Text input'}
      placeholder={placeholder}
      {...(value === undefined ? { defaultValue: initialValue } : { value })}
      onChange={(event) => onTextChange(event.target.value)}
    />
  )
}

export default TextInput