import { Injectable } from "@angular/core";

/**
 * Offers methods to access the browser storage.
 */
@Injectable()
export class LocalStorageService {


    ////////////////
    // PROPERTIES //
    ////////////////

    /**
     * Variable that determines whether local storage is supported or not
     * @type {boolean}
     */
    private _supportsLocalStorage: boolean;

    /**
     * Checks whether local storage is supported or not.
     * @returns {boolean}
     */
    get supportsLocalStorage() {

        if (this._supportsLocalStorage !== undefined) return this._supportsLocalStorage;

        try {
            localStorage.setItem("_TEST_", "1");
            localStorage.removeItem("_TEST_");
            this._supportsLocalStorage = true;
        } catch (error) {
            this._supportsLocalStorage = false;
        }

        return this._supportsLocalStorage ;

    }


    /////////////
    // METHODS //
    /////////////


    /**
     * Writes to the local storage (or alternative if not available).
     * @param key
     * @param value
     */
    write<T>(key: string, value: T) {

        const jsonObj: any = {
            data: null
        };

        if (value) {
            jsonObj.data = value;
        }

        this.setItem(key, JSON.stringify(jsonObj));

    }

    /**
     * Reads from the local storage and returns the data (or alternative if not available).
     * @param key
     * @param fallbackValue
     * @returns {T}
     */
    read<T>(key: string, fallbackValue?: T): T {

        const jsonStr: string = this.getItem(key);

        if (jsonStr && jsonStr !== "undefined" && jsonStr !== "null" && jsonStr !== null) {
            const jsonObj: any = JSON.parse(jsonStr);
            if (jsonObj.data !== undefined) return <T> jsonObj.data;
        }

        return fallbackValue !== undefined ? fallbackValue : null;

    }

    /**
     * Sets the item to the local storage or cookie.
     * @param key
     * @param jsonStr
     */
    private setItem(key: string, jsonStr: string) {
        if (this.supportsLocalStorage) {
            localStorage.setItem(key, jsonStr);
        }
    }

    /**
     * Gets the item from the local storage or cookie.
     * @param key
     * @returns {any}
     */
    private getItem(key: string): string {
        if (this.supportsLocalStorage) {
            return localStorage.getItem(key);
        } else {
            return "";
        }
    }

    /**
     * Gets a cookie by the key.
     * @param key
     * @returns {string}
     */
    private getCookie(key: string) {

        const name = key + "=";
        const ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";

    }

}
