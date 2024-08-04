import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  videoUrl: { type: String, required: true },
  video: {
    data: Buffer,
    contentType: String,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
