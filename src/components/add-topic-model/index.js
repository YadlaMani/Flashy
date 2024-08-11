"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { addTopicAction } from "@/actions";
import { initalTopicData } from "../../utils";

import { useRouter } from "next/navigation";

const AddTopicDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  topicData,
  setTopicData,
  isDarkMode,
}) => {
  const handleAddFlashcard = () => {
    setTopicData((prevState) => ({
      ...prevState,
      flashcards: [...prevState.flashcards, { question: "", answer: "" }],
    }));
  };

  const handleFlashcardChange = (index, field, value) => {
    setTopicData((prevState) => {
      const newFlashcards = [...prevState.flashcards];
      newFlashcards[index][field] = value;
      return { ...prevState, flashcards: newFlashcards };
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(topicData);
      await addTopicAction(topicData);
      setTopicData(initalTopicData);
      setIsDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setTopicData(initalTopicData);
          setIsDialogOpen(false);
        }
      }}
      className={`p-6 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white"}`}
    >
      <DialogContent
        className={`p-6 rounded-lg shadow-lg max-w-md mx-auto ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Add New Topic
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Input
            placeholder="Topic Title"
            value={topicData.title}
            onChange={(e) =>
              setTopicData({ ...topicData, title: e.target.value })
            }
            className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            }`}
          />
          <Textarea
            placeholder="Description"
            value={topicData.description}
            onChange={(e) =>
              setTopicData({ ...topicData, description: e.target.value })
            }
            className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            }`}
          />
          {topicData.flashcards.map((flashcard, index) => (
            <div key={index} className="space-y-4">
              <Input
                placeholder={`Question ${index + 1}`}
                value={flashcard.question}
                onChange={(e) =>
                  handleFlashcardChange(index, "question", e.target.value)
                }
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
                    : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                }`}
              />
              <Input
                placeholder={`Answer ${index + 1}`}
                value={flashcard.answer}
                onChange={(e) =>
                  handleFlashcardChange(index, "answer", e.target.value)
                }
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
                    : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                }`}
              />
            </div>
          ))}
          <Button
            onClick={handleAddFlashcard}
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${
              isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
            }`}
          >
            Add Another Flashcard
          </Button>
        </div>
        <DialogFooter className="flex justify-end mt-6">
          <Button
            onClick={handleSubmit}
            className={`bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ${
              isDarkMode ? "bg-green-600 hover:bg-green-700" : ""
            }`}
          >
            Create Topic
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicDialog;
