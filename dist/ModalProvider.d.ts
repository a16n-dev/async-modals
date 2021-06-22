import * as React from 'react';
import { ComponentType } from 'react';
export interface ModalObject<res = any, req = any> {
    resolve: (value: res) => void;
    reject: (reason?: any) => void;
    data: req;
    component: ComponentType<Modal<req, res>>;
    canClose: boolean;
}
export interface Modal<T, R = unknown> {
    data: T;
    submit: (res: R) => void;
    cancel: () => void;
}
interface contextState {
    modal?: ModalObject;
    setModal: (obj: ModalObject, backgroundClassName?: string) => void;
}
export interface ModalProviderProps {
    backgroundClassName?: string;
    backgroundId?: string;
}
export declare const ModalContext: React.Context<contextState>;
export declare const ModalProvider: React.FC<ModalProviderProps>;
export {};
