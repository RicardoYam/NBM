import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Comment } from "@/types/feed";
import PostInfo from "./post-info";
import PostSubcomment from "./post-subcomment";
import { getDate } from "@/utils/util";

interface Props {
  comment: Comment;
}

const PostComment = ({ comment }: Props) => {
  return (
    <View className="flex flex-col gap-4">
      <PostInfo
        authorId={comment.userId}
        author={comment.user.firstName + " " + comment.user.lastName}
        date={getDate(comment.createdAt)}
      />

      <Text className="font-syne font-normal text-[14px] text-charcoal">
        {comment.text}
      </Text>

      {/* Replies */}
      {/* {comment.replies.length > 0 && (
        <View className="flex flex-col gap-4">
          {comment.replies.map((reply, index) => (
            <PostSubcomment
              key={reply.id}
              comment={reply}
              isFirstSubComment={index === 0 ? true : false}
            />
          ))}
        </View>
      )} */}
    </View>
  );
};

export default PostComment;
