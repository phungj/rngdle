"use client";

import GenerateWindow from "@/components/GenerateWindow";
import {useState} from "react";
import {generateSixDigitNumber, NumberScore, scoreNumber} from "@/data/Scoring";
import Results from "@/components/Results";
import ClassificationCards from "@/components/ClassificationCards";

export const NUM_PLACEHOLDER: string = "??????";
export const SCORE_PLACEHOLDER = -1;
export const CLASSIFICATION_PLACEHOLDER = [];

export default function App() {
    const [currentNumberScore, setCurrentNumberScore] = useState<NumberScore | null>(null);

    const currentNum = currentNumberScore === null ? NUM_PLACEHOLDER : currentNumberScore.number;
    const currentScore = currentNumberScore === null ? SCORE_PLACEHOLDER : currentNumberScore.totalScore;
    const currentClassifications = currentNumberScore === null ? CLASSIFICATION_PLACEHOLDER : currentNumberScore.classifications;

    return (
        <div className="h-screen">
            <h1 className="text-center font-title text-heading text-5xl font-bold mt-3">RNGdle</h1>
            <div className="min-h-1/4 flex items-center justify-center gap-20 ml-30">
                <GenerateWindow currentNum={currentNum} generateHandler={generateHandler}/>
                <Results currentScore={currentScore}/>
            </div>
            <ClassificationCards classifications={currentClassifications.filter(classification => classification.scored).map(classification => classification.classification)}/>
        </div>
    );

    function generateHandler() {
        setCurrentNumberScore(scoreNumber(generateSixDigitNumber()));
    }
}