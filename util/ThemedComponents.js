// Utility code to handle theme changes on some common Components.
// All changes that these Components make can be overriden by providing
// style props in your code.

import React from "react";
import { Text as PlainText } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { text_colors } from "./style";

/**
 * Wrapper for the standard `Text` component that changes color based on the theme
 * @param {*} props
 */
export const Text = (props) => {
    const { dark } = useTheme();
    return (
        <PlainText
            {...props}
            style={[text_colors[dark ? "onDark" : "onLight"], props.style]}
        >
            {props.children}
        </PlainText>
    );
};

/**
 * Wrapper for the Expo `MaterialIcons` component that changes color based on the theme.
 * Only compatible with the MaterialIcons icon set.
 * @param {*} props
 */
export const Icon = (props) => {
    const { dark } = useTheme();
    return (
        <MaterialIcons
            {...props}
            style={[text_colors[dark ? "onDark" : "onLight"], props.style]}
        />
    );
};
