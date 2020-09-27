import React from "react";
import { View, FlatList, TextInput, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AsyncContext } from "../util/async-manager";
import { replyToMessage } from "../util/mock-api";
import { global_styles, opacity, text_colors } from "../util/style";
import { Icon, Text } from "../util/ThemedComponents";

/**
 * Screen providing a live chat feature for tech support.
 * The setState method of class components is needed to
 * properly update the messages list.
 */
export default class SupportScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msgInput: "",
            // Running log of all chat messages
            messages: [],
        };
        this.msgRef = React.createRef();

        /**
         * Add messages to the log and handle chat simulation.
         */
        this.sendMessage = () => {
            // Append new messages to the front of the
            // log so they appear first (i.e. lowest) in the chat.
            this.setState((state) => ({
                messages: [
                    {
                        sender: "local",
                        message: state.msgInput,
                        key: "" + state.messages.length,
                    },
                    ...state.messages,
                ],
            }));
            // Simulate a real chat with randomly generated and
            // delayed replies.
            replyToMessage(this.state.msgInput).then((data) => {
                this.setState((state) => ({
                    messages: [
                        {
                            sender: "remote",
                            message: data,
                            key: "" + state.messages.length,
                        },
                        ...state.messages,
                    ],
                }));
            });
            // Clear input for the next message
            this.msgRef.current.clear();
            this.setState({ msgInput: "" });
        };
    }
    render() {
        return (
            // AsyncContext is used to trigger re-renders when the theme changes.
            // This is because class components cannot use `useTheme`.
            <AsyncContext.Consumer>
                {() => (
                    <View style={global_styles.container}>
                        {/* Chat log grows and shrinks to accommodate message input */}
                        <View
                            style={{
                                width: "100%",
                                flexGrow: 1,
                                flexShrink: 1,
                            }}
                        >
                            <FlatList
                                // Put the beginning of the list at the bottom
                                inverted={true}
                                ListFooterComponent={
                                    <Text
                                        style={[
                                            global_styles.h2,
                                            opacity.low,
                                            {
                                                width: "100%",
                                                textAlign: "center",
                                                paddingHorizontal: 15,
                                                paddingTop:
                                                    getStatusBarHeight() + 15,
                                            },
                                        ]}
                                    >
                                        Send a message to open a chat with a
                                        customer service rep.
                                    </Text>
                                }
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            borderRadius: 5,
                                            backgroundColor: EStyleSheet.value(
                                                "$surface"
                                            ),
                                            margin: 15,
                                            marginBottom: 0,
                                            padding: 10,
                                            width: "60%",
                                            alignSelf:
                                                // Put user's messages on the right
                                                // and others on the left
                                                item.sender == "local"
                                                    ? "flex-end"
                                                    : "flex-start",
                                            backgroundColor: EStyleSheet.value(
                                                item.sender == "local"
                                                    ? "$secondary"
                                                    : "$secondaryVariant"
                                            ),
                                        }}
                                    >
                                        <Text
                                            style={[
                                                global_styles.h3,
                                                text_colors[
                                                    item.sender == "local"
                                                        ? "onLight"
                                                        : "onDark"
                                                ],
                                                {
                                                    textAlign:
                                                        item.sender == "local"
                                                            ? "right"
                                                            : "left",
                                                },
                                            ]}
                                        >
                                            {item.message}
                                        </Text>
                                    </View>
                                )}
                                data={this.state.messages}
                            />
                        </View>
                        {/* Message input area */}
                        <View
                            style={{
                                maxHeight:
                                    EStyleSheet.value("$screenHeight") * 0.2,
                                minHeight: 70,
                                flexDirection: "row",
                                alignItems: "flex-end",
                                width: "100%",
                            }}
                        >
                            <TextInput
                                multiline={true}
                                onChangeText={(text) =>
                                    this.setState({ msgInput: text })
                                }
                                returnKeyType="send"
                                placeholder="Enter message..."
                                placeholderTextColor={
                                    EStyleSheet.value("$onSurface") +
                                    EStyleSheet.value("$normalHex")
                                }
                                style={{
                                    backgroundColor: EStyleSheet.value(
                                        "$surface"
                                    ),
                                    color:
                                        EStyleSheet.value("$onSurface") +
                                        EStyleSheet.value("$highHex"),
                                    fontSize: 16,
                                    margin: 15,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderWidth: 0,
                                    borderRadius: 5,
                                    flexGrow: 1,
                                    minHeight: 40,
                                    width: 0,
                                }}
                                ref={this.msgRef}
                            />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: EStyleSheet.value(
                                        "$secondary"
                                    ),
                                    borderRadius: 5,
                                    margin: 15,
                                    marginLeft: 0,
                                    padding: 10,
                                    height: 40,
                                    width: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={this.sendMessage}
                            >
                                <Icon
                                    name="send"
                                    style={[text_colors.onDark, opacity.high]}
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </AsyncContext.Consumer>
        );
    }
}
