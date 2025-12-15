export interface StackItem {
  name: string;
  icon: string;
}

export interface StackCategory {
  name: string;
  items: StackItem[];
  icon: React.ReactElement;
}

export interface EducationItem {
  institution: string;
  degree: string;
  date: string;
  desc: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  desc: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tech: string[];
  desc: string;
  /** Optional long description shown in a modal or detail view */
  longDesc?: string;
  /** Optional evidence entries (presentations, repos, images) */
  evidence?: {
    title: string;
    link?: string;
    note?: string;
    images?: string[]; // urls to images/screenshots
    type?: "repo" | "image" | "video" | "other";
  }[];
  /** Optional canonical project PDF (presentation/spec) shown in its own section */
  projectPdf?: { title: string; link: string; note?: string };
  /** Optional development notes (author-written) with optional date */
  devNotes?: { date?: string; content: string; author?: string }[];
  link: string;
  color: string;
}

export interface MenuItem {
  name: string;
  href: string;
  color: string;
}
