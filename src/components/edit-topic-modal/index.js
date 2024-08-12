"use client";
import React, { useRef, useEffect } from "react";
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
import { editTopicAction } from "@/actions";
import { initalTopicData } from "@/utils";

const EditTopicDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  topicData,
  setTopicData,
  isDarkMode,
}) => {
  const flashcardsEndRef = useRef(null);
  const lastAddedFlashcardRef = useRef(null);

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
      await editTopicAction(topicData._id, topicData);
      setTopicData(initalTopicData);
      setIsDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  useEffect(() => {
    if (flashcardsEndRef.current) {
      flashcardsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (lastAddedFlashcardRef.current) {
      lastAddedFlashcardRef.current.classList.add("bg-yellow-100");
      setTimeout(() => {
        if (lastAddedFlashcardRef.current) {
          lastAddedFlashcardRef.current.classList.remove("bg-yellow-100");
        }
      }, 1000);
    }
  }, [topicData.flashcards.length]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsDialogOpen(false);
        }
      }}
      className="p-6"
    >
      <DialogContent
        className={`p-6 rounded-lg shadow-lg max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Edit Topic
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Input
            placeholder="Topic Title"
            value={topicData.title}
            onChange={(e) =>
              setTopicData({ ...topicData, title: e.target.value })
            }
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
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
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            }`}
          />

          <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
            {topicData.flashcards.map((flashcard, index) => (
              <div
                key={index}
                ref={
                  index === topicData.flashcards.length - 1
                    ? lastAddedFlashcardRef
                    : null
                }
                className="space-y-2 flex flex-col"
              >
                <div className="flex items-center space-x-2">
                  <label
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Question {index + 1}
                  </label>
                  <Input
                    placeholder={`Question ${index + 1}`}
                    value={flashcard.question}
                    onChange={(e) =>
                      handleFlashcardChange(index, "question", e.target.value)
                    }
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                    }`}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Answer {index + 1}
                  </label>
                  <Input
                    placeholder={`Answer ${index + 1}`}
                    value={flashcard.answer}
                    onChange={(e) =>
                      handleFlashcardChange(index, "answer", e.target.value)
                    }
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800 text-white focus:ring-blue-500"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                    }`}
                  />
                </div>
              </div>
            ))}
            <div ref={flashcardsEndRef} />
          </div>
          <Button
            onClick={handleAddFlashcard}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${
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
            Update Topic
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTopicDialog;
