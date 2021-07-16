import * as React from "react";
import { ComponentType } from "react";
export interface ModalObject<Data = any, Response = any> {
    resolve: (data: Response) => void;
    reject: (reason?: any) => void;
    data?: Data;
    component: ComponentType<Modal<Data, Response>>;
    canClose: boolean;
}
export interface Modal<Data, Response = unknown> {
    data: Data;
    submit: (res: Response) => void;
    cancel: () => void;
    isClosing?: boolean;
}
interface contextState {
    modal?: ModalState;
    setModal: (obj: ModalObject) => void;
    closeModal: (data?: unknown) => void;
}
export interface ModalProviderProps {
    backgroundClassName?: string | ((isClosing?: boolean) => string);
    exitDelay?: number;
    backgroundOpacity?: number;
}
export declare const ModalContext: React.Context<contextState>;
interface ModalState {
    modal?: ModalObject;
    isClosing?: boolean;
    exitDelay?: number;
}
export declare const ModalProvider: React.FC<ModalProviderProps>;
export {};
