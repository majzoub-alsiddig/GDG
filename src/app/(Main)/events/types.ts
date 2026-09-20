export type EventCategory = "Workshop" | "Talk" | "Study Jam" | "Meetup";

export type Event = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: EventCategory;
  cover: string;
  date: string;
  endDate?: string;
  location: string;
  link: string;
  isFeatured: boolean;
};