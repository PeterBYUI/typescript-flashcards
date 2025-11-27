import { useContext, useState, useRef } from "react";
import { UserContext } from "../store/UserContext";
import { useMutation } from "@tanstack/react-query";
import { deleteUserAccount } from "../utils/http";
import { useNavigate } from "react-router";
import useInput from "../hooks/useInput";
import { isPasswordValid } from "../utils/validation";
import type { ModalHandle } from "../components/Modal";

import ProfileSvg from "../components/svgs/Profile";
import WarningSvg from "../components/svgs/Warning";
import Button from "../components/Button";
import Input from "../components/Input";
import Error from "../components/Error";
import Modal from "../components/Modal";

export default function Profile() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const ref = useRef<ModalHandle>(null);

    const { str: password, handleOnChange, isDisabled } = useInput(isPasswordValid);


    const { mutate, isPending, isError } = useMutation({
        mutationFn: deleteUserAccount,
        onSuccess: () => {
            navigate("/login")
        }
    });

    const [errors, setErrors] = useState<string[]>([]);
    if (isError) {
        setErrors((previousArray) => [...previousArray, "Something went wrong. Make sure you entered the right password and try again."]);
    }

    return <>
        <section className="flex flex-col gap-8 items-center">
            <header className="mt-16 flex flex-col items-center">
                <ProfileSvg isOnProfilePage={true} />
                <p className="text-xl font-semibold text-teal-700">{user?.displayName}</p>
            </header>
            <Button styling="bg-red-500 hover:bg-red-600 text-[#eee] w-2/5 lg:w-1/5 text-lg font-semibold"
                onClick={() => ref.current?.open()}
            >Delete account</Button>
        </section>
        <Modal ref={ref}>
            <div className="flex flex-col items-center gap-8 md:gap-4">
                <WarningSvg />
                <p className="text-lg">Enter your password to delete your account</p>
                <Input value={password} onChange={handleOnChange} styling="w-1/1 md:w-1/2 placeholder:text-red-400 text-red-500 text-lg" type="password" isError={true} placeholder="Enter your email" />
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-lg text-[#fff]">
                    <Button styling="bg-teal-600 hover:bg-teal-700" onClick={() => ref.current?.close()}>Cancel</Button>
                    <Button styling="bg-red-500 hover:bg-red-600 disabled:bg-red-300"
                        disabled={isPending || isDisabled}
                        onClick={() => {
                            const confirm = window.confirm("Are you sure? This action cannot be undone.");
                            if (confirm) {
                                if (user?.email) {
                                    mutate({ email: user?.email, password });
                                } else {
                                    setErrors((previousArray) => [...previousArray, "Make sure you enter a password before proceeding."]);
                                }
                            }
                        }}
                    >{!isPending ? "Confirm deletion" : "Deleting account..."}</Button>
                </div>
                {errors.length > 0 && <Error errors={errors} />}
            </div>
        </Modal>
    </>
}