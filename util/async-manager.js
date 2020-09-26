import React from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const AsyncContext = React.createContext({});

/**
 * Reads a value from AsyncStorage. In most cases, use `AsyncContext` instead.
 * @param {string}  key      - Key to read from. Do not include a leading '@'
 * @param {boolean} isString - Whether the value is a string or a serialized object
 *
 * @returns {*} The stored value or null if an error occurred
 */
export const readValue = async (key, isString = false) => {
    try {
        const value = await AsyncStorage.getItem("@" + key);
        return isString ? value : JSON.parse(value);
    } catch (e) {
        console.error("Error reading value @" + key + ":\n" + e);
        return null;
    }
};

/**
 * Reads many values from AsyncStorage at once. See `readValue` for more info.
 * @param {string[]} keys     - An array of keys. Do not include a leading '@'
 * @param {boolean}  isString - Passed to `readValue` for all keys
 *
 * @returns An object of the following shape: `{key1: value1, key2: value2, ...}`
 */
export const readManyValues = async (keys, isString) => {
    let values = {};
    await Promise.all(
        keys.map((key) =>
            (async () => {
                values[key] = await readValue(key, isString);
            })()
        )
    );
    return values;
};

/**
 * Writes a value to AsyncStorage. In most cases, use `App.setAsync` instead.
 * @param {string}  key            - The key to write the value to
 * @param {*}       value          - The value to write. By default,
 *                                   `JSON.stringify` will not be called if
 *                                   `typeof value == 'string'`.
 * @param {boolean} forceStringify - Whether to call `JSON.stringify` even if
 *                                   `val` is a string
 *
 * @returns {boolean} Whether the operation succeeded
 */
export const setValue = async (key, value, forceStringify = false) => {
    try {
        await AsyncStorage.setItem(
            "@" + key,
            !forceStringify && typeof value == "string"
                ? value
                : JSON.stringify(value)
        );
        return true;
    } catch (e) {
        console.error("Error saving value @" + key + ":\n" + e);
        return false;
    }
};
