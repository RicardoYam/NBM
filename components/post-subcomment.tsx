import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import PostInfo from "./post-info";
import { Comment } from "@/types/feed";

interface Props {
  comment: Comment;
  isFirstSubComment?: boolean;
}

const PostSubcomment = ({ comment, isFirstSubComment }: Props) => {
  return (
    <View className="gap-4">
      <View className="flex flex-col gap-4 border-secondary pl-6 relative overflow-hidden">
        <View
          className={`absolute ${isFirstSubComment ? "" : "border-b-2"} border-l-2 border-secondary w-4 h-full left-0 bottom-4`}
        ></View>

        <PostInfo author={comment.author} date={comment.date} />

        <Text className="font-syne font-normal text-[14px] text-charcoal">
          {comment.content}
        </Text>

        {/* TODO: Add action */}
        <TouchableOpacity
          className="bg-[#EFEFEF] py-2 px-4"
          activeOpacity={0.7}
        >
          <Text className="font-syne font-normal text-[14px] text-charcoal">
            Write a reply ...
          </Text>
        </TouchableOpacity>
      </View>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <View className="flex flex-col gap-4 ml-6">
          {comment.replies.map((reply) => (
            <PostSubcomment key={reply.id} comment={reply} />
          ))}
        </View>
      )}
    </View>
  );
};

export default PostSubcomment;
