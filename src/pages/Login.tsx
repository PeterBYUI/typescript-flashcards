import useInput from "../hooks/useInput";
import { isEmailValid, isPasswordValid } from "../utils/validation";
import { useMutation } from "@tanstack/react-query";
import { login } from "../utils/http";
import { useNavigate } from "react-router";

import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";

export default function Login() {

    const navigate = useNavigate();

    const { str: email, handleOnChange: handleEmailChange, handleOnBlur: handleEmailBlur, isDisabled: isEmailDisabled, isError: isEmailError } = useInput(isEmailValid);
    const { str: password, handleOnChange: handlePasswordChange, handleOnBlur: handlePasswordBlur, isDisabled: isPasswordDisabled, isError: isPasswordError } = useInput(isPasswordValid);

    let errors: string[] = [];
    if (isEmailError) errors.push("Please enter a valid email.");
    if (isPasswordError) errors.push("Your password must be 6 characters long and contain 1 digit.");

    const { mutate, isPending, isError } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate("/content/flashcards");
        }
    });

    function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        mutate({ email, password });
    }

    return <section className="p-16">
        <Card styling="p-5 sm:w-3/3 md:w-2/3 lg:w-1/3 xl:w-1/3">
            <h2 className="text-center text-xl text-[rgba(100,190,171)] font-semibold mb-8">Log in</h2>
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 items-center">
                <Input styling="w-2/3" type="email" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} isError={isEmailError} placeholder="Enter your email" />
                <Input styling="w-2/3" type="password" value={password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} isError={isPasswordError} placeholder="Enter your password" />
                <Button styling="bg-[rgba(100,190,171)] hover:bg-[rgb(79,151,136)] disabled:bg-[rgb(115,174,161)] disabled:hover:bg-[rgb(115,174,161)] disabled:cursor-not-allowed w-2/3" disabled={isEmailDisabled || isPasswordDisabled || isPending}>{!isPending ? "Log in" : "Loading..."}</Button>
            </form>
            {errors.length > 0 && <Error errors={errors} />}
            {isError && <Error errors={["Please check your crendentials and try again."]} />}
        </Card>
    </section>
}