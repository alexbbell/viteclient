export interface IAppSettings {
    baseUrl: string, 
    mainUrl: string, 
    authUrl: string, 
    pubDir: string, 
    mode: string,
    apiUrl: string,
    blogUrl: string,
}

export const settings:IAppSettings = {
    baseUrl: import.meta.env.VITE_REACT_APP_URL,
    mainUrl: "",
    authUrl: "",
    apiUrl:  import.meta.env.VITE_REACT_APP_API_URL,
    pubDir: import.meta.env.VITE_PUBDIR,
    mode: import.meta.env.MODE,
    blogUrl: import.meta.env.VITE_BLOG_URL
}

export const siteLang = localStorage.getItem('lang') ?? 'en'

