import { Button, Field, Input } from "./";
import { DecimalRepr } from "../react-app-env.d";
import useNormalizeAPI from "../hooks/useNormalizeAPI";
import exportTxt from "../utils/exportText";

import { useState, useEffect } from "react";
import axios from "axios";

type Props = {
  input: DecimalRepr;
  onExit: () => void;
}

const Results = ({ input, onExit } : Props) => {
  const { significand, exponent, error, loading } = useNormalizeAPI({
    significand: input.coefficient,
    exponent: input.exponent,
  });

  const [binaryRepr, setBinaryRepr] = useState("");
  const [hexRepr, setHexRepr] = useState("");

  const onExport = () => {
    let inputString = input.coefficient + "e" + input.exponent;

    let text = `Input: ${inputString}

ANSWERS
Normalized: ${significand}e${exponent}
Binary Representation: ${binaryRepr}
Hexadecimal: ${hexRepr}`;

    let filename = `convert-output-${inputString}.txt`;

    exportTxt(text, filename);
  }

  const updateResults = (binaryResult: string, hexResult: string) => {
    setBinaryRepr(binaryResult);
    setHexRepr(hexResult);
  }

  return (
    <>
      <span className="text-4xl text-center mb-4">
        {input.coefficient} &times; 10<sup>{input.exponent}</sup>
      </span>

      { loading ? "Loading..." : 
      <>
        <Field label="Normalized">
          <span className="border border-black rounded-none p-2.5">
            {significand} x 10<sup>{exponent}</sup>
          </span>
        </Field>

        <ConvertResults significand={significand} exponent={exponent} onUpdate={updateResults} />
      </>
      }

      { error && <small className="text-sm text-red-500">{ error }</small> }

      <div className="grid gap-2 mt-4">
        <Button className="bg-gray-300 active:bg-gray-400" onClick={onExport}>export as .txt</Button>
        <Button className="bg-lime-400 active:bg-lime-500" onClick={onExit}>try again</Button>
      </div>
    </>
  )
}

type CRProps = {
  significand: string|number,
  exponent: string|number,
  onUpdate: (binaryResult: string, hexResult: string) => void
};

const ConvertResults = ({ significand, exponent, onUpdate }: CRProps) => {
  const [binary, setBinary] = useState("");
  const [hex, setHex] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const URL = "https://simulation-project-backend.vercel.app/api/convert";
    const body = { significand, exponent };

    axios.get(URL, { params: body })
      .then((res) => {
        setBinary(res.data.binary);
        setHex(res.data.hex);

        onUpdate(res.data.binary, res.data.hex);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [significand, exponent, onUpdate]);
  
  return (
    <>
      <Field label="Binary representation">
        <Input value={loading ? "Loading..." : binary} />
      </Field>

      <Field label="Hexadecimal equivalent">
        <Input value={loading ? "Loading..." : hex} />
      </Field>

      { error && <small className="text-sm text-red-500">{ error }</small> }
    </>
  )
}

export default Results;