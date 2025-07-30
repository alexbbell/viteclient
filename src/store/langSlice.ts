import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IMathSettings } from '../Components/Mathema/inttypes'
import { type ITokenApiModel } from '../Components/Pages/LangMaster/BLLangMaster'

const langSlice = createSlice({
  name: 'lanswitch',
  initialState: {
    lang: 'en',
    selectedPage: 1,
    mathSettings: { minValue: 0, maxValue: 10, mathAction: 'addition' } satisfies IMathSettings,
    userToken: { accessToken: '' } satisfies ITokenApiModel
    // userToken: (localStorage.getItem('userToken') === null) ? { accessToken: '', refreshToken: '' } : localStorage.getItem('userToken')
  },

  reducers: {
    switchLang (state, action: PayloadAction<string>) {
      state.lang = action.payload // (action.payload ) ? action.payload : 'en'
    },
    switchPage (state, action: PayloadAction<number>) {
      state.selectedPage = action.payload
    },
    setMathSettings (state, action: PayloadAction<IMathSettings>) {
      state.mathSettings = {
        mathAction: action.payload.mathAction,
        maxValue: action.payload.maxValue,
        minValue: action.payload.minValue
      }
    },
    saveUserToken (state, action: PayloadAction<ITokenApiModel>) {
      state.userToken = {
        accessToken: action.payload.accessToken === undefined ? '' : action.payload.accessToken
        // refreshToken: action.payload.refreshToken === undefined ? '' : action.payload.refreshToken
      }
    }
  }
})

export const { switchLang, switchPage, setMathSettings, saveUserToken } = langSlice.actions

export default langSlice.reducer
