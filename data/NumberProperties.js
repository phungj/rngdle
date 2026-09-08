export function ipow(b, e) { let r = 1; for (let i = 0; i < e; i++) r *= b; return r; }

// Perfect b^exp. 0 and 1 both count as perfect powers of every exponent (0 = 0^exp,
// 1 = 1^exp) and earn all 13 power badges (superseded to the top tier). Both confirmed
// against prod: 0 = 139,927,162, 1 = 162,575,449.
export function isPerfectPower(n, exp) {
    if (n <= 1) return true;
    for (let b = 2; ; b++) {
        const v = ipow(b, exp);
        if (v > n) return false;
        if (v === n) return true;
    }
}

// k^m for m >= 1 (so 1 is NOT counted as a power of k).
export function isPowerOf(n, k) {
    if (n < k) return false;
    let v = k;
    while (v < n) v *= k;
    return v === n;
}

export const FACTORIALS = new Set([1, 2, 6, 24, 120, 720, 5040, 40320, 362880]); // 0!..9! within range
export const FIBS = (() => {
    const s = new Set([0, 1]);
    let a = 0, b = 1;
    while (b <= 1000000) { s.add(b); [a, b] = [b, a + b]; }
    return s;
})();
export const PRONICS = (() => {
    const s = new Set();
    for (let k = 0; k * (k + 1) <= 1000000; k++) s.add(k * (k + 1));
    return s;
})();

export function isPrime(n) {
    if (n < 2) return false;
    if (n % 2 === 0) return n === 2;
    for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
    return true;
}

// Partition a string into `count` non-empty contiguous parts.
export function partitions(str, count) {
    const res = [];
    (function rec(start, parts) {
        if (parts.length === count) { if (start === str.length) res.push(parts.slice()); return; }
        const remaining = count - parts.length;
        for (let end = start + 1; end <= str.length - (remaining - 1); end++) {
            parts.push(str.slice(start, end));
            rec(end, parts);
            parts.pop();
        }
    })(0, []);
    return res;
}
export const validPart = p => p.length === 1 || p[0] !== '0'; // no leading zeros except "0"

// Can `str` split into `count` parts that are consecutive integers ascending in order?
// multiDigit: require at least one part to be 2+ digits (so single-digit runs like
// "12" are NOT counted as "consecutive numbers" - those are Neighbors instead).
export function consecAsc(str, count, multiDigit) {
    for (const parts of partitions(str, count)) {
        if (!parts.every(validPart)) continue;
        if (multiDigit && !parts.some(p => p.length >= 2)) continue;
        const nums = parts.map(Number);
        let ok = true;
        for (let i = 1; i < nums.length; i++) if (nums[i] - nums[i - 1] !== 1) { ok = false; break; }
        if (ok) return true;
    }
    return false;
}
// Can `str` split into `count` consecutive integers but NOT in ascending order?
export function consecScrambled(str, count) {
    for (const parts of partitions(str, count)) {
        if (!parts.every(validPart)) continue;
        const nums = parts.map(Number);
        const sorted = [...nums].sort((a, b) => a - b);
        let isSet = true;
        for (let i = 1; i < sorted.length; i++) if (sorted[i] - sorted[i - 1] !== 1) { isSet = false; break; }
        if (!isSet) continue;
        let asc = true;
        for (let i = 1; i < nums.length; i++) if (nums[i] - nums[i - 1] !== 1) { asc = false; break; }
        if (!asc) return true;
    }
    return false;
}
// Does any contiguous substring split into `count` consecutive integers ascending?
export function containsConsec(str, count, multiDigit) {
    const minLen = count; // each part >= 1 digit
    for (let i = 0; i < str.length; i++)
        for (let j = i + minLen; j <= str.length; j++)
            if (consecAsc(str.slice(i, j), count, multiDigit)) return true;
    return false;
}
// Two non-adjacent substrings that are consecutive integers (a then a+1, with a gap between).
// multiDigit: at least one of the two must be 2+ digits.
export function pairNearby(s, multiDigit) {
    const subs = [];
    for (let i = 0; i < s.length; i++)
        for (let j = i + 1; j <= s.length; j++) {
            const t = s.slice(i, j);
            if (validPart(t)) subs.push({ v: Number(t), i, j });
        }
    for (const a of subs)
        for (const b of subs) {
            if (a.j <= b.i && b.i - a.j >= 1 && b.v === a.v + 1) {
                if (!multiDigit || (a.j - a.i >= 2 || b.j - b.i >= 2)) return true;
            }
        }
    return false;
}

