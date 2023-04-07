import { useState } from 'react';
import { Form, Results } from './components';
import { DecimalRepr } from './react-app-env.d';

function App() {
  const [decimalInput, setInput] = useState<DecimalRepr>({ coefficient: 0, exponent: 0 });
  const [showResults, setShowResults] = useState<boolean>(false);

  const updateForm = (coefficient: number, exponent: number) => {
    setInput({ coefficient, exponent })
    setShowResults(true);
  }

  const resetForm = () => {
    setInput({ coefficient: 0, exponent: 0 });
    setShowResults(false);
  }

  return (
    <div className="font-mono flex flex-col h-screen">
      <header className="w-full text-center p-8 fixed top-0">
        IEEE-754 Decimal-32 floating-point converter
      </header>

      <div className="flex-1 flex flex-col justify-center gap-4 w-96 mx-auto">
        { showResults ? <Results input={decimalInput} onExit={resetForm} /> : <Form onSubmit={updateForm} /> }
      </div>
    </div>
  );
}

export default App;
