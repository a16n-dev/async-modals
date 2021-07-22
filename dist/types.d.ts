import { ComponentType } from "react";
export interface ModalObject<Data = any, Response = any> {
    resolve: (data: Response) => void;
    reject: (reason?: any) => void;
    data?: Data;
    component: ComponentType<Modal<Data, Response>>;
    settings: ModalSettings;
}
export interface Modal<Data, Response = unknown> {
    data: Data;
    submit: (res: Response) => void;
    cancel: () => void;
    isClosing?: boolean;
}
export interface options<T> extends ModalSettings {
    /**
     * Data that will be accessible in the component as props
     */
    data?: T;
}
export interface ModalSettings {
    /**
     * Allow the user to close the modal by clicking on the background.
     * By default this is set to true
     */
    canClose?: boolean;
    /**
     * show a semi-transparent black background behind the modal
     * By default this is set to true
     */
    showBg?: boolean;
    /**
     * Classnames to apply to the modal container, for positioning it
     */
    containerClassName?: string;
    /**
     *
     */
    backgroundClassName?: string | ((closed?: boolean) => string);
    /**
     * Allow the user to scroll the page while the modal is open
     */
    allowContentScrolling?: boolean;
    /**
     * Animated
     */
    animated?: boolean;
    /**
     * Sets the opacity of the background when the modal is open
     */
    cssBgOpacity?: number;
    /**
     * Specify the duration of the animation in milliseconds if animation is enabled
     */
    cssAnimationDuration?: number;
}
