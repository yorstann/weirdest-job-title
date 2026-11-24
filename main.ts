import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// one-line entry for make.fun's "Weirdest Job Title: Blind Judge Showdown" bounty: the weirdest job title, picturable at a glance.
// Pass 2: split into role + setting; the contradiction is the whole job — a man paid to shout where shouting is forbidden.
const ENTRY_BEATS = [
  "Town Crier",
  "for a Silent Retreat",
] as const;


export function buildEntryWord(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_TEXT = buildEntryWord();

const MAX_CHARS = 60;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_TEXT)) {
  throw new Error(
    `entry must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_TEXT)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
