import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AnimatedSplash from "react-native-animated-splash-screen";
import BottomNav from "./components/BottomNav";
import EStyleSheet from "react-native-extended-stylesheet";
import { nav_themes, themes, theme_constants } from "./util/style";
import DrawerNav from "./components/DrawerNav";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            theme: "dark",
        };
        this.buildStyles(this.state.theme);
    }

    async componentDidMount() {
        this.setState({ isLoaded: true });
    }

    buildStyles(theme) {
        EStyleSheet.build({
            ...themes[theme],
            ...theme_constants,
        });
    }

    /**
     * Sets the app theme.
     * @param {string} theme `"light"` or `"dark"`
     */
    async toggleTheme() {
        let newTheme = this.state.theme == "dark" ? "light" : "dark";
        // Build styles FIRST so they are ready when the re-render occurs
        this.buildStyles(newTheme);
        this.setState({ theme: newTheme });
        //await this.setAsync("theme", theme);
    }

    render() {
        return (
            <AnimatedSplash
                translucent={true}
                isLoaded={this.state.isLoaded}
                logoImage={require("./assets/logo.png")}
                backgroundColor={"#BB131A"}
                logoHeight={39}
                logoWidth={158}
                disableBackgroundImage={true}
            >
                <NavigationContainer
                    theme={{
                        ...nav_themes[this.state.theme],
                        toggleTheme: () => this.toggleTheme(),
                    }}
                >
                    <DrawerNav />
                </NavigationContainer>
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
