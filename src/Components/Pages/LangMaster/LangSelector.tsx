import React, { useState } from 'react'

const LangSelector = (props: any): JSX.Element => {
  const [switchEditorLang, setSwitchEditorLang] = useState('en')

  const langs: string[] = ['ru', 'en', 'de', 'he']
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    {
        langs.map((el) => {
          return <div key={`langs${el}`}
          onClick={ () => {
            setSwitchEditorLang(el)
            props.data(el)
          }}
          style={{ width: '40px', fontWeight: (el === switchEditorLang) ? 'bold' : 'normal' }}
          >{el}</div>
        })
    }
     </div>
  )
}

export default LangSelector
