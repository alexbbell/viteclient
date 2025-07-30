export interface ILangSiteObjects {
  lang: string
  siteobjects: ISiteObjects
}

export interface ISocial {
  name: string
  url: string
  className: string
}

export interface IMain {
  greeting: string
  beforename: string
  name: string
  position: string
  titleAbout: string
  description: string
  image: string
  bio: string
  email: string
  phone: string
  address: string
  about: string
  website: string
  resumedownload: string
  social: ISocial[]
}

export interface IMenu {
  position: string
  resume: string
  contacts: string
  sitemap: string
  home: string
  experience: string
  skills: string
  blogs: string
  about: string
  education: string
}

export interface ISiteObjects {
  morelink: string
  fullname: string
  skills: Skills
  main: IMain
  menu: IMenu
  work: Work
  education: Education
  errorText?: string
}

export interface Skill {
  name: string
  description: string
}
export interface Skills {
  title: string
  content: Skill[]
}

export interface Education {
  title: string
  content: EducationItem[]
}

export interface EducationItem {
  school: string
  degree: string
  graduated: string
  description: string
}

export interface Work {
  title: string
  content: WorkItem[]
}

export interface WorkItem {
  company: string
  title: string
  years: string
  description: string
}

export const emptyObject: ISiteObjects = {
  morelink: '',
  education: { title: '', content: [] },
  fullname: '',
  main: { about: '', address: '', beforename: '', bio: '', description: '', email: '', greeting: '', image: '', name: '', phone: '', position: '', resumedownload: '', social: [], titleAbout: '', website: '' },
  menu: { about: '', blogs: '', contacts: '', education: '', experience: '', home: '', position: '', resume: '', sitemap: '', skills: '' },
  skills: { title: '', content: [] },
  work: { title: '', content: [] }
}
export const emptyLangObject: ILangSiteObjects = {
  lang: 'en',
  siteobjects: emptyObject
}

export interface ILoginData {
  username: string
  password: string
  rememberMe?: boolean
}

export interface ITokenApiModel {
  accessToken?: string
  // refreshToken?: string
}
