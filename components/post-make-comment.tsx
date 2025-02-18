import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ion from "react-native-vector-icons/Ionicons";

interface Props {
  commentContent: string;
  handleTextChange: (text: string) => void;
  handleCommentSubmit: () => void;
}

const PostMakeComment = ({
  commentContent,
  handleTextChange,
  handleCommentSubmit,
}: Props) => {
  return (
    <KeyboardAvoidingView behavior="padding">
      <View className="flex flex-row gap-2 items-center border-t border-charcoal pt-6 pb-2 px-7">
        <TextInput
          value={commentContent}
          placeholder="Make a Comment"
          placeholderTextColor="#383939"
          style={{
            fontFamily: "Syne",
            fontSize: 14,
            fontWeight: "600",
          }}
          className="flex-1 bg-[#EFEFEF] px-4 py-2"
          onChangeText={(e) => handleTextChange(e)}
        />

        <TouchableOpacity
          className="bg-primary p-1"
          onPress={handleCommentSubmit}
          disabled={!commentContent.trim()}
        >
          <Ion name="arrow-up-sharp" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostMakeComment;
