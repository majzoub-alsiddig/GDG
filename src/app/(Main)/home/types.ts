// src/app/(Main)/home/types.ts
export type EventItem = {
  id: string;
  title: string;
  category: string;
  cover: string;
  date: string;
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
