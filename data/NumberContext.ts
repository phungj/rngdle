export interface NumberContext {
    n: number
    s: string
    len: number
    d: number[]

    counts: Record<number, number>
    distinct: number
    sum: number
    prod: number
    maxCount: number

    has(substring: string): boolean
    cnt(digit: number): number
    withCount(count: number): number
    countExact(count: number): number

    runs: number[]
}

export function createNumberContext(n: number): NumberContext {
    const s = String(n)
    const d = [...s].map(Number)

    const counts: Record<number, number> = {}

    let sum = 0
    let prod = 1

    for (const digit of d) {
        counts[digit] = (counts[digit] ?? 0) + 1
        sum += digit
        prod *= digit
    }

    const values = Object.values(counts)

    return {
        n,
        s,
        len: s.length,
        d,

        counts,
        distinct: values.length,
        sum,
        prod,
        maxCount: Math.max(...values),

        has: substring => s.includes(substring),
        cnt: digit => counts[digit] ?? 0,
        withCount: count => values.filter(v => v >= count).length,
        countExact: count => values.filter(v => v === count).length,

        runs: runLengths(s),
    }
}

function runLengths(s: string): number[] {
    const result: number[] = []

    let i = 0

    while (i < s.length) {
        let j = i

        while (j < s.length && s[j] === s[i]) {
            j++
        }

        result.push(j - i)
        i = j
    }

    return result
}