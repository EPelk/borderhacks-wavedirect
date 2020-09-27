import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { TextInput } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { global_styles, text_colors } from "../util/style";
import { login as getUser } from "../util/mock-api";
import { AsyncContext } from "../util/async-manager";

/**
 * Screen to log in to the app on first startup or after logging out
 */
const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const passwdIn = useRef(null);
    const loginBtn = useRef(null);
    const { colors } = useTheme();

    /**
     * Simulates user authentication and saves login data.
     * @param {*} context AsyncContext to provide necessary functions
     *                    from App.js
     */
    const login = async (context) => {
        const user = getUser(username, password);
        if (user != false) {
            // Simulate a login access token with the email address
            await context.setAsync("accessToken", user.Email);
            // Load user data into app state
            await context.fetchUser(user.Email);
        } else {
            alert(
                'Incorrect username or password.\n(The password is "password" for this prototype)'
            );
        }
    };

    return (
        <AsyncContext.Consumer>
            {(context) => (
                <View
                    style={[
                        global_styles.container,
                        { backgroundColor: colors.primary },
                    ]}
                >
                    {/* Set size and position such that nothing is blocked by
                        the keyboard. */}
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: EStyleSheet.value("$screenHeight") / 1.8,
                        }}
                    >
                        <Image
                            source={require("../assets/logo.png")}
                            style={{ marginBottom: 30 }}
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            onChangeText={setUsername}
                            returnKeyType="go"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            placeholder="Email address"
                            onSubmitEditing={() => passwdIn.current.focus()}
                        />
                        <TextInput
                            style={[styles.input, { marginTop: 10 }]}
                            autoCompleteType="password"
                            onChangeText={setPassword}
                            returnKeyType="done"
                            textContentType="password"
                            placeholder="Password"
                            secureTextEntry={true}
                            ref={passwdIn}
                            onSubmitEditing={() => login(context)}
                        />
                        <TouchableOpacity
                            onPress={() => login(context)}
                            style={{
                                marginTop: 10,
                                padding: 0,
                                backgroundColor: colors.notification,
                                width: "60%",
                                paddingVertical: 8,
                                alignItems: "center",
                                borderRadius: 5,
                            }}
                            ref={loginBtn}
                        >
                            <Text
                                style={[text_colors.onDark, global_styles.h3]}
                            >
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </AsyncContext.Consumer>
    );
};

/**
 * Stylesheet for the username and password input fields.
 */
const styles = EStyleSheet.create({
    input: {
        backgroundColor: "#ffffff",
        width: "60%",
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderRadius: 5,
    },
});

export default LoginScreen;
