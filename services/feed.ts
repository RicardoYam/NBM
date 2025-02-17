import nbmClient from ".";

export const getAllPosts = async ({
  page,
  limit,
  tags,
}: {
  page: number;
  limit: number;
  tags?: string[] | [];
}) => {
  try {
    const response = await nbmClient.post("/posts/_search", {
      page,
      limit,
      tags,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const response = await nbmClient.get("/tags", {
      params: { page, limit },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPostComments = async ({
  id,
  page,
  limit,
}: {
  id: number;
  page: number;
  limit: number;
}) => {
  try {
    const response = await nbmClient.get(`/posts/${id}/comments`, {
      params: { page, limit },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPostComments = async ({
  postId,
  text,
}: {
  postId: number;
  text: string;
}) => {
  try {
    const response = await nbmClient.post(`/posts/${postId}/comments`, {
      text,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async ({
  title,
  content,
  tags,
}: {
  title: string;
  content: string;
  tags: string[];
}) => {
  try {
    const response = await nbmClient.post(`/posts`, {
      title,
      content,
      tags,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
