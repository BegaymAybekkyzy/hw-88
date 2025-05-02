import { selectPostCreationLoading} from "../../postsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {IPostForm} from "../../../../types.s.ts";
import React, {useState} from "react";
import {createPost} from "../../postsThunks.ts";
import {useNavigate} from "react-router-dom";
import {Button, Grid, TextField} from "@mui/material";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";

interface Props {
    user: string;
}

const PostForm: React.FC<Props> = ({user}) => {
    const loading = useAppSelector(selectPostCreationLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!user) return null;

    const [form, setForm] = useState<IPostForm>({
        user,
        title: "",
        description: "",
        image: null,
    });

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.description && !form.image) {
            alert("You need to either add a description or an image");
            return;
        }
        await dispatch(createPost(form));
        navigate("/");
    };

    const fileInputChangeHandler = (
        eFile: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const {files} = eFile.target;

        if (files) {
            setForm((prev) => ({...prev, image: files[0]}));
        }
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    return (
        <form onSubmit={onSubmitForm}>
            <Grid container spacing={2} marginBottom={3} justifyContent="center">
                <Grid size={9}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        required
                        disabled={loading}
                        onChange={onChangeInput}
                        variant="outlined" />
                </Grid>
                <Grid size={9}>
                    <TextField
                        fullWidth
                        label="Description"
                        disabled={loading}
                        rows={4}
                        multiline
                        name="description"
                        onChange={onChangeInput}
                        variant="outlined" />
                </Grid>
                <Grid size={9}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                    />
                </Grid>

                <Grid size={9}>
                    <Button
                        variant="contained"
                        sx={{backgroundColor: "#708090"}}
                        type="submit"
                        disabled={loading}
                    >Created post</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PostForm;