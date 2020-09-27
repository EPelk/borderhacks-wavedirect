import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AnimatedSplash from "react-native-animated-splash-screen";
import EStyleSheet from "react-native-extended-stylesheet";
import { nav_themes, themes, theme_constants } from "./util/style";
import DrawerNav from "./components/DrawerNav";
import { AsyncContext, readManyValues, setValue } from "./util/async-manager";
import { fetchAPStatus, fetchFromAccessToken } from "./util/mock-api";

/**
 * App entry point.
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // The splash screen will not disappear until
            // these are both true.
            is_loaded: false,
            splash_timeout: false,

            // These are stored locally and loaded during app
            // startup.
            theme: "light",
            accessToken: undefined,

            // These are not stored locally and are always
            // fetched on startup or login.
            user_data: undefined,
            access_points: undefined,
            access_point_refresh: undefined,
            access_point_refresh_time: undefined,
        };

        // Declare member functions that will be shared in AsyncContext.
        // This is done in the constructor to preserve the value of `this`.

        /**
         * Sets a value in AsyncStorage and updates the app state.
         * Also see Async.js.
         * @param {string}  key            - Key to set
         * @param {*}       val            - Value to set
         * @param {boolean} forceStringify - Whether to call `JSON.stringify`
         *                                   even if `val` is a string
         *
         * @returns {boolean} Whether the operation succeeded
         */
        this.setAsync = async (key, val, forceStringify = false) => {
            // Only update state if AsyncStorage successfully updated
            if (setValue(key, val, forceStringify)) {
                this.setState({ [key]: val });
                return true;
            }
            return false;
        };

        /**
         * Fetches user data for an access token and stores it in the
         * app state.
         * @param {*} token Access token (email) to fetch
         */
        this.fetchUser = async (token = this.state.accessToken) => {
            if (token != undefined) {
                this.setState({
                    user_data: fetchFromAccessToken(this.state.accessToken),
                });
            }
        };

        /**
         * Toggles the app theme. Also updates the app state and
         * asynchronous storage.
         */
        this.toggleTheme = async () => {
            let newTheme = this.state.theme == "dark" ? "light" : "dark";
            // Build styles FIRST so they are ready when the re-render occurs
            this.buildStyles(newTheme);
            this.setState({ theme: newTheme });
            await this.setAsync("theme", newTheme);
        };

        /**
         * Fetch information on access points and update the app state.
         */
        this.updateAPStatus = async () => {
            const timestamp = new Date().toLocaleTimeString();
            this.setState({
                access_points: fetchAPStatus(),
                access_point_refresh_time: timestamp,
            });
        };

        // End member function declarations

        // Theme hasn't been loaded from AsyncStorage yet, but
        // some components might need the styles.
        this.buildStyles(this.state.theme);

        this.init();

        // Time out the splash screen after 2 seconds
        setTimeout(() => {
            this.setState({ splash_timeout: true });
        }, 2000);
    }

    /**
     * Load data from AsyncStorage and the mock API.
     * Also build loaded styles and update app state.
     */
    async init() {
        await this.loadAsync();
        await this.loadFromAPI();
        this.buildStyles(this.state.theme);
        this.setState({ is_loaded: true });
    }

    /**
     * Load data from AsyncStorage into the app state.
     */
    async loadAsync() {
        let state = await readManyValues(["theme", "accessToken"], true);
        if (state.theme == null) {
            state.theme = "light";
        }
        if (state.accessToken == 0) {
            state.accessToken = undefined;
        }
        this.setState(state);
    }

    /**
     * Load data from the mock api into the app state.
     */
    async loadFromAPI() {
        // If an access token is defined, fetch the corresponding user data.
        await this.fetchUser();
        // Fetch access point data.
        await this.updateAPStatus();
        // Update access point data every minute
        this.setState({
            access_point_refresh: setInterval(() => {
                this.updateAPStatus();
            }, 60000),
        });
    }

    /**
     * Builds EStyleSheet themes.
     * @param {*} theme "light" or "dark"
     */
    buildStyles(theme) {
        EStyleSheet.build({
            ...themes[theme],
            ...theme_constants,
        });
    }

    render() {
        return (
            <AnimatedSplash
                translucent={true}
                isLoaded={this.state.is_loaded && this.state.splash_timeout}
                logoImage={require("./assets/logo.png")}
                backgroundColor={"#BB131A"}
                logoHeight={39}
                logoWidth={158}
                disableBackgroundImage={true}
            >
                <AsyncContext.Provider
                    value={{
                        state: this.state,
                        setAsync: this.setAsync,
                        fetchUser: this.fetchUser,
                        updateAPStatus: this.updateAPStatus,
                        // () => {} notation to preserve the value
                        // of `this`.
                        setState: (state, callback) => {
                            this.setState(state, callback);
                        },
                    }}
                >
                    <NavigationContainer
                        theme={{
                            ...nav_themes[this.state.theme],
                            toggleTheme: () => this.toggleTheme(),
                        }}
                    >
                        <DrawerNav />
                    </NavigationContainer>
                </AsyncContext.Provider>
            </AnimatedSplash>
        );
    }
}
