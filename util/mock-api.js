import { setValue } from "./async-manager";
import { customers, packages, access_points } from "./test-data";

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

export function fetchFromAccessToken(token) {
    return login(token, "password");
}

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

export async function replyToMessage(msg) {
    const delay = Math.floor(Math.random() * 4001) + 1000; // 1-5 seconds
    const numLines = Math.floor(Math.random() * 16) + 1; // 1-16 lines
    var msg = "";
    for (let i = 0; i < numLines; i++) {
        const numChars = Math.floor(Math.random() * 16) + 5; // 5-20 chars
        for (let j = 0; j < numChars; j++) {
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
