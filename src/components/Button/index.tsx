import './styles.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function Button({ title, ...rest }: ButtonProps ) {
  return(
    <button {...rest}>
      {title} 
    </button>
  )
}