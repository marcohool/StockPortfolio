import React, { useEffect } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

interface Props {
  stockSymbol: string;
}

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment: React.FC<Props> = ({ stockSymbol }) => {
  const [comments, setComments] = React.useState<CommentGet[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    getComments();
  }, []);

  const handleComment = (e: CommentFormInputs) => {
    commentPostAPI(e.title, e.content, stockSymbol)
      .then((res) => {
        if (res) {
          toast.success("Comment posted successfully");
          getComments();
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const getComments = () => {
    setLoading(true);

    commentGetAPI(stockSymbol).then((res) => {
      setLoading(false);
      setComments(res?.data!);
    });
  };

  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
