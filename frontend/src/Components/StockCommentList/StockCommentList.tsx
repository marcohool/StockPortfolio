import React from "react";
import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

interface Props {
  comments: CommentGet[];
}

const StockCommentList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      {comments
        ? comments.map((comment) => {
            return <StockCommentListItem comment={comment} />;
          })
        : null}
    </>
  );
};

export default StockCommentList;
