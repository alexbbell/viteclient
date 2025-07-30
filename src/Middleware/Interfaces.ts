export interface SiteLink {
  key?: string
  label: string
  url: string
}

export interface Description {
  fullname: string
  position: string
  morelink: string
  resume: string
  contacts: string
  sitemap: string
  home: string
  experience: string
  skills: string
  blogs: string
  about: string
}

export interface Beliaev {
  lang: string
  selectedPage: number
  words: Description
}
