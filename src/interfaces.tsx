

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
export const defaultConsultForm: IConsultForm = {
    email: 'no@mail.ru',
    theName: 'No Name',
    subject: 'Anfrage',
    question: ''
}