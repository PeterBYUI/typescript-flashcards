import { useContext, useState, createRef } from "react";
import { UserContext } from "../store/UserContext";
import { useMutation } from "@tanstack/react-query";
import { deleteUserAccount } from "../utils/http";
import { useNavigate } from "react-router";

import ProfileSvg from "../components/svgs/Profile";
import Button from "../components/Button";
import Input from "../components/Input";
import Error from "../components/Error";

export default function Profile() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const passwordRef = createRef<HTMLInputElement>();


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

    return <section className="flex flex-col gap-8 items-center">
        <header className="mt-16 flex flex-col items-center">
            <ProfileSvg isOnProfilePage={true} />
            <p className="text-xl font-semibold text-teal-700">{user?.displayName}</p>
        </header>
        {!isDeleting ?
            <Button styling="bg-red-500 hover:bg-red-600 text-[#eee] w-1/5 text-lg font-semibold"
                onClick={() => setIsDeleting(true)}
            >Delete account</Button>
            :
            <div className="w-1/1 flex flex-col items-center gap-4">
                <Input ref={passwordRef} styling="w-1/3 placeholder:text-red-400 text-red-500 text-lg" type="password" isError={true} placeholder="Enter your email" />
                <div className="flex gap-8 text-lg text-[#fff]">
                    <Button styling="bg-teal-600 hover:bg-teal-700" onClick={() => setIsDeleting(false)}>Cancel</Button>
                    <Button styling="bg-red-500 hover:bg-red-600 disabled:bg-red-300"
                        disabled={isPending}
                        onClick={() => {
                            const confirm = window.confirm("Are you sure? This action cannot be undone.");
                            if (confirm) {
                                if (user?.email && passwordRef.current?.value) {
                                    mutate({ email: user?.email, password: passwordRef.current.value as string });
                                } else {
                                    setErrors((previousArray) => [...previousArray, "Make sure you enter a password before proceeding."]);
                                }
                            }
                        }}
                    >{!isPending ? "Confirm deletion" : "Deleting account..."}</Button>
                </div>
                {errors.length > 0 && <Error errors={errors} />}
            </div>
        }
    </section>
}