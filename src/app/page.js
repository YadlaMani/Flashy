"use client";
import React, { useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import FlashCards from "@/components/ui/flashcards";
import { Button } from "@/components/ui/button";
import AddTopicDialog from "@/components/add-topic-model";
import { initalTopicData } from "@/utils";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [topicData, setTopicData] = useState(initalTopicData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <header
        className={`flex flex-col md:flex-row justify-between items-center p-6 rounded-lg shadow-lg mb-8 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-2xl md:text-4xl font-extrabold text-center md:text-left">
          Flashy - Flashcard Manager
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
          <Button
            onClick={() => {
              setTopicData(initalTopicData);
              setIsDialogOpen(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add New Topic
          </Button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg shadow-md transition duration-300 ${
              isDarkMode
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {isDarkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center p-4">
        <p className="text-base md:text-lg mb-6 text-center">
          Manage your flashcards efficiently with ease. Add, view, and organize
          your topics and flashcards all in one place.
        </p>
        <div className="w-full max-w-7xl p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <FlashCards isDarkMode={isDarkMode} />
        </div>
      </main>

      <AddTopicDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        topicData={topicData}
        setTopicData={setTopicData}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
