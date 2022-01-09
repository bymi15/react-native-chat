import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import uuid from "react-native-uuid";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ChatItem, RenderChatItem } from "../components/ChatItem";
import { AuthContext } from "../store";
import Styles from "../styles/Styles";

const Chat = () => {
  const { state } = React.useContext(AuthContext);
  const didUnmount = useRef(false);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "wss://react-native-chat-ws-server.herokuapp.com/ws",
    {
      shouldReconnect: () => {
        return didUnmount.current === false;
      },
      reconnectAttempts: 3,
      reconnectInterval: 3000,
    }
  );

  let [chatInput, setChatInput] = useState("");
  let [chatItemList, setChatItemList] = useState<ChatItem[]>([]);

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    if (lastJsonMessage !== null && !chatItemList.find((i) => i.id == lastJsonMessage.id)) {
      setChatItemList([...chatItemList, lastJsonMessage]);
    }
  }, [lastJsonMessage]);

  const sendMessageToServer = async () => {
    if (readyState == ReadyState.OPEN) {
      if (chatInput.trim()) {
        const msg = {
          id: uuid.v4().toString(),
          text: chatInput,
          image: state.profileImage,
          timeStamp: Date.now(),
          by: state.username,
        };
        sendJsonMessage(msg);
        setChatItemList([...chatItemList, msg]);
        setChatInput("");
      }
    } else {
      console.log("Websocket connection not yet ready");
    }
  };

  const renderItem: ListRenderItem<ChatItem> = ({ item }) => (
    <RenderChatItem chatItem={item} username={state.username}></RenderChatItem>
  );

  return (
    <KeyboardAvoidingView
      style={Styles.chatContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.chatContainer}>
          <FlatList
            inverted
            data={chatItemList.sort((a, b) => b.timeStamp - a.timeStamp)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          ></FlatList>
          <View style={Styles.sendSection}>
            <TextInput
              style={Styles.chatTextInput}
              value={chatInput}
              multiline={true}
              onChangeText={(text) => setChatInput(text)}
            ></TextInput>
            <Button icon="send" color="#fff" onPress={sendMessageToServer}>
              Send
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Chat;
