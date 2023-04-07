import { ChangeEvent } from "react";

type InputProps = {
  value?: string;
  className?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
};

const Input = ({ className, ...otherProps }: InputProps) => {
  const paddingClass = (className && !/p-/.test(className)) || !className ? "p-2.5 " : "";

  return <input 
    type="text" 
    className={"border border-black rounded-none " + paddingClass + className} 
    {...otherProps} />
}

export default Input;