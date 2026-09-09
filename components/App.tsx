"use client";

import GenerateWindow from "@/components/GenerateWindow";
import {useState} from "react";
import {generateSixDigitNumber} from "@/data/Scoring";
import BadgeList from "@/components/BadgeList";

export const NUM_PLACEHOLDER: string = "??????";

export default function App() {
    const [currentNum, setCurrentNum] = useState<string>(NUM_PLACEHOLDER);

    return (
        <div>
            <h1 className="text-center font-title text-heading text-5xl font-bold mb-2 mt-3">RNGdle</h1>
            <div className="min-h-screen flex items-center justify-center gap-20">
                <GenerateWindow currentNum={currentNum} generateHandler={generateHandler}/>
                <BadgeList currentNum={currentNum}/>
            </div>
        </div>
    );

    function generateHandler() {
        setCurrentNum(generateSixDigitNumber());
    }
}