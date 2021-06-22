import { ComponentType, useContext } from 'react';
import { Modal, ModalContext, ModalObject, } from './ModalProvider';

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

export const useModal = <req,res>(modal: ComponentType<Modal<req, res>>) => {
  const { setModal } = useContext(ModalContext);

  return {
    show: async(
      options: options<req> = {}
    ): Promise<res | undefined> =>
      new Promise((resolve, reject) => {
        const obj: ModalObject<res> = {
          resolve,
          reject,
          data: options.data,
          component: modal,
          canClose: options.canClose === undefined ? true : options.canClose,
        };
        setModal(obj, options.backgroundClassName);
      }),
  };
};
