import React, { useEffect, useState } from "react";
import { Animated, Easing, Image, Text, View } from "react-native";
import Styles from "../styles/Styles";
import { IMAGE_PREFIX, UNKNOWN_AVATAR_IMAGE } from "../utils/constants";

interface ChatItem {
  id: string;
  text: string;
  image: string;
  timeStamp: number;
  by: string;
}

interface Props {
  chatItem: ChatItem;
  username: string;
}

const RenderChatItem = ({ chatItem, username }: Props) => {
  let avatarImage = chatItem.image || UNKNOWN_AVATAR_IMAGE;

  let [animatedValue] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 400,
      easing: (number) => Easing.ease(number),
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View
      style={[
        Styles.flatListItem,
        { alignItems: username == chatItem.by ? "flex-end" : "flex-start" },
        { opacity: animatedValue },
        { transform: [{ scale: animatedValue }] },
      ]}
    >
      <View
        style={[
          Styles.chatMessageWrapper,
          { backgroundColor: username == chatItem.by ? "#ffea26" : "#fff" },
        ]}
      >
        {username != chatItem.by && (
          <View style={Styles.chatItemHeader}>
            <Image
              source={{
                uri: IMAGE_PREFIX + avatarImage,
              }}
              style={Styles.avatarSmall}
            />
            <Text style={Styles.byText}>{chatItem.by}</Text>
          </View>
        )}
        <Text style={Styles.chatText}>{chatItem.text}</Text>
        <Text style={Styles.dateText}>{new Date(chatItem.timeStamp).toLocaleTimeString()}</Text>
      </View>
    </Animated.View>
  );
};

export { ChatItem, RenderChatItem };
