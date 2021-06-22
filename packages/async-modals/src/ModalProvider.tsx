import { ComponentType, createContext, useState } from 'react';

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

export const ModalContext = createContext<contextState>({
  setModal: () => {},
});

const ChildWrapper = React.memo(({children}) => <>{children}</>)

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  backgroundClassName = 'async-modals__background',
  backgroundId = 'modal-back',
}) => {
  const [modal, setModal] = useState<ModalObject>();
  const [bgClassName, setBgClassName] = useState<string>(
    ''
  );
  const ctx: contextState = {
    setModal: (obj, backgroundClassName = '') => {
      setModal(obj);
      setBgClassName(backgroundClassName);
    },
  };

  return (
    <ModalContext.Provider value={ctx}>
      <ChildWrapper>{children}</ChildWrapper>
      {modal && (
        <div
          className={backgroundClassName + ' ' + bgClassName}
          id={backgroundId}
          onMouseDown={e => {
            if (modal.canClose && (e.target as any)?.id === backgroundId) {
              modal.resolve(undefined);
              setModal(undefined);
            }
          }}
        >
          <modal.component
            data={modal.data}
            submit={(data?: unknown) => {
              modal.resolve(data);
              setModal(undefined);
            }}
            cancel={() => {
              modal.resolve(undefined);
              setModal(undefined);
            }}
          />
        </div>
      )}
    </ModalContext.Provider>
  );
};
