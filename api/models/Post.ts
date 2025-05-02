import mongoose, {Schema} from "mongoose";
import User from "./User";

const postSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async (doc: Schema.Types.ObjectId) => {
                const user = await User.findById(doc);
                return !!user;
            },
            message: "User not found",
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