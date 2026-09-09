const CLASSIFICATION_TIERS = {
    common: 1_000,
    uncommon: 10_000,
    rare: 100_000,
    epic: 1_000_000,
    anomaly: 10_000_000,
} as const

const NUMBER_TIERS: [number, string][] = [
    [2087, 'Trash'], [5802, 'Common'], [10074, 'Uncommon'],
    [22293, 'Rare'], [35469, 'Epic'], [162292, 'Anomaly'],
];

export type Rarity =
    | "Common"
    | "Uncommon"
    | "Rare"
    | "Epic"
    | "Anomaly"
    | "Mythic"

export function classificationTierFromScore(score: number): Rarity {
    if (score < CLASSIFICATION_TIERS.common) return "Common"
    if (score < CLASSIFICATION_TIERS.uncommon) return "Uncommon"
    if (score < CLASSIFICATION_TIERS.rare) return "Rare"
    if (score < CLASSIFICATION_TIERS.epic) return "Epic"
    if (score < CLASSIFICATION_TIERS.anomaly) return "Anomaly"

    return "Mythic"
}

export function numberTierFromScore(ep: number) { for (const [t, name] of NUMBER_TIERS) if (ep < t) return name; return 'Mythic'; }