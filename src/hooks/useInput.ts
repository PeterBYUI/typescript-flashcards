import { useState } from "react";

export default function useInput(validationFn: (str: string) => boolean) {

    const [str, setStr] = useState<string>("");
    const [isBlurred, setIsBlurred] = useState<boolean>(false);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStr(e.target.value);
    }

    function handleOnBlur() {
        setIsBlurred(true);
    }

    const isDisabled = !validationFn(str);
    const isError = isBlurred && !validationFn(str);

    return {
        str,
        isBlurred,
        handleOnChange,
        handleOnBlur,
        isDisabled,
        isError
    }
}