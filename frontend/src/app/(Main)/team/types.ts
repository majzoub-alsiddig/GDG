// app/team/types.ts
export type TeamCategory = "Leadership" | "Technical" | "Media" | "Operations";

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  about: string;
  photo: string;
  category: TeamCategory;
  socials: SocialLinks;
};