import useInput from "../hooks/useInput";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { isEmailValid, isPasswordValid, isNameValid } from "../utils/validation";
import { signup } from "../utils/http";

import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";
import { UserContext } from "../store/UserContext";

export default function Signup() {

    const { str: email, handleOnChange: handleEmailChange, handleOnBlur: handleEmailBlur, isDisabled: isEmailDisabled, isError: isEmailError } = useInput(isEmailValid);
    const { str: password, isBlurred: isPasswordBlurred, handleOnChange: handlePasswordChange, handleOnBlur: handlePasswordBlur, isDisabled: isPasswordDisabled, isError: isPasswordError } = useInput(isPasswordValid);
    const { str: confirm, isBlurred: isConfirmBlurred, handleOnChange: handleConfirmChange, handleOnBlur: handleConfirmBlur, isDisabled: isConfirmDisabled, isError: isConfirmError } = useInput(isPasswordValid);
    const { str: firstName, handleOnChange: handleFirstNameChange, handleOnBlur: handleFirstNameBlur, isDisabled: isFirstNameDisabled, isError: isFirstNameError } = useInput(isNameValid);
    const { str: lastName, handleOnChange: handleLastNameChange, handleOnBlur: handleLastNameBlur, isDisabled: isLastNameDisabled, isError: isLastNameError } = useInput(isNameValid);

    const { handleSetUser } = useContext(UserContext);

    const navigate = useNavigate();

    const { mutate: signUpUser, isPending, isError } = useMutation({
        mutationFn: signup,
        onSuccess: (user) => {
            if (user.uid && user.email && user.displayName) {
                handleSetUser(user.uid, user.email, user.displayName);
            }
            navigate("/content/flashcards");
        }
    })


    let errors: string[] = [];
    if (isEmailError) errors.push("Please enter a valid email.");
    if (isPasswordError || isConfirmError) errors.push("Your password must be at least 6 characters long and contain at least 1 digit.");
    if (password !== confirm && isPasswordBlurred && isConfirmBlurred) errors.push("The passwords do not match.");
    if (isFirstNameError || isLastNameError) errors.push("Names must be at least two characters long.")

    function handleSubmitSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // const fd = new FormData(e.target as HTMLFormElement);
        if (password === confirm) {
            signUpUser({ firstName, lastName, email, password });
        }
    }

    return <section className="p-16">
        <Card styling="p-5 sm:w-3/3 md:w-2/3 lg:w-1/3 xl:w-1/3">
            <h2 className="text-center text-xl text-[rgba(100,190,171)] font-semibold mb-8">Sign up</h2>
            <form onSubmit={handleSubmitSignup} className="flex flex-col gap-4 items-center">
                <Input styling="w-2/3" type="text" value={firstName} onChange={handleFirstNameChange} onBlur={handleFirstNameBlur} isError={isFirstNameError} placeholder="First Name" />
                <Input styling="w-2/3" type="text" value={lastName} onChange={handleLastNameChange} onBlur={handleLastNameBlur} isError={isLastNameError} placeholder="Last name" />
                <Input styling="w-2/3" type="email" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} isError={isEmailError} placeholder="Enter your email" />
                <Input styling="w-2/3" type="password" value={password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} isError={isPasswordError} placeholder="Password" />
                <Input styling="w-2/3" type="password" value={confirm} onChange={handleConfirmChange} onBlur={handleConfirmBlur} isError={isConfirmError} placeholder="Confirm your password" />
                <Button styling="text-[#fff] bg-[rgba(100,190,171)] hover:bg-[rgb(79,151,136)] disabled:bg-[rgb(191,233,223)] disabled:hover:bg-[rgb(191,233,223)] disabled:cursor-not-allowed w-2/3" disabled={isEmailDisabled || isPasswordDisabled || isConfirmDisabled || isFirstNameDisabled || isLastNameDisabled || confirm !== password || isPending}>{!isPending ? "Log in" : "Loading..."}</Button>
            </form>
            {errors.length > 0 && <Error errors={errors} />}
            {isError && <Error errors={["Check your credentials and try again."]} />}
            <hr className="border-[.1px] border-slate-100 my-4" />
            <div className="flex justify-center">
                <Button onClick={() => navigate("/login")} styling="text-[rgba(100,190,171)] hover:text-[rgb(79,151,136)] font-semibold">Log in</Button>
            </div>
        </Card>
    </section>
}