/**
 * @fileoverview This module is the entrypoint into the application
 */

import { McdPromotionCA } from "./mcdpromotionca"

const main = () => {
    const mcdPromotionCA = new McdPromotionCA()
    mcdPromotionCA.start()
}

// Immediately invoke main after succesful site load
window.addEventListener("load", main, false)
