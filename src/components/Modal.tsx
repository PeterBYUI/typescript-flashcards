import { useImperativeHandle, forwardRef, useRef } from "react";

export type ModalHandle = {
    open: () => void;
    close: () => void;
};

type ModalProps = {
    children: React.ReactNode;
}

const Modal = forwardRef<ModalHandle, ModalProps>(
    ({ children }, ref) => {

        const internalRef = useRef<HTMLDialogElement>(null);

        useImperativeHandle(ref, () => {
            return {
                open() {
                    internalRef.current?.showModal();
                },
                close() {
                    internalRef.current?.close();
                }
            }
        });
        return <dialog className="mt-16 w-1/1 lg:w-1/2 p-8 rounded-md backdrop:bg-gray-800 backdrop:opacity-50 left-[50%] translate-x-[-50%] bg-[rgba(250,250,250,.75)]" ref={internalRef}>{children}</dialog>
    }
);

export default Modal;