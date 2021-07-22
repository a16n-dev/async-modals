import { ModalSettings } from "./types";

export const disablebodyScroll = () => {
    document.body.style.overflow = 'hidden';
}

export const enableBodyScroll = () => {
    document.body.style.overflow = '';
}

export const getBaseClassnames = (animated?: boolean) => {
    return animated
    ? (isClosing: boolean) =>
        `async-modals__bg-base async-modals__${isClosing ? "closing" : "open"}`
    : "async-modals__bg-base async-modals__open"
}

export const resolveStyles = (settings: ModalSettings): {[key: string]: string | number} => ({
    '--duration': `${settings.cssAnimationDuration || 500}ms`,
    '--opacity': settings.cssBgOpacity || 0.5,
    '--tw-backdrop-opacity': settings.cssBgOpacity || 0.5,
})