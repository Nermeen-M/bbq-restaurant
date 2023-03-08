import { useState } from "react";

export default function useInput(validateValue) {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const hasError = !valueIsValid && isTouched;

  function valueChangeHandler(event) {
    setValue(event.target.value);
  }

  function inputBlurHandler() {
    setIsTouched(true);
  }

  function reset() {
    setValue("");
    setIsTouched(false);
  }

  function fill(initialValue) {
    setValue(initialValue);
  }

  return {
    value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    fill,
  };
}
