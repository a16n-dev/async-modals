import * as React from "react";
import { createContext, useEffect, useRef, useState } from "react";
import { ModalObject, ModalSettings } from "./types";
import { disablebodyScroll, enableBodyScroll, getBaseClassnames } from "./util";

interface contextState {
  modal?: ModalState;
  setModal: (obj: ModalObject) => void;
  closeModal: () => void;
  setModalData: (data?: unknown) => void
}

export interface ModalProviderProps {
  // Default settings
  defaultSettings?: ModalSettings;
}

export const ModalContext = createContext<contextState>({
  setModal: () => {},
  closeModal: () => {},
  setModalData: () => {},
});

const ChildWrapper = React.memo(({ children }) => <>{children}</>);

interface ModalState {
  modal?: ModalObject;
  isClosing?: boolean;
}

const defaultModalOptions = {
  canClose: true,
  showBg: true,
}


export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  defaultSettings,
}) => {
  const [state, setState] = useState<ModalState>({});

  const modalBg = useRef<HTMLDivElement>(null);

  // Close the modal, optionally passing in some data
  const closeModal = (data?: unknown) => {
    const close = () => {
      enableBodyScroll();
      state.modal?.resolve(data);
      setState({});
    };

    if (state.modal?.settings.animated) {
      // If animated then wait for animation or transition event to fire
      setState((s) => ({
        ...s,
        isClosing: true,
      }));

      const listener = () => close();

      modalBg.current?.addEventListener("transitionend", listener);
      modalBg.current?.addEventListener("webkitTransitionEnd", listener);
      modalBg.current?.addEventListener("animationend", listener);
      modalBg.current?.addEventListener("webkitAnimationEnd", listener);
    } else {
      close();
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
    setModal: ({ settings, ...rest }) => {
      history.replaceState({ modal: false }, "");
      history.pushState({ modal: true }, "");

      if(!settings.allowContentScrolling){
        disablebodyScroll();
      }

      const newSettings = {
        ...defaultModalOptions,
        ...defaultSettings,
        ...settings,
      }

      setState((s) => ({
        ...s,
        modal: {
          ...rest,
          settings: {
            backgroundClassName: getBaseClassnames(newSettings.animated),
            ...newSettings,
          },
        },
      }));
    },
    modal: state,
    closeModal: () => {
      history.back();
      closeModal();
    },
    setModalData: (data?: unknown) => {
      setState(s => ({...s, 
        modal: { 
            ...(s.modal as ModalObject),
           data 
          }
       }))
    }
  };

  return (
    <ModalContext.Provider value={context}>
      <ChildWrapper>{children}</ChildWrapper>
      {state.modal && (
        <div
          className={`async-modals__wrapper`}
          id="modal-back"
          onMouseDown={(e) => {
            if (
              state.modal?.settings.canClose &&
              (e.target as any)?.id === "modal-back"
            ) {
              closeModal();
            }
          }}
        >
          {
            <div
              className={`${
                typeof state.modal.settings.backgroundClassName === "function"
                  ? state.modal.settings.backgroundClassName(state.isClosing)
                  : state.modal.settings.backgroundClassName
              } ${!state.modal.settings.showBg && "async-modals__hidden"}`}
              ref={modalBg}
            />
          }
          <div
            className={`async-modals__container ${state.modal.settings.containerClassName}`}
          >
            <state.modal.component
              data={state.modal.data}
              submit={(data?: unknown) => closeModal(data)}
              cancel={() => closeModal()}
              isClosing={state.isClosing}
            />
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
