import { afterEach, describe, expect, it, jest } from "@jest/globals"
import { McdPromotionCA } from "./mcdpromotionca"

describe("McdPromotionCA", () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    describe("isOnAddCodePage", () => {
        it("returns true when the page ends with add_code", () => {
            // Given
            jest.spyOn(window, "location", "get").mockReturnValue({
                ...global.location,
                href: "https://mcdpromotion.ca/en-ca/add_code",
            })
            const mcdPromotionCA = new McdPromotionCA()

            // When
            const result = mcdPromotionCA.isOnAddCodePage()

            // Then
            expect(result).toBe(true)
        })
    })

    describe("start", () => {
        it("<input> receives focus when on the right page", () => {
            // Given
            const spyedSetInterval = jest.spyOn(window, "setInterval")
            const spyedClearInterval = jest.spyOn(window, "clearInterval")
            jest.spyOn(window, "location", "get").mockReturnValue({
                ...global.location,
                href: "https://mcdpromotion.ca/en-ca/add_code",
            })
            document.body.innerHTML = `
          <div>
            <input id="code">
          </div>`

            // When
            const mcdPromotionCA = new McdPromotionCA()
            mcdPromotionCA.start()
            setTimeout(() => {
                // Then
                expect(document.activeElement?.id).toBe("code")
                expect(spyedSetInterval).toHaveBeenCalledTimes(1)
                expect(spyedClearInterval).toHaveBeenCalledTimes(1)
            }, 200)
        })

        it("<input> does not receive focus when on a different page", () => {
            // Given
            const spyedSetInterval = jest.spyOn(window, "setInterval")
            const spyedClearInterval = jest.spyOn(window, "clearInterval")
            jest.spyOn(window, "location", "get").mockReturnValue({
                ...global.location,
                href: "https://mcdpromotion.ca/en-ca/other_page",
            })
            document.body.innerHTML = `
          <div>
            <input id="code">
          </div>`

            // When
            const mcdPromotionCA = new McdPromotionCA()
            mcdPromotionCA.start()
            setTimeout(() => {
                // Then
                expect(document.activeElement?.id).toBe("code")
                expect(spyedSetInterval).toHaveBeenCalledTimes(1)
                expect(spyedClearInterval).not.toHaveBeenCalled()
            }, 200)
        })
    })
})
