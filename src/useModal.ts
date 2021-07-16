import { ComponentType, useContext } from 'react';
import { Modal, ModalContext, ModalObject, } from './ModalProvider';

//Options the user can specify
interface options<T> extends settings{
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

// Overloads
export function useModal(modalComponent?: undefined, modalOptions?: settings): {
  show: <Data, Response>(component: ComponentType<Modal<Data, Response>>, options?: options<Data>) => Promise<Response | undefined>;
  close: () => void;
};
export function useModal<Data,Response>(modalComponent: ComponentType<Modal<Data, Response>>, modalOptions?: options<Data>): {
  show: (options?: options<Data>) => Promise<Response | undefined>;
  close: () => void;
};

export function useModal<Data,Response>(modalComponent?: ComponentType<Modal<Data, Response>>, modalOptions: options<Data> = {}): any {
  const { setModal, closeModal } = useContext(ModalContext);

  const show = (component: ComponentType<Modal<Data, Response>>) => async ( options: options<Data> = modalOptions): Promise<Response | undefined> =>
  new Promise((resolve, reject) => {
    const obj: ModalObject<Data, Response> = {
      resolve,
      reject,
      data: options.data,
      component,
      canClose: Boolean(options.canClose),
    };
    setModal(obj);
  })

  return {
    show: modalComponent ? show(modalComponent) : (component: ComponentType<Modal<Data, Response>>, options: options<Data> = modalOptions) => show(component)(options),
    close: () => closeModal()
  };
};