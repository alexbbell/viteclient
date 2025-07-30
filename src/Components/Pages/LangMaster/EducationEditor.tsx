import React, { useState, useEffect } from 'react'
import { type EducationItem } from './BLLangMaster'
import formstyles from './LangMaster.module.scss'

const EducationEditor = (props: any): JSX.Element => {
  const [swEdu, setSwEdu] = useState<EducationItem[]>([])
  // const swEdu: EducationItem[] = props.data
  useEffect(() => {
    setSwEdu(props.data)
  }, [props.data])
  return (
    <>
      <h1 key='h1edu'>Education</h1>
      {
        swEdu.map((edu, index) => {
          return <div key={`j${index}`}>
            Degree: <input key={`dddeg${index}`} value={edu.degree} className={formstyles.inputText}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                evt.preventDefault()
                const t = { ...swEdu }
                t[index].degree = evt.currentTarget.value
                props.fnc(t)
              }} /><br />
          </div>
        })
      }
     <br />
    </>
  )
}

export default EducationEditor
