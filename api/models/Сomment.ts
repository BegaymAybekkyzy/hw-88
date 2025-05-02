import mongoose, {Schema} from "mongoose";
import Post from "./Post";
import User from "./User";


const commentSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        validate: {
            validator: async (doc: Schema.Types.ObjectId) => {
                const user = await User.findById(doc);
                return !!user;
            },
            message: "User not found",
        }
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Post",
        validate: {
            validator: async (doc: Schema.Types.ObjectId) => {
                const post = await Post.findById(doc);
                return !!post;
            },
            message: "Post not found",
        }
    },
    text: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;