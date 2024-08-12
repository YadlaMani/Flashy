"use server";
import connectToDB from "@/database";
import Topic from "@/models/topic";
import { revalidatePath } from "next/cache";
export async function getFlashcardAction() {
  await connectToDB();
  const data = await Topic.find({});
  console.log(data);
  return JSON.parse(JSON.stringify(data));
}

export async function addTopicAction(topicData) {
  await connectToDB();

  const newTopic = new Topic(topicData);
  await newTopic.save();

  return JSON.parse(JSON.stringify(newTopic));
}
export async function deleteTopicAction(deleteTopicId) {
  await connectToDB();
  await Topic.findByIdAndDelete(deleteTopicId);
}
export async function editTopicAction(editTopicId, topic) {
  await connectToDB();
  await Topic.findOneAndUpdate({ _id: editTopicId }, topic);
}