// Contiguous ascending run of L consecutive digits (each +1).
export function seqAsc(d, L) {
    for (let i = 0; i + L <= d.length; i++) {
        let ok = true;
        for (let k = 1; k < L; k++) if (d[i + k] - d[i + k - 1] !== 1) { ok = false; break; }
        if (ok) return true;
    }
    return false;
}
// Contiguous run of L consecutive digits, ascending OR descending.
export function straightRun(d, L) {
    for (let i = 0; i + L <= d.length; i++) {
        let asc = true, desc = true;
        for (let k = 1; k < L; k++) {
            if (d[i + k] - d[i + k - 1] !== 1) asc = false;
            if (d[i + k] - d[i + k - 1] !== -1) desc = false;
        }
        if (asc || desc) return true;
    }
    return false;
}

export function mountain(d) {
    const n = d.length; if (n < 3) return false;
    let i = 0;
    while (i + 1 < n && d[i] < d[i + 1]) i++;
    if (i === 0 || i === n - 1) return false;
    while (i + 1 < n && d[i] > d[i + 1]) i++;
    return i === n - 1;
}
export function valley(d) {
    const n = d.length; if (n < 3) return false;
    let i = 0;
    while (i + 1 < n && d[i] > d[i + 1]) i++;
    if (i === 0 || i === n - 1) return false;
    while (i + 1 < n && d[i] < d[i + 1]) i++;
    return i === n - 1;
}
export function hills(d) {
    if (d.length < 3) return false;
    let prev = 0;
    for (let i = 1; i < d.length; i++) {
        const diff = d[i] - d[i - 1];
        if (diff === 0) return false;
        const sign = diff > 0 ? 1 : -1;
        if (prev !== 0 && sign === prev) return false;
        prev = sign;
    }
    return true;
}
export const strictInc = d => { for (let i = 1; i < d.length; i++) if (d[i] <= d[i - 1]) return false; return d.length >= 2; };
export const strictDec = d => { for (let i = 1; i < d.length; i++) if (d[i] >= d[i - 1]) return false; return d.length >= 2; };
export const consecInc = d => { for (let i = 1; i < d.length; i++) if (d[i] - d[i - 1] !== 1) return false; return d.length >= 2; };
export const consecDec = d => { for (let i = 1; i < d.length; i++) if (d[i] - d[i - 1] !== -1) return false; return d.length >= 2; };
export const arithmetic = d => { if (d.length < 3) return false; const diff = d[1] - d[0]; for (let i = 2; i < d.length; i++) if (d[i] - d[i - 1] !== diff) return false; return true; };
export const absArith = d => { if (d.length < 3) return false; const a = Math.abs(d[1] - d[0]); for (let i = 2; i < d.length; i++) if (Math.abs(d[i] - d[i - 1]) !== a) return false; return true; };
export const turtle = d => { if (d.length < 2) return false; for (let i = 1; i < d.length; i++) if (Math.abs(d[i] - d[i - 1]) > 1) return false; return true; };
export const alternator = d => { if (d.length < 2) return false; for (let i = 1; i < d.length; i++) if (d[i] % 2 === d[i - 1] % 2) return false; return true; };
export const allSameParity = d => { if (d.length < 1) return false; const p = d[0] % 2; return d.every(x => x % 2 === p); };

