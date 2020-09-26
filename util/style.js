import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export const themes = {
    light: {
        $theme: "light",

        // Component colors
        $background: "#fafafa",
        $surface: "#ffffff",
        $error: "#b00020",
        $border: "#00000013",

        // Text/icon colors
        $onBackground: "#000000",
        $onSurface: "#000000",
        $onPrimary: "#000000",
        $onSecondary: "#ffffff",
        $onError: "#ffffff",
    },
    dark: {
        $theme: "dark",

        // Component colors
        $background: "#121212",
        $surface: "#1e1e1e",
        $error: "#cf6679",
        $border: "#ffffff13",

        // Text/icon colors
        $onBackground: "#ffffff",
        $onSurface: "#ffffff",
        $onPrimary: "#000000",
        $onSecondary: "#ffffff",
        $onError: "#000000",
    },
};

export const nav_themes = {
    light: {
        dark: false,
        colors: {
            primary: "#bb131a",
            background: "#fafafa",
            card: "#ffffff",
            text: "#000000",
            border: "#00000013",
            notification: "#43a047",
            error: "#b00020",
        },
    },
    dark: {
        dark: true,
        colors: {
            primary: "#bb131a",
            background: "#121212",
            card: "#1e1e1e",
            text: "#ffffff",
            border: "#ffffff13",
            notification: "#43a047",
            error: "#cf6679",
        },
    },
};

export const theme_constants = {
    // Colors
    $primary: "#bb131a",
    $primaryVariant: "#f9a03f",
    $secondary: "#43a047",
    $secondaryVariant: "#1e4820",
    $shadowColor: "#000000",
    $onLight: "#000000",
    $onDark: "#ffffff",

    // Text/icon opacity values
    $highEmphasis: 0.87,
    $highHex: "de",
    $normalEmphasis: 0.6,
    $normalHex: "99",
    $disabled: 0.38,
    $disabledHex: "61",

    // Spacing
    $sectionPad: 10,
    $screenWidth: Dimensions.get("window").width,
    $screenHeight: Dimensions.get("window").height,
};

export const text_colors = EStyleSheet.create({
    onLight: {
        color: "$onLight",
    },
    onDark: {
        color: "$onDark",
    },
});

export const opacity = EStyleSheet.create({
    high: {
        opacity: "$highEmphasis",
    },
    med: {
        opacity: "$normalEmphasis",
    },
    low: {
        opacity: "$disabled",
    },
});

export const global_styles = EStyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    h1: {
        fontSize: 30,
        fontWeight: "500",
    },
    h2: {
        fontSize: 24,
        fontWeight: "500",
    },
    h3: {
        fontSize: 18,
    },
    h4: {
        fontSize: 15,
    },
});
