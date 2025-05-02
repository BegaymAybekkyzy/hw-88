import mongoose, {Schema} from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async (doc: Schema.Types.ObjectId) => {
                const post = await Post.findById(doc);
                return !!post;
            },
            message: "Post not found",
        }
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    datetime: {
        type: Date,
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);
export default Post;