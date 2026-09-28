const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Makes an element behave like a proper dialog:
 * focuses it on open, keeps Tab inside it, closes on Escape,
 * and hands focus back to whatever opened it.
 *
 * Usage: <div use:modal={{ onClose: close }}>
 *
 * @param {HTMLElement} node
 * @param {{ onClose?: () => void }} params
 */
export function modal(node, params = {}) {
    let { onClose } = params;
    const previouslyFocused = /** @type {HTMLElement | null} */ (document.activeElement);

    node.setAttribute('role', 'dialog');
    node.setAttribute('aria-modal', 'true');
    if (!node.hasAttribute('tabindex')) node.setAttribute('tabindex', '-1');
    node.focus({ preventScroll: true });

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            e.stopPropagation();
            onClose?.();
            return;
        }
        if (e.key !== 'Tab') return;

        const items = /** @type {HTMLElement[]} */ ([...node.querySelectorAll(FOCUSABLE)]);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (!node.contains(document.activeElement)) {
            e.preventDefault();
            (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && (document.activeElement === first || document.activeElement === node)) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    // Listen on the window: tapping a button on touch devices (and in Safari)
    // doesn't focus it, so key presses wouldn't reach the dialog itself.
    window.addEventListener('keydown', handleKeydown);

    return {
        /** @param {{ onClose?: () => void }} next */
        update(next) {
            onClose = next.onClose;
        },
        destroy() {
            window.removeEventListener('keydown', handleKeydown);
            previouslyFocused?.focus?.({ preventScroll: true });
        }
    };
}
