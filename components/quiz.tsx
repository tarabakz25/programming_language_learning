"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export function Quiz({ questions }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    if (showResults) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const correctCount = questions.reduce((count, question, index) => {
    return count + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
  }, 0);

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>確認問題</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, questionIndex) => {
          const selectedOption = selectedAnswers[questionIndex];

          return (
            <div key={questionIndex} className="space-y-3">
              <h4 className="font-semibold text-lg">
                {questionIndex + 1}. {question.question}
              </h4>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedOption === optionIndex;
                  const isCorrectOption = optionIndex === question.correctAnswer;

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleSelectAnswer(questionIndex, optionIndex)}
                      disabled={showResults}
                      className={cn(
                        "w-full text-left p-3 rounded-md border transition-colors",
                        "hover:bg-accent hover:border-accent-foreground/20",
                        showResults &&
                          isCorrectOption &&
                          "bg-green-50 border-green-500 dark:bg-green-950 dark:border-green-600",
                        showResults &&
                          isSelected &&
                          !isCorrectOption &&
                          "bg-red-50 border-red-500 dark:bg-red-950 dark:border-red-600",
                        !showResults &&
                          isSelected &&
                          "bg-accent border-accent-foreground/20"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {showResults && isCorrectOption && (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        )}
                        {showResults && isSelected && !isCorrectOption && (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                        <span>{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {showResults && question.explanation && (
                <p className="text-sm text-muted-foreground mt-2">
                  {question.explanation}
                </p>
              )}
            </div>
          );
        })}

        {!showResults ? (
          <Button onClick={handleSubmit} className="w-full">
            回答を確認
          </Button>
        ) : (
          <div className="p-4 bg-muted rounded-md">
            <p className="text-center font-semibold">
              正解数: {correctCount} / {questions.length}
            </p>
            <p className="text-center text-sm text-muted-foreground mt-1">
              {correctCount === questions.length
                ? "完璧です！"
                : correctCount >= questions.length / 2
                ? "もう少し頑張りましょう！"
                : "もう一度復習してみましょう。"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

