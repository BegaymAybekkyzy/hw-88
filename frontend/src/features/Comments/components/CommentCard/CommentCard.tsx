import React from 'react';
import {ICommentApi} from "../../../../types.s.ts";
import {Card} from "react-bootstrap";

interface Props {
    comment: ICommentApi;
}

const CommentCard: React.FC<Props> = ({comment}) => {
    return (
        <Card className="mb-3">
            <Card.Body><b>{comment.user.username}</b>: {comment.text}</Card.Body>
        </Card>
    );
};

export default CommentCard;