import PostForm from "./PostForm/PostForm.tsx";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../Users/userSlice.ts";
import {Typography} from "@mui/material";

const AddPost = () => {
    const user = useAppSelector(selectUser);
    return (
        <div>
            <Typography
                variant="h2"
                color="textSecondary"
                textAlign="center"
                marginBottom={3}
            >Add new post</Typography>

            <PostForm user={user._id} />
        </div>
    );
};

export default AddPost;