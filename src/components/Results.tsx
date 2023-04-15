import { Button, Field, Input } from "./";
import { DecimalRepr } from "../react-app-env.d";
import useNormalizeAPI from "../hooks/useNormalizeAPI";

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

        <ConvertResults significand={significand} exponent={exponent} />
      </>
      }

      { error && <small className="text-sm text-red-500">{ error }</small> }

      <div className="grid gap-2 mt-4">
        <Button className="bg-gray-300 active:bg-gray-400">export as .txt</Button> {/* TODO: Export .txt file onclick */}
        <Button className="bg-lime-400 active:bg-lime-500" onClick={onExit}>try again</Button>
      </div>
    </>
  )
}

type CRProps = {
  significand: string|number,
  exponent: string|number
};

const ConvertResults = ({ significand, exponent }: CRProps) => {
  const [binary, setBinary] = useState("");
  const [hex, setHex] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const URL = "https://simulation-project-backend.vercel.app/api/convert";
    const body = { significand, exponent };

    axios.get(URL, { params: body })
      .then((res) => {
        console.log(res.data);
        setBinary(res.data.binary);
        setHex(res.data.hex);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [significand, exponent]);
  
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