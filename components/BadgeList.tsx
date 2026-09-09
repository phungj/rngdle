import {scoreNumber} from "@/data/Scoring";
import {NUM_PLACEHOLDER} from "@/components/App";

type BadgeListProps = {
    currentNum: string
}

export default function BadgeList({currentNum}: BadgeListProps) {
    return (
        <div className="flex flex-col text-center">
            <h1 className="text-center font-title text-heading text-5xl mb-5">Score: {currentNum === NUM_PLACEHOLDER ? "" : `${scoreNumber(currentNum).totalScore} EP`}</h1>
        </div>
    );
}