// Lengths of maximal runs of identical digits, e.g. "455000" -> [1, 2, 3].
export function runLengths(s) {
    const r = [];
    let i = 0;
    while (i < s.length) { let j = i; while (j < s.length && s[j] === s[i]) j++; r.push(j - i); i = j; }
    return r;
}

export function strobogrammatic(s) {
    const map = { '0': '0', '1': '1', '6': '9', '8': '8', '9': '6' };
    let out = '';
    for (let i = s.length - 1; i >= 0; i--) { const m = map[s[i]]; if (m === undefined) return false; out += m; }
    return out === s;
}

// ---------------------------------------------------------------------------
// Prod-ported helpers: transcribed (faithful semantics) from the live game's
// BADGE_DEFINITIONS util module so the consecutive / sequence / contiguous-pair
// badges match rngdle.com byte-for-byte. Do not "simplify" without re-checking
// parity (test/divergence.mjs). These operate on the raw digit string.
// ---------------------------------------------------------------------------
export function pLeadingZero(s) { return s.length > 1 && s[0] === '0'; }
export function pMultiPart(parts) { return parts.some(p => p.length >= 2); }
export function pConsecSet(nums) { const t = [...nums].sort((a, b) => a - b); for (let i = 1; i < t.length; i++) if (t[i] - t[i - 1] !== 1) return false; return true; }
export function pDigitCounts(s) { const m = new Map(); for (const ch of s) m.set(ch, (m.get(ch) ?? 0) + 1); return m; }
export function pContig(s, digit, count) { return s.includes(digit.repeat(count)); }
export function pOrdered(nums) { if (nums.length < 2) return true; let inc = true, dec = true; for (let i = 1; i < nums.length; i++) { if (nums[i] <= nums[i - 1]) inc = false; if (nums[i] >= nums[i - 1]) dec = false; } return inc || dec; }
export function pHasSequence(s, len, strictAsc = true) {
    if (s.length < len || len <= 0) return false;
    for (let i = 0; i <= s.length - len; i++) {
        const a = s.charCodeAt(i);
        if (strictAsc) {
            let ok = true; for (let k = 1; k < len; k++) if (s.charCodeAt(i + k) !== a + k) { ok = false; break; }
            if (ok) return true;
        } else {
            const dir = s.charCodeAt(i + 1) - a;
            if (dir === 1 || dir === -1) { let ok = true; for (let k = 1; k < len; k++) if (s.charCodeAt(i + k) !== a + k * dir) { ok = false; break; } if (ok) return true; }
        }
    }
    return false;
}
export function pPairExact(s) {
    for (let t = 1; t < s.length; t++) {
        const i = s.slice(0, t), r = s.slice(t);
        if (pLeadingZero(i) || pLeadingZero(r) || !pMultiPart([i, r])) continue;
        const a = parseInt(i, 10), b = parseInt(r, 10);
        if (Math.abs(a - b) === 1) return { numbers: [a, b], splits: [0, t] };
    }
    return null;
}
// pTripleExact / pQuadExact are each asked for by TWO badges (in-order + scrambled) about
// the same string, so every second call is a guaranteed repeat - a one-entry cache halves
// the cost of the four most expensive badges in the full-range sweep. The cache lives on
// the function object rather than in module scope because these helpers are shipped to the
// browser engine via Function.prototype.toString(), which only carries the body.
export function pTripleExact(s) {
    if (pTripleExact.k !== s) { pTripleExact.k = s; pTripleExact.v = pTripleExactScan(s); }
    return pTripleExact.v;
}
export function pQuadExact(s) {
    if (pQuadExact.k !== s) { pQuadExact.k = s; pQuadExact.v = pQuadExactScan(s); }
    return pQuadExact.v;
}
export function pTripleExactScan(s) {
    for (let t = 1; t < s.length - 1; t++) for (let i = t + 1; i < s.length; i++) {
        const parts = [s.slice(0, t), s.slice(t, i), s.slice(i)];
        if (parts.some(pLeadingZero) || !pMultiPart(parts)) continue;
        const nums = parts.map(p => parseInt(p, 10));
        if (pConsecSet(nums)) return { numbers: nums, splits: [0, t, i] };
    }
    return null;
}
export function pQuadExactScan(s) {
    for (let t = 1; t < s.length - 2; t++) for (let i = t + 1; i < s.length - 1; i++) for (let r = i + 1; r < s.length; r++) {
        const parts = [s.slice(0, t), s.slice(t, i), s.slice(i, r), s.slice(r)];
        if (parts.some(pLeadingZero) || !pMultiPart(parts)) continue;
        const nums = parts.map(p => parseInt(p, 10));
        if (pConsecSet(nums)) return { numbers: nums, splits: [0, t, i, r] };
    }
    return null;
}
export function pPairAdjacent(s) {
    for (let t = 0; t < s.length; t++) for (let i = 1; i <= s.length - t - 1; i++) {
        const r = s.slice(t, t + i); if (pLeadingZero(r)) continue;
        const a = parseInt(r, 10);
        for (const v of [a + 1, a - 1]) {
            if (v < 0) continue;
            const ns = v.toString(), o = t + i + ns.length; if (o > s.length) continue;
            const seg = s.slice(t + i, o);
            if (seg === ns && pMultiPart([r, seg])) { if (t === 0 && o === s.length) continue; return { numbers: [a, v], splits: [t, t + i], start: t }; }
        }
    }
    return null;
}
export function pPairNearby(s) {
    const subs = [];
    for (let i = 0; i < s.length; i++) for (let r = 1; r <= s.length - i; r++) { const a = s.slice(i, i + r); if (!pLeadingZero(a)) subs.push({ value: parseInt(a, 10), start: i, end: i + r, str: a }); }
    for (let e = 0; e < subs.length; e++) for (let i = e + 1; i < subs.length; i++) {
        const r = subs[e], a = subs[i];
        if (Math.abs(r.value - a.value) === 1 && pMultiPart([r.str, a.str]) &&
            ((!(r.end > a.start) && !(a.end > r.start)) || r.end <= a.start || a.end <= r.start) &&
            r.end !== a.start && a.end !== r.start) return { a: r, b: a };
    }
    return null;
}
export function pNAdjacentBuild(s, start, firstLen, firstVal, dir, count) {
    const numbers = [firstVal], splits = [start]; let cursor = start + firstLen; const parts = [s.slice(start, start + firstLen)];
    for (let k = 1; k < count; k++) {
        const v = firstVal + k * dir; if (v < 0) return null;
        const vs = v.toString(); if (cursor + vs.length > s.length) return null;
        const seg = s.slice(cursor, cursor + vs.length); if (seg !== vs) return null;
        numbers.push(v); splits.push(cursor); parts.push(seg); cursor += vs.length;
    }
    return pMultiPart(parts) ? { numbers, splits, start, end: cursor } : null;
}
export function pNAdjacentAt(s, count, start) {
    if (count < 2) return null;
    for (let len = 1; len <= s.length - start - (count - 1); len++) {
        const part = s.slice(start, start + len); if (pLeadingZero(part)) continue;
        const val = parseInt(part, 10);
        const up = pNAdjacentBuild(s, start, len, val, 1, count); if (up) return up;
        const down = pNAdjacentBuild(s, start, len, val, -1, count); if (down) return down;
    }
    return null;
}
export function pNAdjacent(s, count) {
    for (let i = 0; i < s.length; i++) {
        const r = pNAdjacentAt(s, count, i);
        if (r) { if (r.start === 0 && r.end === s.length) continue; return r; }
    }
    return null;
}
// Start indices of "contiguous pairs": a digit that occurs EXACTLY twice in the whole
// number, with both occurrences adjacent ("dd"). Contiguous Two/Three Pair then look for
// 2 or 3 of these starting exactly 2 apart (ddee / ddeeff).
export function pContigPairStarts(s) {
    const counts = pDigitCounts(s);
    const starts = [];
    for (const [digit, n] of counts.entries()) {
        if (n === 2 && pContig(s, digit, 2)) {
            for (let t = 0; t < s.length - 1; t++) if (s[t] === digit && s[t + 1] === digit) { starts.push(t); break; }
        }
    }
    starts.sort((a, b) => a - b);
    return starts;
}

