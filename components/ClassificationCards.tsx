import {Classification} from "@/data/Classifications";
import ClassificationCard from "@/components/ClassificationCard";

type ClassificationCardsProps = {
    classifications: Classification[]
}

export default function ClassificationCards({classifications}: ClassificationCardsProps) {
    return (
        <div>
            {classifications.length > 0 &&
                <div className="mt-8 flex flex-col items-center gap-4">
                    {classifications.map(classification => (
                        <ClassificationCard
                            key={classification.id}
                            classification={classification}
                        />
                    ))}
                </div>
            }
        </div>
    );
}