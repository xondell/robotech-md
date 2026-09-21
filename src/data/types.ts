export type Locale = "ro" | "en";
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
  role: Record<Locale, string>;
  programs: Program[];
  photo: string;
  alumni: boolean;
  mentor: boolean;
  bio?: Record<Locale, string>;
}

export interface Award {
  id: string;
  year: string;
  season?: string;
  program: "FTC" | "FLL" | "Other";
  competition: Record<Locale, string>;
  award: Record<Locale, string>;
  stage?: Record<Locale, string>;
  officialUrl?: string;
  photo?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: string;
  description: Record<Locale, string>;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: Record<Locale, string>;
  category: GalleryCategory;
  width: number;
  height: number;
}
