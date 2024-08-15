// Not yet implemented.  Rather than the traditional list style form, this component will render a form in a question/response/next format. The user can navigate through the questions using the "Next" button and submit the form once all questions are answered.

import React, { useState, ChangeEvent } from "react";
import "../../index.css";
import { Button } from "../Button"; // Adjust the import path according to your file structure

const questions: string[] = [
  "Why are you here?",
  "What is your name?",
  "Where do you live?",
  "How old are you?",
  "What did you do?",
  "Where are you going?",
  "Anything else?",
];

interface QuestionProps {
  questionText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Question: React.FC<QuestionProps> = ({
  questionText,
  onChange,
  value,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <div className="w-72 border-2 border-gray-200 bg-gray-200 rounded p-4">
        <label className="font-bold">{questionText}</label>
      </div>
      <div className="mt-2 border-b-2 border-solid border-pink-500">
        <input
          autoFocus
          type="text"
          onChange={onChange}
          value={value}
          className="w-full border-none bg-transparent p-0 focus:outline-none"
          style={{ caretColor: "#EC4899" }}
          onFocus={() => setIsFocused(true)} // Set focus state to true
          onBlur={() => setIsFocused(false)} // Set focus state to false
        />
      </div>
    </div>
  );
};

const Form: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<string[]>(questions.map(() => ""));

  const handleNext = (): void => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = (): void => {
    // Submit the form responses
    console.log(responses);
  };

  const handleChange =
    (index: number) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const newResponses = [...responses];
      newResponses[index] = event.target.value;
      setResponses(newResponses);
    };

  return (
    <div>
      <div>
        {currentQuestionIndex > 0 && (
          <div className="previous-question w-72 border-2 border-gray-100 bg-gray-100 rounded p-4 mb-8">
            <label className="text-gray-400">
              {questions[currentQuestionIndex - 1]}
            </label>
            <p className="text-gray-400">
              {responses[currentQuestionIndex - 1]}
            </p>
          </div>
        )}

        <div>
          <Question
            questionText={questions[currentQuestionIndex]}
            onChange={handleChange(currentQuestionIndex)}
            value={responses[currentQuestionIndex]}
          />
        </div>

        {currentQuestionIndex < questions.length - 1 && (
          <div className="next-question w-72 border-2 border-gray-100 bg-gray-100 rounded p-4 mt-8">
            <label className="text-gray-400">
              {questions[currentQuestionIndex + 1]}
            </label>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        {currentQuestionIndex < questions.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default Form;
