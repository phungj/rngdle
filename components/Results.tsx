import ScoreRarityBadge from "@/components/ScoreRarityBadge";
import {SCORE_PLACEHOLDER} from "@/components/App";

type ResultsProps = {
    currentScore: number
}

export default function Results({currentScore}: ResultsProps) {
    return (
        <div className="w-105 flex flex-col text-center">
            {currentScore !== SCORE_PLACEHOLDER && (
                <div>
                    <h1 className="text-center font-title text-heading text-5xl mb-5">
                        Score: <span className="font-bold">{`${currentScore} EP`}</span>
                    </h1>
                    <ScoreRarityBadge currentScore={currentScore}/>
                </div>
            )}
        </div>
    );
}