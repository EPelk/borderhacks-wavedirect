// Refer a friend form. Accessed from the nav drawer.

import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AsyncContext } from "../util/async-manager";
import { global_styles, opacity, text_colors } from "../util/style";
import { Icon, Text } from "../util/ThemedComponents";

/**
 * Refer a friend form.
 * @param {*} props Contains a navigation object passed by the drawer navigator
 */
const ReferralScreen = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const emailRef = useRef(null);

    const { dark, colors } = useTheme();

    /**
     * Common styles for text input fields
     */
    const inputStyle = {
        backgroundColor: colors.card,
        color: colors.text + EStyleSheet.value("$highHex"),
        fontSize: 16,
        marginLeft: 15,
        flexGrow: 1,
        flexShrink: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderRadius: 5,
    };

    /**
     * Simulate form submission/friend referral.
     * This function will present an alert box with the entered
     * information before clearing the form.
     */
    const submitForm = () => {
        alert(
            "This is a method stub. Submitting refer a friend entry for:\n" +
                firstName +
                " " +
                lastName +
                "\n" +
                phoneNumber +
                "\n" +
                email
        );
        firstNameRef.current.clear();
        lastNameRef.current.clear();
        phoneNumberRef.current.clear();
        emailRef.current.clear();
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
    };

    return (
        <View style={global_styles.container}>
            {/* Page header */}
            <View
                style={{
                    width: "100%",
                    padding: 15,
                    paddingTop: 15 + getStatusBarHeight(),
                    backgroundColor: colors.primary,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <AsyncContext.Consumer>
                    {(context) => (
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.navigate(
                                    // In theory, this page cannot be accessed when the
                                    // user is logged out, but better safe than sorry.
                                    context.state.user_data ? "Home" : "Login"
                                )
                            }
                        >
                            <Icon
                                name="arrow-back"
                                size={34}
                                style={[text_colors.onDark, opacity.high]}
                            />
                        </TouchableOpacity>
                    )}
                </AsyncContext.Consumer>
                <Text
                    style={[global_styles.h1, text_colors.onDark, opacity.high]}
                >
                    Refer a Friend
                </Text>
                {/* Invisible icon acts as a spacer to offset the actual icon
                    so that the `space-between` above centers the title on the
                    screen */}
                <Icon name="arrow-back" size={34} style={{ opacity: 0 }} />
            </View>
            {/* Refer a Friend form */}
            <View style={{ padding: 15, flexGrow: 1 }}>
                <Text style={[opacity.high, global_styles.h3]}>
                    Fill out the form below to refer a friend to WaveDirect. If
                    they sign up, both they and you will recieve a coupon code
                    for $10 off!
                </Text>
                {/* First name input */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                        marginBottom: 10,
                        width: "100%",
                    }}
                >
                    <Text style={[global_styles.h3, opacity.high]}>
                        First Name:
                    </Text>
                    <TextInput
                        onChangeText={setFirstName}
                        returnKeyType="go"
                        textContentType="givenName"
                        autoCompleteType="name"
                        placeholder="Type here"
                        placeholderTextColor={
                            colors.text + EStyleSheet.value("$normalHex")
                        }
                        style={inputStyle}
                        ref={firstNameRef}
                        onSubmitEditing={() => lastNameRef.current.focus()}
                    />
                </View>
                {/* Last name input */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        width: "100%",
                    }}
                >
                    <Text style={[global_styles.h3, opacity.high]}>
                        Last Name:
                    </Text>
                    <TextInput
                        onChangeText={setLastName}
                        returnKeyType="go"
                        textContentType="familyName"
                        autoCompleteType="name"
                        placeholder="Type here"
                        placeholderTextColor={
                            colors.text + EStyleSheet.value("$normalHex")
                        }
                        style={inputStyle}
                        ref={lastNameRef}
                        onSubmitEditing={() => phoneNumberRef.current.focus()}
                    />
                </View>
                {/* Phone number input */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        width: "100%",
                    }}
                >
                    <Text style={[global_styles.h3, opacity.high]}>
                        Phone Number:
                    </Text>
                    <TextInput
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        autoCompleteType="tel"
                        returnKeyType="go"
                        placeholder="Type here"
                        placeholderTextColor={
                            colors.text + EStyleSheet.value("$normalHex")
                        }
                        style={inputStyle}
                        ref={phoneNumberRef}
                        onSubmitEditing={() => emailRef.current.focus()}
                    />
                </View>
                {/* Email address input */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        width: "100%",
                    }}
                >
                    <Text style={[global_styles.h3, opacity.high]}>
                        Email Address:
                    </Text>
                    <TextInput
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoCompleteType="email"
                        returnKeyType="done"
                        placeholder="Type here"
                        placeholderTextColor={
                            colors.text + EStyleSheet.value("$normalHex")
                        }
                        style={inputStyle}
                        ref={emailRef}
                        onSubmitEditing={submitForm}
                    />
                </View>
                {/* Submit button */}
                <TouchableOpacity
                    style={{
                        // Change shade based on theme
                        backgroundColor: EStyleSheet.value(
                            dark ? "$secondaryVariant" : "$secondary"
                        ),
                        width: 100,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "flex-end",
                        borderRadius: 5,
                    }}
                    onPress={submitForm}
                >
                    <Text
                        style={[
                            text_colors.onDark,
                            global_styles.h3,
                            // Tweak opacity (full vs. not-quite-full)
                            // based on theme/button shade
                            dark ? opacity.high : {},
                        ]}
                    >
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        //
    );
};

export default ReferralScreen;
