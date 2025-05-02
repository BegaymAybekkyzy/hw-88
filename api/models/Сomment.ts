import mongoose, {Schema} from "mongoose";


const commentSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;