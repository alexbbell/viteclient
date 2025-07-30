import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { emptyObject, type ITokenApiModel, type ISiteObjects } from './BLLangMaster'
import { mainUrl } from '../../../config'

export function updateSkills (lang: string, newContent: ISiteObjects, tokenApi: ITokenApiModel): void {
  const langApiUrl: string = mainUrl + '?lang=' + lang
  void axios.post(langApiUrl, newContent,
    {
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${tokenApi.accessToken}`
      }
    }).then(res => {
    console.log('res update', res.data)
  })
}

export const GetLangContent = async (lang: string, tokenApi: ITokenApiModel): Promise<ISiteObjects> => {
  let data: ISiteObjects = emptyObject
  await axios.get(mainUrl + lang,
    {
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${tokenApi.accessToken}`
      }
    }).then((response: AxiosResponse) => {
    data = response.data
    return data
  }).catch((err: AxiosError) => {
    data = emptyObject
    data.errorText = err.message
    return data
  })
  return data
}
