const SCORE_TIERS = {
    common: 1_000,
    uncommon: 10_000,
    rare: 100_000,
    epic: 1_000_000,
    anomaly: 10_000_000,
} as const

export type Rarity =
    | "Common"
    | "Uncommon"
    | "Rare"
    | "Epic"
    | "Anomaly"
    | "Mythic"

export function rarityFromScore(score: number): Rarity {
    if (score < SCORE_TIERS.common) return "Common"
    if (score < SCORE_TIERS.uncommon) return "Uncommon"
    if (score < SCORE_TIERS.rare) return "Rare"
    if (score < SCORE_TIERS.epic) return "Epic"
    if (score < SCORE_TIERS.anomaly) return "Anomaly"

    return "Mythic"
}