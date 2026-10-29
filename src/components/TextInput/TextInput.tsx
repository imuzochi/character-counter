import type { TextInputProps } from '../../types'

function TextInput({
  onTextChange,
  placeholder,
  initialValue = '',
}: TextInputProps) {
  return (
    <input
      type="text"
      aria-label={placeholder || 'Text input'}
      placeholder={placeholder}
      defaultValue={initialValue}
      onChange={(event) => onTextChange(event.target.value)}
    />
  )
}

export default TextInput