import {Classification} from "@/data/Classifications";
import {classificationTierFromScore} from "@/data/Rarity";

type ClassificationCardProps = {
    classification: Classification
}

export default function ClassificationCard({classification}: ClassificationCardProps) {
    return (
        <div className="card bg-base-100 w-1/3 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">
                    {classification.icon}
                    {" "}
                    {classification.name}
                    {getClassificationRarityBadge(classification.score)}
                    <span className="ml-auto"><div className="badge badge-sm rounded-full bg-yellow-400">{`+${classification.score} EP`}</div></span>
                </h2>
                <p className="text-left">{classification.desc}</p>
            </div>
        </div>
    )
}

function getClassificationRarityBadge(score: number) {
    const rarity = classificationTierFromScore(score);

    switch (rarity) {
        case "Common":
            return <div className="badge badge-sm rounded-full bg-gray-400 text-white">{rarity}</div>;
        case "Uncommon":
            return <div className="badge badge-sm rounded-full bg-green-600 text-white">{rarity}</div>;
        case "Rare":
            return <div className="badge badge-sm rounded-full bg-blue-700 text-white">{rarity}</div>;
        case "Epic":
            return <div className="badge badge-sm rounded-full bg-violet-900 text-white">{rarity}</div>;
        case "Anomaly":
            return <div className="badge badge-sm rounded-full bg-orange-400 text-white">{rarity}</div>;
        case "Mythic":
            return <div className="badge badge-sm rounded-full bg-red-500 text-white">{rarity}</div>;
    }
}