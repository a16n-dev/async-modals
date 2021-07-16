import * as React from "react";
import { ComponentType, createContext, useEffect, useRef, useState } from "react";

// A Modal object stores information about a modal being shown
export interface ModalObject<Data = any, Response = any, > {
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
  // Classnames to pass to the modal background component
  backgroundClassName?: string | ((isClosing?: boolean) => string);

  // add a delay between when the modal closes and when the component unmounts, this allows time for a closing animation to play
  exitDelay?: number;

  // background opacity - defaults to 50%
  backgroundOpacity?: number;
}

export const ModalContext = createContext<contextState>({
  setModal: () => {},
  closeModal: () => {},
});

const ChildWrapper = React.memo(({ children }) => <>{children}</>);

interface ModalState {
  modal?: ModalObject;
  isClosing?: boolean;
  exitDelay?: number;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  backgroundClassName: baseClassName = "async-modals__background",
  exitDelay = 0,
  backgroundOpacity = 0.5,
}) => {

  const [state, setState] = useState<ModalState>({
    exitDelay,
  });

  // Timer for tracking when the modal is closing (animation)
  const animationTimer = useRef<number>();

  // Close the modal, optionally passing in some data
  const closeModal = (data?: unknown) => {
    if(exitDelay){
      // If exit delay is set then dont unmount until timer is up
      setState(s => ({
        ...s,
        isClosing: true,
      }))
      animationTimer.current = window.setTimeout(() => {
        state.modal?.resolve(data);
        setState({});
      }, exitDelay)
    } else {
      state.modal?.resolve(data);
      setState({});
    }
  };

  // Cleanup hook for animation timer
  useEffect(() => {
    //listener to prevent navigation and instead close the modal
    const listener = (e: any) => {
      if(e.state?.modal !== true){
        closeModal();
      }
      }
      // window.history.pushState({modal: false}, '');
    
    window.addEventListener('popstate', listener);
    
    return () => {
      window.clearTimeout(animationTimer.current)
      window.removeEventListener('popstate', listener);
    }
  }, [])



  const context: contextState = {
    setModal: (obj) => {
      history.replaceState({modal: false}, '');
      history.pushState({modal: true}, '');
      setState((s) => ({
        ...s,
        modal: obj,
      }));
    },
    modal: state,
    closeModal: (data?: unknown) => {
      closeModal(data);
    }
  };

  return (
    <ModalContext.Provider value={context}>
      <ChildWrapper>{children}</ChildWrapper>
      {state.modal && (
        <div
          className={typeof baseClassName === 'function' ? baseClassName(state.isClosing) : baseClassName}
          style={{transitionDuration: `${exitDelay}ms`, backgroundColor: state.isClosing ? undefined : `rgba(0,0,0,${backgroundOpacity})`}}
          id="modal-back"
          onMouseDown={(e) => {
            if (
              state.modal?.canClose &&
              (e.target as any)?.id === "modal-back"
            ) {
              closeModal();
            }
          }}
        >
          <state.modal.component
            data={state.modal.data}
            submit={(data?: unknown) => closeModal(data)}
            cancel={() => closeModal()}
            isClosing={state.isClosing}
          />
        </div>
      )}
    </ModalContext.Provider>
  );
};
