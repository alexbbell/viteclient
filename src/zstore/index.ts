import { create } from 'zustand'
import { langs } from '../consts';


interface LangState {
  langs: string[],
  selectedLang: string,
  addLang: (user: string) => void;
  switchLang: (lng: string) => void;
  // updateLang: (id: number, value: string) => void
}



export const useLangStore = create<LangState>((set) => ({
  langs: langs,
  selectedLang : localStorage.getItem('lang') ?? 'en',

  addLang: (lang) => set((state) => ({ langs: [...state.langs, lang] })),
  switchLang: (lang) => {
    const selectedLangIdx = langs .findIndex(x => x === lang)
    
    set(() => ({
      selectedLang: langs[selectedLangIdx]
    }))
  },
//  updateLang: (id, value) =>
//     set((state) => ({
//       langs: state.langs.map((u) =>
//         u.id === id ? { ...u, title: value } : u
//       ),
//       // keep selectedLang in sync if it’s the one being updated
//       selectedLang:
//         state.selectedLang.id === id
//           ? { ...state.selectedLang, title: value }
//           : state.selectedLang,
//     })),
}));
