"use client";
import { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import {
  getFlashcardAction,
  deleteTopicAction,
  updateTopicAction,
} from "@/actions"; // Ensure these functions are implemented

const FlashCards = ({ isDarkMode }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getFlashcardAction();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      setIsEnd(currentCardIndex === selectedTopic.flashcards.length - 1);
    }
  }, [currentCardIndex, selectedTopic]);

  const handleViewFlashcards = (topic) => {
    setSelectedTopic(topic);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsEnd(false);
  };

  const handleNextCard = () => {
    if (
      selectedTopic &&
      currentCardIndex < selectedTopic.flashcards.length - 1
    ) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePreviousCard = () => {
    if (selectedTopic && currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleDoDifferentTopic = () => {
    setSelectedTopic(null);
  };
  const handleDeleteTopic = async (deleteTopicId) => {
    await deleteTopicAction(deleteTopicId);
    window.location.reload();
  };
  //edit function
  const handleEditTopic = (topic) => {};

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {selectedTopic ? (
        <div className="flex flex-col items-center">
          <button
            onClick={() => setSelectedTopic(null)}
            className="mb-4 text-blue-500 hover:underline"
          >
            Back to Topics
          </button>
          <div
            className={`shadow-lg rounded-lg p-4 w-full max-w-md sm:max-w-sm md:max-w-md ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDarkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {selectedTopic.title}
            </h2>
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {selectedTopic.description}
            </p>
            {selectedTopic.flashcards.length > 0 ? (
              <div className="flex flex-col items-center">
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                  <div
                    className={`front w-full h-64 flex items-center justify-center rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    <p
                      className={`text-lg font-medium text-center px-4 ${
                        isDarkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {selectedTopic.flashcards[currentCardIndex].question}
                    </p>
                  </div>
                  <div
                    className={`back w-full h-64 flex items-center justify-center rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-600 border-gray-500"
                        : "bg-gray-200 border-gray-300"
                    }`}
                  >
                    <p
                      className={`text-lg font-medium text-center px-4 ${
                        isDarkMode ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {selectedTopic.flashcards[currentCardIndex].answer}
                    </p>
                  </div>
                </ReactCardFlip>
                <div className="flex flex-col items-center mt-4 w-full">
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className={`bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300 w-full mb-2 ${
                      isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                  >
                    Flip
                  </button>
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={handlePreviousCard}
                      disabled={currentCardIndex === 0}
                      className={`bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300 w-1/2 ${
                        currentCardIndex === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      } ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={isEnd ? handleDoDifferentTopic : handleNextCard}
                      disabled={
                        isEnd
                          ? false
                          : currentCardIndex ===
                            selectedTopic.flashcards.length - 1
                      }
                      className={`bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300 w-1/2 ${
                        isEnd
                          ? "bg-green-500 hover:bg-green-600"
                          : currentCardIndex ===
                            selectedTopic.flashcards.length - 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      } ${isEnd ? "bg-green-600 hover:bg-green-700" : ""}`}
                    >
                      {isEnd ? "Do Different Topic" : "Next"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p
                className={`text-gray-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No flashcards available
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1
            className={`text-2xl font-bold mb-6 ${
              isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Flashcard Topics
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <div
                  key={topic._id}
                  className={`shadow-lg rounded-lg p-4 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h2
                    className={`text-xl font-semibold mb-2 ${
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    {topic.title}
                  </h2>
                  <p
                    className={`mb-2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {topic.description}
                  </p>
                  <p
                    className={`text-gray-500 mb-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Number of flashcards: {topic.flashcards.length}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleViewFlashcards(topic)}
                      className={`bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300 ${
                        isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                      }`}
                    >
                      View Flashcards
                    </button>
                    <button
                      onClick={() => handleEditTopic(topic)}
                      className={`bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition duration-300 ${
                        isDarkMode ? "bg-yellow-600 hover:bg-yellow-700" : ""
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTopic(topic._id)}
                      className={`bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition duration-300 ${
                        isDarkMode ? "bg-red-600 hover:bg-red-700" : ""
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p
                className={`text-gray-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No topics available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashCards;
