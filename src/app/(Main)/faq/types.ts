// app/faq/types.ts
export type FAQCategory =
  | "About GDG"
  | "Joining"
  | "Events & Activities"
  | "Community";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
};