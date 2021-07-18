import { ComponentType, useContext } from 'react';
import { Modal } from '.';
import { ModalContext } from './ModalProvider';
import { ModalSettings, options, ModalObject } from './types';

// Overloads
// If the user doesnt specify a component, force them to specify a component when they call show()
export function useModal(modalComponent?: undefined, modalOptions?: ModalSettings): {
  show: <Data, Response>(component: ComponentType<Modal<Data, Response>>, options?: options<Data>) => Promise<Response | undefined>;
  close: () => void;
};
//If the user has already specified a component, dont let them to specify it when they call show()
export function useModal<Data,Response>(modalComponent: ComponentType<Modal<Data, Response>>, modalOptions?: options<Data>): {
  show: (options?: options<Data>) => Promise<Response | undefined>;
  close: () => void;
  updateModalData: (data: Data) => void;
};

export function useModal<Data,Response>(modalComponent?: ComponentType<Modal<Data, Response>>, modalOptions?: options<Data>): any {
  const { setModal, closeModal, setModalData } = useContext(ModalContext);

  const show = (component: ComponentType<Modal<Data, Response>>) => async ( options?: options<Data>): Promise<Response | undefined> =>
  new Promise((resolve, reject) => {

    //compose options object
    const settings: ModalSettings  = {
      ...modalOptions,
      ...options
    }

    const obj: ModalObject<Data, Response> = {
      resolve,
      reject,
      data: options?.data,
      component,
      settings,
    };
    setModal(obj);
  })

  return {
    show: modalComponent ? show(modalComponent) : (component: ComponentType<Modal<Data, Response>>, options: options<Data>) => show(component)(options),
    close: () => closeModal(),
    updateModalData: modalComponent ? (data: Data) => {setModalData(data)} : undefined
  };
};