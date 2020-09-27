// The following functions are intended to simulate the presence of a back-end API using hard-coded test data.
// For information about data format, see test-data.js

import { setValue } from "./async-manager";
import { customers, packages, access_points } from "./test-data";

/**
 * Simulate user authentication. Given login credentials, return the user's
 * information or `false` if the credentials are incorrect.
 * @param {*} username The username/email to check
 * @param {*} password Password to check. The correct password is always
 *                     "password".
 * @returns User info or `false` if login credentials are incorrect
 */
export function login(username, password) {
    let user = undefined;
    customers.some((item) => {
        item.Email == username
            ? (() => {
                  user = item;
                  return true;
              })()
            : {};
        return false;
    });

    return user != null && password == "password" ? user : false;
}

/**
 * Simulate re-authentication for a user who is already signed in. The app should
 * re-authenticate with a stored access token (in this case the username) every time
 * the app starts.
 * @param {*} token Access token to check. For this prototype, it is the email address
 *
 * @returns User info or `false` if access token is invalid
 */
export function fetchFromAccessToken(token) {
    return login(token, "password");
}

/**
 * Simulate checking the status of access points for the outage map.
 * @param {*} id Id of the access point to fetch. If left empty, fetch all access points
 *
 * @returns A single access point if id was specified; otherwise an array of all access points
 */
export function fetchAPStatus(id = -1) {
    if (id == -1) {
        return access_points;
    }
    let ap = null;
    packages.some((item) => {
        item.ID == id
            ? (() => {
                  ap = item;
                  return true;
              })()
            : {};
        return false;
    });

    return ap;
}

/**
 * Simulate fetching service package information.
 * @param {*} id Id of package to fetch
 *
 * @returns Information about the service package
 */
export function fetchPackage(id) {
    let pkg = null;
    packages.some((item) => {
        item.ID == id
            ? (() => {
                  pkg = item;
                  return true;
              })()
            : {};
        return false;
    });

    return pkg;
}

/**
 * Simulate the live chat feature. After a random (1-5s) time, send a reply
 * of a random length. To create some variance in reply lengths, the returned
 * message is completely random.
 * @param {*} msg Currently does nothing.
 *
 * @returns A promise that resolves to a message (string) after a short delay
 */
export async function replyToMessage(msg) {
    // Time to wait before resolving the promise
    const delay = Math.floor(Math.random() * 4001) + 1000; // 1-5 seconds
    // Number of lines in the reply
    const numLines = Math.floor(Math.random() * 16) + 1; // 1-16 lines
    var msg = "";
    for (let i = 0; i < numLines; i++) {
        // Length of this line
        const numChars = Math.floor(Math.random() * 16) + 5; // 5-20 chars
        for (let j = 0; j < numChars; j++) {
            // Fill message with random data
            msg += Math.floor(Math.random() * 10);
        }
        msg += "\n";
    }
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(msg);
        }, delay)
    );
}
