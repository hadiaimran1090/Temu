export function Button({ label, onClick, variant = 'primary', type = 'button' }) {
  return (
    <button className={`action-button action-button-${variant}`} type={type} onClick={onClick}>
      {label}
    </button>
  )
}