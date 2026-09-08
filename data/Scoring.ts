import { createNumberContext } from "./NumberContext"
import {
    CLASSIFICATIONS,
    type Classification,
} from "./Classifications"
import { FAMILIES } from "./Families"

interface ScoredClassification {
    classification: Classification

    earned: boolean
    scored: boolean

    score: number
}

export interface NumberScore {
    number: number
    totalScore: number

    classifications: ScoredClassification[]
}

export function scoreNumber(n: number): NumberScore {
    const context = createNumberContext(n)

    const earned = CLASSIFICATIONS.filter(
        classification => {
            try {
                return classification.test(context)
            } catch {
                return false
            }
        }
    )

    const winners = new Set<string>()

    for (const family of FAMILIES) {
        const candidates = earned.filter(
            classification => family.includes(classification.id)
        )

        if (candidates.length === 0) continue

        const winner = candidates.reduce(
            (best, current) =>
                current.score > best.score ? current : best
        )

        winners.add(winner.id)
    }

    // Classifications not belonging to a family score independently.
    const familyMembers = new Set(
        FAMILIES.flat()
    )

    let totalScore = 0

    const results = CLASSIFICATIONS
        .filter(classification =>
            earned.some(e => e.id === classification.id)
        )
        .map(classification => {
            const inFamily = familyMembers.has(classification.id)

            const scored =
                !inFamily ||
                winners.has(classification.id)

            if (scored) {
                totalScore += classification.score
            }

            return {
                classification,
                earned: true,
                scored,
                score: scored ? classification.score : 0,
            }
        })
        .sort((a, b) => b.score - a.score)

    return {
        number: n,
        totalScore,
        classifications: results,
    }
}