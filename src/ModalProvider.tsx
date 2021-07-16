import * as React from "react";
import {
  ComponentType,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

// A Modal object stores information about a modal being shown
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
  // Classnames to pass to the modal background component
  backgroundClassName?: string | ((closed?: boolean) => string);

  // will instead wait for the transitioned event to fire before closing
  animated?: boolean;

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
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  animated,
  backgroundClassName: baseClassName = animated
    ? (isClosing) =>
        `async-modals__bg-base async-modals__${isClosing ? "closing" : "open"}`
    : "async-modals__bg-base async-modals__open",
}) => {
  const [state, setState] = useState<ModalState>({});

  const modalContainer = useRef<HTMLDivElement>(null);

  // Close the modal, optionally passing in some data
  const closeModal = (data?: unknown) => {
    if (animated) {
      // If exit delay is set then dont unmount until timer is up
      setState((s) => ({
        ...s,
        isClosing: true,
      }));

      const listener = () => {
        state.modal?.resolve(data);
        setState({});
      };

      modalContainer.current?.addEventListener("transitionend", listener);
      modalContainer.current?.addEventListener("webkitTransitionEnd", listener);
      modalContainer.current?.addEventListener("animationend", listener);
      modalContainer.current?.addEventListener("webkitAnimationEnd", listener);
      
    } else {
      state.modal?.resolve(data);
      setState({});
    }
  };

  // Cleanup hook for animation timer
  useEffect(() => {
    //listener to prevent navigation and instead close the modal
    const listener = (e: any) => {
      if (e.state?.modal !== true) {
        closeModal();
      }
    };

    window.addEventListener("popstate", listener);

    return () => {
      window.removeEventListener("popstate", listener);
    };
  }, []);

  const context: contextState = {
    setModal: (obj) => {
      history.replaceState({ modal: false }, "");
      history.pushState({ modal: true }, "");
      setState((s) => ({
        ...s,
        modal: obj,
      }));
    },
    modal: state,
    closeModal: (data?: unknown) => {
      closeModal(data);
    },
  };

  return (
    <ModalContext.Provider value={context}>
      <ChildWrapper>{children}</ChildWrapper>
      {state.modal && (
        <div
          className={
            typeof baseClassName === "function"
              ? baseClassName(state.isClosing)
              : baseClassName
          }
          id="modal-back"
          onMouseDown={(e) => {
            if (
              state.modal?.canClose &&
              (e.target as any)?.id === "modal-back"
            ) {
              closeModal();
            }
          }}
          ref={modalContainer}
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
