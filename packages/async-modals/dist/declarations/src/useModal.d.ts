import { ComponentType } from 'react';
import { Modal } from './ModalProvider';
interface options<T> {
    /**
     * Data that will be accessible in the component as props
     */
    data?: T;
    /**
     * Classes to apply to the background when the modal is open
     */
    backgroundClassName?: string;
    /**
     * Allow the user to close the modal by clicking on the background.
     * By default this is set to true
     */
    canClose?: boolean;
}
export declare const useModal: <req, res>(modal: ComponentType<Modal<req, res>>) => {
    show: (options?: options<req>) => Promise<res>;
};
export {};
