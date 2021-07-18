import { ComponentType } from 'react';
import { Modal } from '.';
import { ModalSettings, options } from './types';
export declare function useModal(modalComponent?: undefined, modalOptions?: ModalSettings): {
    show: <Data, Response>(component: ComponentType<Modal<Data, Response>>, options?: options<Data>) => Promise<Response | undefined>;
    close: () => void;
};
export declare function useModal<Data, Response>(modalComponent: ComponentType<Modal<Data, Response>>, modalOptions?: options<Data>): {
    show: (options?: options<Data>) => Promise<Response | undefined>;
    close: () => void;
    updateModalData: (data: Data) => void;
};
