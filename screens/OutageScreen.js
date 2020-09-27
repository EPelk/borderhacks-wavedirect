// Screen providing an outage map and associated functionality

import { useTheme } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import MapView, { Circle, Marker } from "react-native-maps";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AsyncContext } from "../util/async-manager";
import { global_styles, opacity, text_colors } from "../util/style";
import { Text } from "../util/ThemedComponents";

const OutageScreen = () => {
    const { dark, colors } = useTheme();
    return (
        <AsyncContext.Consumer>
            {(context) => {
                const user = context.state.user_data;
                const ap = context.state.access_points;
                const lastUpdated = context.state.access_point_refresh_time;
                let currentAP = null;
                // Get the current AP from the list of all APs
                ap.some((item) => {
                    item.ID == user.AP_id
                        ? (() => {
                              currentAP = item;
                              return true;
                          })()
                        : {};
                    return false;
                });

                return (
                    <View style={global_styles.container}>
                        {/* Textual information and refresh button */}
                        <View
                            style={{
                                padding: 15,
                                paddingTop: 15 + getStatusBarHeight(),
                            }}
                        >
                            {/* Current AP */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <Text style={[global_styles.h2, opacity.med]}>
                                    Current Access Point:
                                </Text>
                                <Text style={[global_styles.h1, opacity.high]}>
                                    {currentAP.Name}
                                </Text>
                            </View>
                            {/* Current Connection Status */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: 10,
                                }}
                            >
                                <Text style={[global_styles.h2, opacity.med]}>
                                    Connection Status:
                                </Text>
                                <Text
                                    style={[
                                        global_styles.h1,
                                        opacity.high,
                                        {
                                            color:
                                                // Green if UP, red if DOWN
                                                currentAP.Status == "up"
                                                    ? colors.notification
                                                    : colors.primary,
                                        },
                                    ]}
                                >
                                    {currentAP.Status.toUpperCase()}
                                </Text>
                            </View>
                            {/* Refresh the map/information */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: 10,
                                }}
                            >
                                {/* This button updates all AP information via
                                    the AsyncContext */}
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: EStyleSheet.value(
                                            // Darker shade in dark mode
                                            // Lighter shade in light mode
                                            dark
                                                ? "$secondaryVariant"
                                                : "$secondary"
                                        ),
                                        width: "45%",
                                        height: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 5,
                                    }}
                                    onPress={context.updateAPStatus}
                                >
                                    <Text
                                        style={[
                                            text_colors.onDark,
                                            global_styles.h2,
                                            // On light green, full opacity pops best
                                            // On dark green, .87 opacity looks good
                                            dark ? opacity.high : {},
                                        ]}
                                    >
                                        Refresh Map
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={[
                                        global_styles.h3,
                                        opacity.med,
                                        {
                                            width: "55%",
                                            paddingLeft: 15,
                                            textAlign: "right",
                                        },
                                    ]}
                                >
                                    Last updated at {lastUpdated}
                                </Text>
                            </View>
                        </View>
                        {/* Outage map */}
                        <MapView
                            initialRegion={{
                                // Coordinates pulled from online coverage map
                                latitude: 42.24556624862553,
                                longitude: -82.4607114,
                                latitudeDelta: 1,
                                longitudeDelta: 1.3,
                            }}
                            mapType="mutedStandard"
                            customMapStyle={dark ? darkMapStyle : []}
                            style={{ width: "100%", flexGrow: 1 }}
                        >
                            {
                                // For each AP, place a pin on its location and
                                // draw a circle around its coverage area
                                ap.map((item) => {
                                    return (
                                        <>
                                            <Circle
                                                key={"circle" + item.ID}
                                                center={{
                                                    latitude: item.Latitude,
                                                    longitude: item.Longitude,
                                                }}
                                                // Radius in meters
                                                radius={item.Radius * 1000}
                                                // UP is green, DOWN is red
                                                // Low opacity so things stay visible
                                                fillColor={
                                                    item.Status == "up"
                                                        ? colors.notification +
                                                          EStyleSheet.value(
                                                              "$disabledHex"
                                                          )
                                                        : colors.primary +
                                                          EStyleSheet.value(
                                                              "$disabledHex"
                                                          )
                                                }
                                            />
                                            <Marker
                                                title={item.Name}
                                                key={"marker" + item.ID}
                                                description={
                                                    "Current Status: " +
                                                    item.Status.toUpperCase()
                                                }
                                                coordinate={{
                                                    latitude: item.Latitude,
                                                    longitude: item.Longitude,
                                                }}
                                                pinColor={
                                                    item.Status == "up"
                                                        ? "green"
                                                        : "red"
                                                }
                                                // Only the current AP is fully opaque
                                                opacity={
                                                    item.ID == user.AP_id
                                                        ? 1
                                                        : 0.45
                                                }
                                                isPreselected={
                                                    item.ID == user.AP_id
                                                }
                                            />
                                        </>
                                    );
                                })
                            }
                        </MapView>
                    </View>
                );
            }}
        </AsyncContext.Consumer>
    );
};

/**
 * JSON stylesheet to color the map in dark mode.
 * Generated using Google's map tools.
 */
const darkMapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#242f3e",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#746855",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#242f3e",
            },
        ],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#d59563",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#d59563",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#263c3f",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#6b9a76",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#38414e",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#212a37",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9ca5b3",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#746855",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#1f2835",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#f3d19c",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#2f3948",
            },
        ],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#d59563",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#17263c",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#515c6d",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#17263c",
            },
        ],
    },
];

export default OutageScreen;
