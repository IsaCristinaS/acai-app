import './styles.css'
import { ButtonProps } from './types'

export function Button({ title, ...rest }: ButtonProps ) {
  return(
    <button {...rest}>
      {title} 
    </button>
  )
}