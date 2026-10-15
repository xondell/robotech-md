export type Locale = "ru" | "ro" | "en";
export type LocalizedText = { ro: string; en: string; ru?: string };
export type Program = "FTC" | "FLL";
export type GalleryCategory =
  | "competition"
  | "robot"
  | "workshop"
  | "projects"
  | "awards"
  | "team";

export interface TeamMember {
  id: string;
  name: string;
  role: LocalizedText;
  programs: Program[];
  photo: string;
  alumni: boolean;
  mentor: boolean;
  bio?: LocalizedText;
}

export interface Award {
  id: string;
  year: string;
  season?: string;
  program: "FTC" | "FLL" | "Other";
  competition: LocalizedText;
  award: LocalizedText;
  stage?: LocalizedText;
  officialUrl?: string;
  photo?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: string;
  description: LocalizedText;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: LocalizedText;
  category: GalleryCategory;
  width: number;
  height: number;
}
