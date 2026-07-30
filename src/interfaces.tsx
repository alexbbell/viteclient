import { settings } from "./config";

export interface SiteContent {
  morelink: string;
  fullname: string;
  main: MainContent;
  menu: MenuContent;
  skills: SkillsSection;
  work: WorkSection;
  education: EducationSection;
  theGame: GameSection;
}

/* -------------------- MAIN -------------------- */

export interface MainContent {
  greeting: string;
  beforename: string;
  name: string;
  position: string;
  titleAbout: string;
  description: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  website: string;
  resumedownload: string;
  social: SocialLink[];
}

export interface SocialLink {
  name: string;
  url: string;
  className: string;
}

/* -------------------- MENU -------------------- */

export interface MenuContent {
  position: string;
  resume: string;
  contacts: string;
  sitemap: string;
  home: string;
  experience: string;
  skills: string;
  blogs: string;
  about: string;
  education: string;
  math: string;
  services: string;
}

/* -------------------- SKILLS -------------------- */

export interface SkillsSection {
  title: string;
  content: SkillItem[];
}

export interface SkillItem {
  name: string;
  description: string;
}

/* -------------------- WORK -------------------- */

export interface WorkSection {
  title: string;
  content: WorkItem[];
}

export interface WorkItem {
  company: string;
  title: string;
  years: string;
  description: string;
}

/* -------------------- EDUCATION -------------------- */

export interface EducationSection {
  title: string;
  content: EducationItem[];
}

export interface EducationItem {
  school: string;
  degree: string;
  graduated: string;
  description: string;
}

/* -------------------- GAME SECTION -------------------- */

export interface GameSection {
  chooseAnwer: string;
  next: string;
  gameTitle: string;
  settings: string;
  action: string;
  addition: string;
  subtraction: string;
  multiplication: string;
  division: string;
  minValue: string;
  maxValue: string;
  errorMinMaxText: string;
}





export interface IStaticPage {
  query: string
  title?: string
}

export interface INewsAnons {
  id: number
  date: Date
  status: string
  title: string
  excerpt: string
  link: string
}

// For analogclock
export interface IPoint {
  x: number
  y: number
}
export interface IWatch {
  sec: IPoint
  min: IPoint
  hour: IPoint
}
export interface IClockParams {
  size: number
}

export interface ITestimonial {
  author: string
  img: string
  text: string
  position?: string
  link?: string
}

export interface ITestimonials {
  posts: ITestimonial[]
}


export interface IConsultFormDto extends IConsultForm {
    id: number;
    theName: string;
    created: Date;
    status: string;
    question: string;
}

export type PaginatedResponse = {
    items: IConsultFormDto[],
    totalCount: number
};

export const defaultIConsultFormDto: IConsultFormDto = {
    id: 0,
    theName: '',
    created: new Date(),
    status: '',
    email: '',
    subject: '',
    question: ''
}

export interface IConsultForm {
    email: string, 
    theName: string,
    subject: string,
    question: string,
}
export const defaultConsultForm: IConsultForm = (settings.mode === 'development') ? {
    email: 'no@mail.ru',
    theName: 'No Name',
    subject: 'Anfrage',
    question: ''
} : {
    email: '',
    theName: '',
    subject: '',
    question: ''
}

export interface WPImageProps {
  media?: number;
  className?: string;
}

export interface LangSwitchProps {
  query?: string
}