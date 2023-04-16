import { useState, ChangeEvent } from "react";
import { Field, Button, Input } from "./";
import { RoundingMethod } from "../react-app-env.d";

type FormProps = {
  onSubmit: (coeff: number, exp: number) => void;
};

const Form = ({ onSubmit }: FormProps) => {
  const [coefficient, setCoefficient] = useState<string>("");
  const [exponent, setExponent] = useState<string>("");
  const [roundingMethod, setRounding] = useState<string>("");

  const checkValidInputs = () => {
    const regexFloat = /^-?\d+(\.\d+)?$/; // allow digits, -, .
    const regexInt = /^-?\d+$/; // allow digits, -
    return regexFloat.test(coefficient) && regexInt.test(exponent);
  }

  const onChangeCoefficient = (e: ChangeEvent<HTMLInputElement>) => {
    const coeff = e.target.value;
    const digitCount = (coeff.match(/\d/g) || []).length;

    if (!coeff || digitCount <= 16 ) {
      setCoefficient(e.target.value);
    }
  }

  const onChangeExponent = (e: ChangeEvent<HTMLInputElement>) => {
    const exp = e.target.value;
    const digitCount = (exp.match(/\d/g) || []).length;

    if (!exp || digitCount <= 16) {
      setExponent(e.target.value);
    }
  }

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => setRounding(e.target.value);

  const handleSubmit = () => {
    if (checkValidInputs()) {
      onSubmit(Number(coefficient), Number(exponent));
    } else {
      onSubmit(NaN, NaN);
    }
  }

  return (
    <>
      <Field label="Decimal:" htmlFor="coefficient">
        <div className="text-4xl h-16 flex justify-center items-center gap-2.5">
          <Input id="coefficient" className="w-56 text-center" value={coefficient} onChange={onChangeCoefficient} />
          <span>&times;</span><span>10</span>
          <Input className="p-1.5 text-xl text-center w-16 h-min self-start" value={exponent} onChange={onChangeExponent} />
        </div>
      </Field>

      <Field label="Rounding method:" htmlFor="rounding">
        <div className="border border-black">
          <select id="rounding" onChange={onChangeSelect} value={roundingMethod} className="p-2.5 w-full" style={{ borderRight: "0.625rem solid transparent" }}>
            <option value={RoundingMethod.TRUNCATE}>truncate</option>
            <option value={RoundingMethod.ROUND_DOWN}>round down</option>
            <option value={RoundingMethod.ROUND_UP}>round up</option>
            <option value={RoundingMethod.RTN_TE}>round to nearest (ties to even)</option>
          </select>
        </div>
      </Field>

      <Button type="submit" className="bg-lime-400 active:bg-lime-500 w-full" disabled={!(coefficient && exponent)} onClick={handleSubmit}>
        convert
      </Button>
    </>
  );
}

export default Form;