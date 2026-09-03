/**
 * The 6 rules, as content.
 *
 * Titles are fixed by Ryan's brief and are not paraphrased, except that
 * rule 03 carries a numeral: Build Spec v2 section 13 requires numerals
 * rather than spelled out numbers, and the spec's own section 4 calls it
 * "the number we are held to". Each line is the
 * rule's supporting statement, held to a single sentence so the section
 * never becomes content heavy. Nothing here encodes an invented figure: 03
 * names the documented metric and shows no value.
 */
export const RULES = [
  {
    n: "01",
    title: "Diagnosis before prescription",
    line: "The assessment produces the scope. The scope produces the program.",
  },
  {
    n: "02",
    title: "Frequency is fixed. Geography scales.",
    line: "3 times weekly at every level. A larger program buys territory, never noise.",
  },
  {
    n: "03",
    title: "1 number we are held to",
    line: "Cost per booked call. It falls while the phone gets busier.",
  },
  {
    n: "04",
    title: "Every claim carries proof nearby",
    line: "If we cannot show it, we do not say it.",
  },
  {
    n: "05",
    title: "We tell you who we are not for",
    line: "The wrong buyer feeling disqualified is the system working.",
  },
  {
    n: "06",
    title: "Own attention. Do not rent it.",
    line: "Anything you stop paying for and immediately lose was never an asset.",
  },
] as const;
