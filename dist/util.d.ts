import { ModalSettings } from "./types";
export declare const disablebodyScroll: () => void;
export declare const enableBodyScroll: () => void;
export declare const getBaseClassnames: (animated?: boolean | undefined) => ((isClosing: boolean) => string) | "async-modals__bg-base async-modals__open";
export declare const resolveStyles: (settings: ModalSettings) => {
    [key: string]: string | number;
};
