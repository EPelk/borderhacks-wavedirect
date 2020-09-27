import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AnimatedSplash from "react-native-animated-splash-screen";
import BottomNav from "./components/BottomNav";
import EStyleSheet from "react-native-extended-stylesheet";
import { nav_themes, themes, theme_constants } from "./util/style";
import DrawerNav from "./components/DrawerNav";
import { AsyncContext, readManyValues, setValue } from "./util/async-manager";
import { fetchAPStatus, fetchFromAccessToken } from "./util/mock-api";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loaded: false,
            splash_timeout: false,
            theme: "light",
            user_data: undefined,
            accessToken: undefined,
            access_points: undefined,
            access_point_refresh: undefined,
            access_point_refresh_time: undefined,
        };

        /**
         * Sets a value in AsyncStorage and ensures everything updates.
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

        this.fetchUser = async (token = this.state.accessToken) => {
            if (token != undefined) {
                this.setState({
                    user_data: fetchFromAccessToken(this.state.accessToken),
                });
            }
        };

        /**
         * Sets the app theme.
         * @param {string} theme `"light"` or `"dark"`
         */
        this.toggleTheme = async () => {
            let newTheme = this.state.theme == "dark" ? "light" : "dark";
            // Build styles FIRST so they are ready when the re-render occurs
            this.buildStyles(newTheme);
            this.setState({ theme: newTheme });
            await this.setAsync("theme", newTheme);
        };

        this.updateAPStatus = async () => {
            const timestamp = new Date().toLocaleTimeString();
            this.setState({
                access_points: fetchAPStatus(),
                access_point_refresh_time: timestamp,
            });
        };

        this.buildStyles(this.state.theme);

        this.init();
        setTimeout(() => {
            this.setState({ splash_timeout: true });
        }, 2000);
    }

    async init() {
        await this.loadAsync();
        await this.loadFromAPI();
        this.buildStyles(this.state.theme);
        this.setState({ is_loaded: true });
    }

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

    async loadFromAPI() {
        // Fetch access point data.
        // If an access token is defined, fetch the corresponding user data.
        await this.fetchUser();
        await this.updateAPStatus();
        // Update access point data every minute
        this.setState({
            access_point_refresh: setInterval(() => {
                this.updateAPStatus();
            }, 60000),
        });
    }

    async componentDidMount() {
        this.setState({ is_loaded: true });
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
