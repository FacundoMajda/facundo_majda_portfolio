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
  link: string;
  color: string;
}

export interface MenuItem {
  name: string;
  href: string;
  color: string;
}
