import useInput from "../hooks/useInput";
import { isEmailValid } from "../utils/validation";

import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {

    const { str: email, handleOnChange: handleEmailChange, handleOnBlur: handleEmailBlur, isDisabled: isEmailDisabled, isError: isEmailError } = useInput(isEmailValid);
    const { str: password, handleOnChange: handlePasswordChange, handleOnBlur: handlePasswordBlur, isDisabled: isPasswordDisabled, isError: isPasswordError } = useInput(isEmailValid);

    return <section className="p-16">
        <Card styling="p-5 sm:w-3/3 md:w-2/3 lg:w-1/3 xl:w-1/3">
            <h2 className="text-center text-xl text-[rgba(100,190,171)] font-semibold mb-8">Log in</h2>
            <form action="" className="flex flex-col gap-4 items-center">
                <Input styling="w-2/3" type="email" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} placeholder="Enter your email" />
                <Input styling="w-2/3" type="password" value={password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} placeholder="Enter your password" />
                <Button styling="bg-[rgba(100,190,171)] hover:bg-[rgb(79,151,136)] w-2/3">Log in</Button>

            </form>
        </Card>
    </section>
}