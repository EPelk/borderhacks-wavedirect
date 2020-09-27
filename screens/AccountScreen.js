import { useTheme } from "@react-navigation/native";
import React from "react";
import { StatusBar, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { text_colors, global_styles, opacity } from "../util/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, Icon } from "../util/ThemedComponents";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AsyncContext } from "../util/async-manager";
import { fetchPackage } from "../util/mock-api";

const AccountScreen = () => {
    const { dark, colors, toggleTheme } = useTheme();
    return (
        <View style={global_styles.container}>
            <StatusBar
                animated={true}
                hidden={false}
                backgroundColor="#0000"
                barStyle="auto"
            />
            <ScrollView>
                <AsyncContext.Consumer>
                    {(context) => {
                        const user = context.state.user_data;
                        const pkg = fetchPackage(user.Package_id);
                        return (
                            <>
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
                                            ]}
                                        >
                                            {user.Email}
                                        </Text>
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
                                            ]}
                                        >
                                            {user.Phone}
                                        </Text>
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
                                </View>
                            </>
                        );
                    }}
                </AsyncContext.Consumer>
            </ScrollView>
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
