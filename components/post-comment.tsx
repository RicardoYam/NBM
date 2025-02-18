import { View, Text } from "react-native";
import { Comment } from "@/types/feed";
import PostInfo from "./post-info";
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
        postId={comment.postId}
        commentId={comment.id}
        date={getDate(comment.createdAt)}
      />

      <Text className="font-syne font-normal text-[14px] text-charcoal">
        {comment.text}
      </Text>
    </View>
  );
};

export default PostComment;
