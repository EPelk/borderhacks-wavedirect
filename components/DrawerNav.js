import React from "react";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import { global_styles, opacity, text_colors } from "../util/style";
import { Icon, Text } from "../util/ThemedComponents";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "./BottomNav";
import { Image, StatusBar, View } from "react-native";
import * as Linking from "expo-linking";
import LoginScreen from "../screens/LoginScreen";
import { AsyncContext } from "../util/async-manager";
import ReferralScreen from "../screens/ReferralScreen";

const DrawerContent = (props) => {
    const { dark, toggleTheme } = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor="#0000"
                    barStyle={dark ? "light-content" : "dark-content"}
                />
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons
                            name="file-document-box"
                            size={24}
                            style={[
                                text_colors[dark ? "onDark" : "onLight"],
                                opacity.high,
                            ]}
                        />
                    )}
                    label={() => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={opacity.high}>Terms of Service</Text>
                            <Icon
                                name="launch"
                                size={24}
                                style={opacity.high}
                            />
                        </View>
                    )}
                    onPress={() =>
                        Linking.openURL(
                            "https://www.wavedirect.net/terms-of-service"
                        )
                    }
                />
                <DrawerItem
                    icon={() => (
                        <Icon name="lock" size={24} style={opacity.high} />
                    )}
                    label={() => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={opacity.high}>Privacy Policy</Text>
                            <Icon
                                name="launch"
                                size={24}
                                style={opacity.high}
                            />
                        </View>
                    )}
                    onPress={() =>
                        Linking.openURL(
                            "https://www.wavedirect.net/privacy-policy"
                        )
                    }
                />
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons
                            name="speedometer"
                            size={24}
                            style={[
                                text_colors[dark ? "onDark" : "onLight"],
                                opacity.high,
                            ]}
                        />
                    )}
                    label={() => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={opacity.high}>Speed Test</Text>
                            <Icon
                                name="launch"
                                size={24}
                                style={opacity.high}
                            />
                        </View>
                    )}
                    onPress={() =>
                        Linking.openURL("https://speedtest.wdirect.net/")
                    }
                />
                <DrawerItem
                    icon={() => (
                        <Icon
                            name="help-outline"
                            size={24}
                            style={opacity.high}
                        />
                    )}
                    label={() => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={opacity.high}>Tutorials</Text>
                            <Icon
                                name="launch"
                                size={24}
                                style={opacity.high}
                            />
                        </View>
                    )}
                    onPress={() =>
                        Linking.openURL(
                            "https://www.wavedirect.net/support/self-help-tutorials"
                        )
                    }
                />
                <DrawerItem
                    icon={() => (
                        <Icon
                            name="people"
                            size={24}
                            style={
                                opacity[
                                    props.context.state.user_data
                                        ? "high"
                                        : "low"
                                ]
                            }
                        />
                    )}
                    label={() => (
                        <Text
                            style={
                                opacity[
                                    props.context.state.user_data
                                        ? "high"
                                        : "low"
                                ]
                            }
                        >
                            Refer a Friend
                        </Text>
                    )}
                    onPress={() => {
                        if (!props.context.state.accessToken) {
                            return;
                        }
                        props.navigation.navigate("ReferScreen");
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons
                            name="theme-light-dark"
                            size={24}
                            style={[
                                text_colors[dark ? "onDark" : "onLight"],
                                opacity.high,
                            ]}
                        />
                    )}
                    label={() => <Text style={opacity.high}>Toggle Theme</Text>}
                    onPress={toggleTheme}
                />
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons
                            name="logout"
                            size={24}
                            style={[
                                text_colors[dark ? "onDark" : "onLight"],
                                opacity[
                                    props.context.state.user_data
                                        ? "high"
                                        : "low"
                                ],
                            ]}
                        />
                    )}
                    label={() => (
                        <Text
                            style={
                                opacity[
                                    props.context.state.user_data
                                        ? "high"
                                        : "low"
                                ]
                            }
                        >
                            Log Out
                        </Text>
                    )}
                    onPress={() => {
                        if (!props.context.state.accessToken) {
                            return;
                        }
                        props.context.setAsync("accessToken", 0);
                        props.context.setState({ user_data: undefined });
                        props.navigation.closeDrawer();
                    }}
                />
            </DrawerContentScrollView>
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    padding: 15,
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Image
                    source={
                        dark
                            ? require("../assets/logo.png")
                            : require("../assets/logo-inverted.png")
                    }
                    style={{ marginBottom: 30 }}
                />
                <Text style={{ textAlign: "center" }}>
                    © 2020 Your Organization{"\n"}Version 1.0.0
                </Text>
            </View>
        </View>
    );
};

const DrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <AsyncContext.Consumer>
            {(context) => (
                <Drawer.Navigator
                    initialRoute={context.state.user_data ? "Home" : "Login"}
                    backBehavior="initialRoute"
                    drawerContent={(props) => (
                        <DrawerContent {...props} context={context} />
                    )}
                    sceneContainerStyle={global_styles.container}
                >
                    {context.state.user_data ? (
                        <>
                            <Drawer.Screen name="Home" component={BottomNav} />
                            <Drawer.Screen
                                name="ReferScreen"
                                component={ReferralScreen}
                            />
                        </>
                    ) : (
                        <Drawer.Screen name="Login">
                            {(props) => <LoginScreen {...props} />}
                        </Drawer.Screen>
                    )}
                </Drawer.Navigator>
            )}
        </AsyncContext.Consumer>
    );
};

export default DrawerNav;
