import React from "react";
import { Text as PlainText } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { text_colors } from "./style";

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

export const Icon = (props) => {
    const { dark } = useTheme();
    return (
        <MaterialIcons
            {...props}
            style={[text_colors[dark ? "onDark" : "onLight"], props.style]}
        />
    );
};
