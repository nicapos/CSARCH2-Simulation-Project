import { Button, Field, Input } from "./";
import { DecimalRepr } from "../react-app-env.d";

type Props = {
  input: DecimalRepr;
  onExit: () => void;
}

const Results = ({ input, onExit } : Props) => {
  const binaryRepresentation = "1 01001 101110 0100110100 1011100111"; // TODO: Replace with computed value
  const hexEquivalent = "A6E4D2E7"; // TODO: Replace with computed value

  const normalized = {
    coefficient: -1234567,
    exponent: 9
  }; // TODO: Replace with computed values

  return (
    <>
      <span className="text-4xl text-center mb-4">
        {input.coefficient} &times; 10<sup>{input.exponent}</sup>
      </span>

      <Field label="Normalized">
        <span className="border border-black rounded-none p-2.5">
          {normalized.coefficient} x 10<sup>{normalized.exponent}</sup>
        </span>
      </Field>

      <Field label="Binary representation">
        <Input value={binaryRepresentation} />
      </Field>

      <Field label="Hexadecimal equivalent">
        <Input value={hexEquivalent} />
      </Field>

      <div className="grid gap-2 mt-4">
        <Button className="bg-gray-300 active:bg-gray-400">export as .txt</Button>
        <Button className="bg-lime-400 active:bg-lime-500" onClick={onExit}>try again</Button>
      </div>
    </>
  )
}

export default Results;