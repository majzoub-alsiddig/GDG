// app/courses/types.ts
export type CourseCategory =
  | "Web"
  | "Android"
  | "AI"
  | "Flutter"
  | "Google Workspace"
  | "Career";

export type Course = {
  id: string;
  title: string;
  description: string;
  cover: string;
  link: string;
  category: CourseCategory;
};