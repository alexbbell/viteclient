import { useState, type JSX } from 'react'

const LangSelector = (): JSX.Element => {
  const [switchEditorLang, setSwitchEditorLang] = useState('en')

  const langs: string[] = ['ru', 'en', 'de', 'he']
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    {
        langs.map((el) => {
          return <div key={`langs${el}`}
          onClick={ () => {
            setSwitchEditorLang(el)
          }}
          style={{ width: '40px', fontWeight: (el === switchEditorLang) ? 'bold' : 'normal' }}
          >{el}</div>
        })
    }
     </div>
  )
}

export default LangSelector