// ---------------------------------------------------------------------------
// Prod-ported helpers for the 2026-07-16 badge batch (Metronome / Crescendo /
// Equation / Pocket Mirror / Mini Scramble). Transcribed from the live game's
// BADGE_DEFINITIONS util module (research/rngdle-dump-2026-07-16), so these
// match rngdle.com. Verified against each badge's shipped match/reject cases and
// the published earn-probabilities. Do not "simplify" without re-checking parity.
// ---------------------------------------------------------------------------

// Partition `s` into exactly `count` non-empty parts (no leading zeros) and test
// pred(numbers); returns {splits, numbers} for the first passing split or null. (prod `_`)
export function pSplitParts(s, count, pred) {
    const splits = Array(count), nums = Array(count);
    const rec = (idx, start) => {
        if (idx === count - 1) {
            const part = s.slice(start);
            if (pLeadingZero(part)) return false;
            splits[idx] = start; nums[idx] = Number(part);
            return pred(nums);
        }
        const remaining = count - idx - 1;
        for (let end = start + 1; end <= s.length - remaining; end++) {
            const part = s.slice(start, end);
            if (pLeadingZero(part)) continue;
            splits[idx] = start; nums[idx] = Number(part);
            if (rec(idx + 1, end)) return true;
        }
        return false;
    };
    return rec(0, 0) ? { splits: [...splits], numbers: [...nums] } : null;
}
// 3+ parts forming an arithmetic sequence with common difference d where |d| >= 2
// (a diff of 0/±1 is Homogeneous / Cascade / Waterfall, not "Metronome"). (prod `S`)
export function findArithmeticSplit(s) {
    for (let count = 3; count <= s.length; count++) {
        const r = pSplitParts(s, count, nums => {
            const diff = nums[1] - nums[0];
            if (diff === -1 || diff === 0 || diff === 1) return false;
            for (let i = 2; i < nums.length; i++) if (nums[i] - nums[i - 1] !== diff) return false;
            return true;
        });
        if (r) return r;
    }
    return null;
}
// 3+ positive parts forming a geometric sequence (constant ratio via b^2 = a*c). (prod `A`)
export function findGeometricSplit(s) {
    for (let count = 3; count <= s.length; count++) {
        const r = pSplitParts(s, count, nums => {
            if (nums.some(v => v <= 0) || nums[0] === nums[1]) return false;
            for (let t = 0; t + 2 < nums.length; t++) if (nums[t + 1] * nums[t + 1] !== nums[t] * nums[t + 2]) return false;
            return true;
        });
        if (r) return r;
    }
    return null;
}
// Splits into 3 non-zero parts a,b,c where inserting one of + - * / makes a op b === c. (prod `w`)
export function findEquation(s) {
    return pSplitParts(s, 3, nums => {
        const [a, b, c] = nums;
        if (a === 0 || b === 0 || c === 0) return false;
        return a + b === c || a - b === c || a * b === c || (a % b === 0 && a / b === c);
    });
}
// Plain string palindrome (used by Pocket Mirror over substrings). (prod `r`)
export function isPalindromeStr(s) { for (let i = 0, j = s.length - 1; i < j; i++, j--) if (s[i] !== s[j]) return false; return true; }
// `s` has >= minLen digits that, sorted ascending, form a run of consecutive values. (prod `N`)
export function isScrambledSeq(s, minLen) {
    if (s.length < minLen) return false;
    const arr = [...s].map(Number).sort((a, b) => a - b);
    for (let i = 1; i < arr.length; i++) if (arr[i] !== arr[i - 1] + 1) return false;
    return true;
}