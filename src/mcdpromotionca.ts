/**
 * @fileoverview This module is a domain model of
 * <https://mcdpromotion.ca>
 */

/**
 * McdPromotionCA is a domain model of <https://mcdpromotion.ca>
 */
export class McdPromotionCA {
    /**
     * ADD_CODE_INPUT_ID is the ID for the `<input>` on <https://mcdpromotion.ca>
     * that is used to enter Monopoly codes.
     *
     * @remark the leading '#' is omitted.
     *
     * @remark this ID may be changed upstream at any time without notice.
     */
    protected static readonly ADD_CODE_INPUT_ID = "code"

    /**
     * ADD_CODE_PATH is the ending URL path for the page on
     * <https://mcdpromotion.ca> that is used to enter Monopoly codes.
     *
     * @remark there may be paths between this and the host name
     *
     * @remark this path may be changed upstream at any time without notice.
     */
    protected static readonly ADD_CODE_URL_PATH = "/add_code"

    /**
     * hasCodeInptFocused indicates whether or not the `<input>` for entering a
     * Monopoly code has focused.
     */
    private hasCodeInptFocused: boolean

    /**
     * _observer is a MutationObserver for tracking the user's location within
     * the <https://mcdpromotion.ca> site.
     */
    private readonly _observer: MutationObserver

    constructor() {
        this.hasCodeInptFocused = false

        // If we start on the right page, attempt to immediately focus
        if (this.isOnAddCodePage()) {
            this.focusCodeInput()
        }

        // Regardless of which page we're on, setup a MutationObserver to track
        // the URL
        this._observer = new MutationObserver(this.focusCodeInput.bind(this))
    }

    /**
     * start initiates tracking of <https://mcdpromotion.ca>.
     */
    public start(): void {
        this._observer.observe(document, { childList: true, subtree: true })
    }

    /**
     * isOnAddCodePage returns `true` if the current page on
     * <https://mcdpromotion.ca> is used to enter Monopoly codes.
     */
    public isOnAddCodePage(): boolean {
        return window.location.href.endsWith(McdPromotionCA.ADD_CODE_URL_PATH)
    }

    /**
     * focusCodeInput attempts to focus the `<input>` that is used to enter
     * Monopoly codes.
     */
    private focusCodeInput(): void {
        let interval: number | undefined = undefined

        const attemptFocus = () => {
            const el: HTMLInputElement | null = document.querySelector(
                `input#${McdPromotionCA.ADD_CODE_INPUT_ID}`
            )

            if (!this.isOnAddCodePage()) {
                window.clearInterval(interval)
                this.hasCodeInptFocused = false
                console.info("--- mcdpromotionca-add-code-autofocus :: Not on add code page.")
                return
            }

            if (el) {
                if (!this.hasCodeInptFocused) {
                    el.focus()
                    this.hasCodeInptFocused = true
                    console.info("--- mcdpromotionca-add-code-autofocus :: Autofocusing.")
                }

                window.clearInterval(interval)
            } else {
                console.error(
                    "--- mcdpromotionca-add-code-autofocus :: Cannot find '<input>' with id 'code'."
                )
            }
        }

        // attemptFocus every 100. We give up if we realize we're not on the
        // right page or we've already auto-focused once (after that it's
        // up to the user).
        interval = window.setInterval(attemptFocus, 100)
    }
}
