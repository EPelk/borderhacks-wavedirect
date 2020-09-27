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
import { StatusBar, View } from "react-native";
import LoginScreen from "../screens/LoginScreen";
import { AsyncContext } from "../util/async-manager";

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
                            name="theme-light-dark"
                            size={24}
                            style={[
                                text_colors[dark ? "onDark" : "onLight"],
                                opacity.high,
                            ]}
                        />
                    )}
                    label={() => <Text style={opacity.high}>Toggle theme</Text>}
                    onPress={toggleTheme}
                />
                <DrawerItem
                    icon={() => (
                        <Icon name="people" size={24} style={opacity.high} />
                    )}
                    label={() => (
                        <Text style={opacity.high}>Refer a Friend</Text>
                    )}
                    onPress={toggleTheme}
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
                        <Text style={opacity.high}>Terms of Service</Text>
                    )}
                    onPress={toggleTheme}
                />
                <DrawerItem
                    icon={() => (
                        <Icon name="lock" size={24} style={opacity.high} />
                    )}
                    label={() => (
                        <Text style={opacity.high}>Privacy Policy</Text>
                    )}
                    onPress={toggleTheme}
                />
            </DrawerContentScrollView>
            <Text
                style={{
                    position: "absolute",
                    bottom: 0,
                    padding: 15,
                }}
            >
                © 2020 Your Organization{"\n"}Version 1.0.0
            </Text>
        </View>
    );
};

const DrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <AsyncContext.Consumer>
            {(context) => (
                <Drawer.Navigator
                    initialRoute="Login"
                    backBehavior="initialRoute"
                    drawerContent={(props) => <DrawerContent {...props} />}
                    sceneContainerStyle={global_styles.container}
                >
                    {context.state.user_data ? (
                        <>
                            <Drawer.Screen name="Home" component={BottomNav} />
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
