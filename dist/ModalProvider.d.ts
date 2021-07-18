import * as React from "react";
import { ModalObject, ModalSettings } from "./types";
interface contextState {
    modal?: ModalState;
    setModal: (obj: ModalObject) => void;
    closeModal: () => void;
    setModalData: (data?: unknown) => void;
}
export interface ModalProviderProps {
    defaultSettings?: ModalSettings;
}
export declare const ModalContext: React.Context<contextState>;
interface ModalState {
    modal?: ModalObject;
    isClosing?: boolean;
}
export declare const ModalProvider: React.FC<ModalProviderProps>;
export {};
