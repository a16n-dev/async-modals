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