// Utilities module
// Cross-end IIFE initialization

(function (exports) {

    // Agents enum
    exports.AGENT = {
        PERSONAL: 'personal',
        EXTERNAL: 'external',
        ADMIN: 'admin'
    }

    // Events enum
    exports.EVENTS = {
        LOGIN: 'login',
        SEND: 'send',
        MESSAGE: 'message',
        INTERCOM: 'internal (admin) communication',
    }


})(typeof exports === 'undefined' ? this.utils = {} : exports)
