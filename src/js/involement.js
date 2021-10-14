const involvement = {
  likes: (likesData, id) => {
    const likes = likesData.find((i) => i.item_id === id);
    if (likes !== undefined) {
      return likes.likes;
    }
    return 0;
  },
  comments: (commentsData, id) => {
    const commentLists = commentsData.find((i) => i.item_id === id);
    if (commentLists !== undefined) {
      return commentLists.comments;
    }
    return 0;
  },
};
export default involvement;