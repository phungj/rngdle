import {numberTierFromScore} from "@/data/Rarity";

type RarityBadgeProps = {
    currentScore: number
}

export default function ScoreRarityBadge({currentScore}: RarityBadgeProps) {
    const rarity = numberTierFromScore(currentScore);

    switch (rarity) {
        case "Trash":
            return <div className="badge badge-xl rounded-full bg-amber-900 h-16 w-70 text-5xl text-white">{rarity}</div>;
        case "Common":
            return <div className="badge badge-xl rounded-full bg-gray-400 h-16 w-70 text-5xl text-white">{rarity}</div>;
        case "Uncommon":
            return <div className="badge badge-xl rounded-full bg-green-600 h-16 w-70 text-5xl text-white">{rarity}</div>;
        case "Rare":
            return <div className="badge badge-xl rounded-full bg-blue-700 h-16 w-70 text-5xl text-white">{rarity}</div>;
        case "Epic":
            return <div className="badge badge-xl rounded-full bg-violet-900 h-16 w-70 text-5xl text-white">{rarity}</div>;
        case "Anomaly":
            return <div className="badge badge-xl rounded-full bg-orange-400 h-16 w-70 text-5xl text-white">{rarity}</div>;
        case "Mythic":
            return <div className="badge badge-xl rounded-full bg-red-500 h-16 w-70 text-5xl text-white">{rarity}</div>;
    }
}