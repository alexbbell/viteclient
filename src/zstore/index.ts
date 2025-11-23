import { create } from 'zustand'
import { langs } from '../consts';
import type { ITokenApiModel } from '../Components/Pages/LangMaster/BLLangMaster';
import type { IMathSettings } from '../Components/Mathema/inttypes';


interface LangState {
  langs: string[],
  selectedLang: string,
  addLang: (user: string) => void;
  switchLang: (lng: string) => void;
  // updateLang: (id: number, value: string) => void
  msettings: IMathSettings;
  setMathSettings: (settings: IMathSettings) => void;
      
  userToken: ITokenApiModel
  setUserToken?: (tokenModel: ITokenApiModel) => void;
}



export const useLangStore = create<LangState>((set) => ({
  langs: langs,
  selectedLang : localStorage.getItem('lang') ?? 'en',
  msettings: { minValue: 0, maxValue: 10, mathAction: 'addition' } satisfies IMathSettings,
  userToken: localStorage.getItem('userToken') ?? { accessToken: '' } satisfies ITokenApiModel,

  addLang: (lang) => set((state) => ({ langs: [...state.langs, lang] })),
  switchLang: (lang) => {
    const selectedLangIdx = langs .findIndex(x => x === lang)
    
    set(() => ({
      selectedLang: langs[selectedLangIdx]
    }))
  },

  setMathSettings: (msettings) =>  {
    set(() => ({
      msettings: {
          mathAction: msettings.mathAction,
          maxValue: msettings.maxValue,
          minValue: msettings.minValue
        }
      
    } ))
  },
  
  setUserToken : (tokenModel:ITokenApiModel) =>  {
    set( () => ({
      userToken: {
        accessToken: tokenModel.accessToken === undefined ? '' : tokenModel.accessToken
        // refreshToken: action.payload.refreshToken === undefined ? '' : action.payload.refreshToken
      }

    })
    ) 
  }
}))