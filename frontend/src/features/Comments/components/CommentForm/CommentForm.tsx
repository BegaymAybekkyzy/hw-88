import React, {useState} from 'react';
import {ICommentForm} from "../../../../types.s.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectCommentCreationLoading} from "../../commentsSlice.ts";
import {Form} from "react-bootstrap";
import {Button} from "@mui/material";
import {addComment, fetchComments} from "../../commentsThunks.ts";

interface Props {
    postId: string;
}

const CommentForm: React.FC<Props> = ({postId}) => {
    const [form, setForm] = useState<ICommentForm>({
        post: postId,
        text: ""
    });

    const loading = useAppSelector(selectCommentCreationLoading);
    const dispatch = useAppDispatch();

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(addComment(form));
        await dispatch(fetchComments(postId));
        setForm({...form, text: ""});
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <Form onSubmit={onSubmitForm}>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="text"
                    value={form.text}
                    required
                    disabled={loading}
                    onChange={onChangeInput}
                    type="text"
                />
            </Form.Group>
            <Button
                variant="contained"
                sx={{backgroundColor: "#708090"}}
                type="submit"
                disabled={loading}
            >Add</Button>
        </Form>
    );
};

export default CommentForm;