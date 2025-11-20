import { useState } from "react";

export default function useInput(validationFn: (str: string) => boolean) {

    const [str, setStr] = useState<string>("");
    const [onBlur, setOnBlur] = useState<boolean>(false);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStr(e.target.value);
    }

    function handleOnBlur() {
        setOnBlur(true);
    }

    const isDisabled = !validationFn(str);
    const isError = onBlur && !validationFn(str);

    return {
        str,
        handleOnChange,
        handleOnBlur,
        isDisabled,
        isError
    }
}