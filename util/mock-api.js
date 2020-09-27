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
