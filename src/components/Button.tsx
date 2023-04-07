import { PropsWithChildren } from 'react'; 

type ButtonProps = PropsWithChildren<{ 
  className?: string; 
  disabled?: boolean; 
  onClick?: () => void; [key: string]: any; 
}>; 

const Button = ({ children, className, ...props } : ButtonProps) => ( 
  <button 
    className={"border border-black rounded-none py-2.5 px-5 disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 " + className} 
    {...props}
  >{ children }</button> 
) 

export default Button;