import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  reviewLater: { type: Boolean, default: false },
});

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  flashcards: [FlashcardSchema],
});

export default mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
