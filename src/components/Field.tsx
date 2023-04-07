import { ReactNode } from "react";

type FieldProps = {
  children: ReactNode;
  label: string;
  htmlFor?: string;
  [key: string]: any;
}

const Field = ({ children, label, htmlFor, ...props } : FieldProps) => (
  <div className="grid gap-2" {...props}>
    <label htmlFor={htmlFor}>{ label }</label>
    { children }
  </div>
)

export default Field;