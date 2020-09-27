import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { text_colors, global_styles, opacity } from "../util/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Icon } from "../util/ThemedComponents";
import { getStatusBarHeight } from "react-native-status-bar-height";
import * as Linking from "expo-linking";
import { AsyncContext } from "../util/async-manager";
import { fetchPackage } from "../util/mock-api";
import { colors } from "react-native-elements";

const EditEmail = (props) => {
    const [email, setEmail] = useState("");
    const emailRef = useRef(null);

    const submit = () => {
        props.context.setState((state) => ({
            user_data: { ...state.user_data, Email: email },
        }));
        alert(
            "Since the test data is hard-coded in the app, this change will reset when you log out or restart."
        );
        props.setChangingEmail(false);
    };

    return (
        <View
            style={[
                EStyleSheet.absoluteFill,
                {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    alignItems: "center",
                    justifyContent: "center",
                },
            ]}
        >
            <View
                style={[
                    styles.card,
                    {
                        width: "65%",
                        flexDirection: "column",
                        backgroundColor: EStyleSheet.value("$background"),
                    },
                ]}
            >
                <Text style={[global_styles.h3, opacity.high]}>
                    Enter a new email address:
                </Text>
                <TextInput
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCompleteType="email"
                    returnKeyType="done"
                    placeholder="Type here"
                    placeholderTextColor={
                        props.colors.text + EStyleSheet.value("$normalHex")
                    }
                    style={props.inputStyle}
                    ref={emailRef}
                    onSubmitEditing={submit}
                />
                <View style={{ flexDirection: "row", width: "100%" }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: EStyleSheet.value(
                                "$primaryVariant"
                            ),
                            flexGrow: 1,
                            paddingVertical: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "flex-end",
                            borderRadius: 5,
                        }}
                        onPress={() => {
                            props.setChangingEmail(false);
                        }}
                    >
                        <Text style={[text_colors.onLight, global_styles.h3]}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: 15 }}></View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: EStyleSheet.value(
                                props.dark ? "$secondaryVariant" : "$secondary"
                            ),
                            flexGrow: 1,
                            paddingVertical: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "flex-end",
                            borderRadius: 5,
                        }}
                        onPress={submit}
                    >
                        <Text
                            style={[
                                text_colors.onDark,
                                global_styles.h3,
                                props.dark ? opacity.high : {},
                            ]}
                        >
                            SUBMIT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const EditPhone = (props) => {
    const [phone, setPhone] = useState("");
    const phoneRef = useRef(null);

    const submit = () => {
        props.context.setState((state) => ({
            user_data: { ...state.user_data, Phone: phone },
        }));
        alert(
            "Since the test data is hard-coded in the app, this change will reset when you log out or restart."
        );
        props.setChangingPhone(false);
    };

    return (
        <View
            style={[
                EStyleSheet.absoluteFill,
                {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    alignItems: "center",
                    justifyContent: "center",
                },
            ]}
        >
            <View
                style={[
                    styles.card,
                    {
                        width: "65%",
                        flexDirection: "column",
                        backgroundColor: EStyleSheet.value("$background"),
                    },
                ]}
            >
                <Text style={[global_styles.h3, opacity.high]}>
                    Enter a new phone number:
                </Text>
                <TextInput
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    autoCompleteType="tel"
                    returnKeyType="done"
                    placeholder="Type here"
                    placeholderTextColor={
                        props.colors.text + EStyleSheet.value("$normalHex")
                    }
                    style={props.inputStyle}
                    ref={phoneRef}
                    onSubmitEditing={submit}
                />
                <View style={{ flexDirection: "row", width: "100%" }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: EStyleSheet.value(
                                "$primaryVariant"
                            ),
                            flexGrow: 1,
                            paddingVertical: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "flex-end",
                            borderRadius: 5,
                        }}
                        onPress={() => {
                            props.setChangingPhone(false);
                        }}
                    >
                        <Text style={[text_colors.onLight, global_styles.h3]}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: 15 }}></View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: EStyleSheet.value(
                                props.dark ? "$secondaryVariant" : "$secondary"
                            ),
                            flexGrow: 1,
                            paddingVertical: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "flex-end",
                            borderRadius: 5,
                        }}
                        onPress={submit}
                    >
                        <Text
                            style={[
                                text_colors.onDark,
                                global_styles.h3,
                                props.dark ? opacity.high : {},
                            ]}
                        >
                            SUBMIT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const AccountScreen = () => {
    const [changingEmail, setChangingEmail] = useState(false);
    const [changingPhone, setChangingPhone] = useState(false);
    const { dark, colors, toggleTheme } = useTheme();
    const inputStyle = {
        backgroundColor: colors.card,
        color: colors.text + EStyleSheet.value("$highHex"),
        fontSize: 16,
        flexGrow: 1,
        flexShrink: 1,
        width: "100%",
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderRadius: 5,
    };
    return (
        <View style={global_styles.container}>
            <AsyncContext.Consumer>
                {(context) => {
                    const user = context.state.user_data;
                    const pkg = fetchPackage(user.Package_id);
                    return (
                        <>
                            <ScrollView>
                                <View
                                    style={{
                                        alignItems: "center",
                                        width: " 100%",
                                        padding: 20,
                                        paddingTop: 20 + getStatusBarHeight(),
                                        backgroundColor: EStyleSheet.value(
                                            "$secondary"
                                        ),
                                    }}
                                >
                                    <Icon
                                        name="account-circle"
                                        size={80}
                                        style={[
                                            text_colors.onDark,
                                            opacity.high,
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            text_colors.onDark,
                                            opacity.high,
                                            global_styles.h1,
                                        ]}
                                    >
                                        {user.First_Name + " " + user.Last_Name}
                                    </Text>
                                    <Text
                                        style={[
                                            text_colors.onDark,
                                            opacity.med,
                                            global_styles.h3,
                                        ]}
                                    >
                                        Account #{user.Account_number}
                                    </Text>
                                </View>
                                <View style={{ flexGrow: 1, padding: 15 }}>
                                    <Text
                                        style={[global_styles.h2, opacity.high]}
                                    >
                                        Account Information
                                    </Text>
                                    <View style={styles.card}>
                                        <Icon
                                            name="email"
                                            size={24}
                                            style={styles.cardIcon}
                                        />
                                        <Text
                                            style={[
                                                global_styles.h3,
                                                opacity.med,
                                                { flexGrow: 1 },
                                            ]}
                                        >
                                            {user.Email}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                setChangingEmail(true)
                                            }
                                        >
                                            <Icon
                                                name="edit"
                                                size={24}
                                                style={[
                                                    styles.cardIcon,
                                                    {
                                                        marginLeft: 15,
                                                        marginRight: 0,
                                                    },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.card}>
                                        <Icon
                                            name="phone"
                                            size={24}
                                            style={styles.cardIcon}
                                        />
                                        <Text
                                            style={[
                                                global_styles.h3,
                                                opacity.med,
                                                { flexGrow: 1 },
                                            ]}
                                        >
                                            {user.Phone}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() =>
                                                setChangingPhone(true)
                                            }
                                        >
                                            <Icon
                                                name="edit"
                                                size={24}
                                                style={[
                                                    styles.cardIcon,
                                                    {
                                                        marginLeft: 15,
                                                        marginRight: 0,
                                                    },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.card}>
                                        <Icon
                                            name="my-location"
                                            size={24}
                                            style={styles.cardIcon}
                                        />
                                        <Text
                                            style={[
                                                global_styles.h3,
                                                opacity.med,
                                            ]}
                                        >
                                            {user.Address +
                                                "\n" +
                                                user.Town +
                                                ", " +
                                                user.Province +
                                                ", " +
                                                user.Country}
                                        </Text>
                                    </View>
                                    <Text
                                        style={[
                                            global_styles.h2,
                                            opacity.high,
                                            { marginTop: 15 },
                                        ]}
                                    >
                                        My Internet Package
                                    </Text>
                                    <View
                                        style={[
                                            styles.card,
                                            {
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                global_styles.h3,
                                                opacity.high,
                                            ]}
                                        >
                                            {pkg.Name}
                                        </Text>
                                        <View style={styles.cardRow}>
                                            <Icon
                                                name="data-usage"
                                                size={24}
                                                style={styles.cardIcon}
                                            />
                                            <Text
                                                style={[
                                                    global_styles.h3,
                                                    opacity.med,
                                                ]}
                                            >
                                                {pkg.Data_Limit}
                                            </Text>
                                        </View>
                                        <View style={styles.cardRow}>
                                            <MaterialCommunityIcons
                                                name="arrow-down-circle-outline"
                                                size={24}
                                                style={[
                                                    styles.cardIcon,
                                                    text_colors[
                                                        dark
                                                            ? "onDark"
                                                            : "onLight"
                                                    ],
                                                    opacity.med,
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    global_styles.h3,
                                                    opacity.med,
                                                ]}
                                            >
                                                {pkg.Download_speed} Mbps
                                                Download
                                            </Text>
                                        </View>
                                        <View style={styles.cardRow}>
                                            <MaterialCommunityIcons
                                                name="arrow-up-circle-outline"
                                                size={24}
                                                style={[
                                                    styles.cardIcon,
                                                    text_colors[
                                                        dark
                                                            ? "onDark"
                                                            : "onLight"
                                                    ],
                                                    opacity.med,
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    global_styles.h3,
                                                    opacity.med,
                                                ]}
                                            >
                                                {pkg.Upload_speed} Mbps Upload
                                            </Text>
                                        </View>
                                    </View>
                                    <Text
                                        style={[
                                            global_styles.h2,
                                            opacity.high,
                                            { marginTop: 15 },
                                        ]}
                                    >
                                        Contact Sales
                                    </Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.card,
                                            {
                                                backgroundColor: EStyleSheet.value(
                                                    "$secondaryVariant"
                                                ),
                                            },
                                        ]}
                                        onPress={() =>
                                            Linking.openURL(
                                                "mailto://sales@wavedirect.net"
                                            )
                                        }
                                    >
                                        <Icon
                                            name="email"
                                            size={24}
                                            style={[
                                                styles.cardIcon,
                                                text_colors.onDark,
                                                opacity.high,
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                global_styles.h3,
                                                opacity.high,
                                                text_colors.onDark,
                                            ]}
                                        >
                                            Email sales@wavedirect.net
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.card,
                                            {
                                                backgroundColor: EStyleSheet.value(
                                                    "$secondary"
                                                ),
                                            },
                                        ]}
                                        onPress={() =>
                                            Linking.openURL("tel://8558449283")
                                        }
                                    >
                                        <Icon
                                            name="phone"
                                            size={24}
                                            style={[
                                                text_colors.onDark,
                                                styles.cardIcon,
                                                { opacity: 1 },
                                            ]}
                                        />
                                        <Text
                                            style={[
                                                global_styles.h3,
                                                text_colors.onDark,
                                            ]}
                                        >
                                            Call (855) 844-9283
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                            {changingEmail ? (
                                <EditEmail
                                    setChangingEmail={setChangingEmail}
                                    dark={dark}
                                    inputStyle={inputStyle}
                                    colors={colors}
                                    context={context}
                                />
                            ) : null}
                            {changingPhone ? (
                                <EditPhone
                                    setChangingPhone={setChangingPhone}
                                    dark={dark}
                                    inputStyle={inputStyle}
                                    colors={colors}
                                    context={context}
                                />
                            ) : null}
                        </>
                    );
                }}
            </AsyncContext.Consumer>
        </View>
    );
};

const styles = EStyleSheet.create({
    card: {
        borderRadius: 5,
        marginTop: 15,
        padding: 15,
        backgroundColor: "$surface",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        elevation: 1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
    },
    cardIcon: {
        ...opacity.med,
        marginRight: 15,
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 10,
    },
});

export default AccountScreen;
