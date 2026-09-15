// app/home/types.ts
export type EventItem = {
  id: string;
  title: string;
  category: "Workshop" | "Talk" | "Study Jam" | "Meetup";
  cover: string;
  date: string; // ISO date
  location: string;
  link: string;
};

export type FeaturedCourse = {
  id: string;
  title: string;
  description: string;
  cover: string;
  link: string;
  category: string;
};

export type CommunityStat = {
  value: string;
  label: string;
  accent: "blue" | "red" | "yellow" | "green";
};