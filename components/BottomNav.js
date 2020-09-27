import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountScreen from "../screens/AccountScreen";
import OutageScreen from "../screens/OutageScreen";
import SupportScreen from "../screens/SupportScreen";
// Icon from ThemedComponents does not properly change colors when unfocused
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";

const BottomNav = () => {
    const { dark, colors } = useTheme();
    const Tab = createMaterialBottomTabNavigator();
    return (
        <>
            <StatusBar
                animated={true}
                hidden={false}
                backgroundColor={colors.card}
                barStyle={dark ? "light-conent" : "dark-content"}
            />
            <Tab.Navigator
                initialRouteName="Account"
                shifting={true}
                barStyle={{ backgroundColor: colors.primary }}
            >
                <Tab.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{
                        tabBarLabel: "My Account",
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons
                                name="account-circle"
                                size={26}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Outage Map"
                    component={OutageScreen}
                    options={{
                        tabBarLabel: "Outage Map",
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="map" size={26} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Support"
                    component={SupportScreen}
                    options={{
                        tabBarLabel: "Live Support",
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons
                                name="chat"
                                size={26}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export default BottomNav;
