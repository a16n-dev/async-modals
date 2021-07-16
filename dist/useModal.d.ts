import { ComponentType } from 'react';
import { Modal } from './ModalProvider';
interface options<T> extends settings {
    /**
     * Data that will be accessible in the component as props
     */
    data?: T;
}
interface settings {
    /**
     * Allow the user to close the modal by clicking on the background.
     * By default this is set to true
     */
    canClose?: boolean;
}
export declare function useModal(modalComponent?: undefined, modalOptions?: settings): {
    show: <Data, Response>(component: ComponentType<Modal<Data, Response>>, options?: options<Data>) => Promise<Response | undefined>;
    close: () => void;
};
export declare function useModal<Data, Response>(modalComponent: ComponentType<Modal<Data, Response>>, modalOptions?: options<Data>): {
    show: (options?: options<Data>) => Promise<Response | undefined>;
    close: () => void;
};
export {};
