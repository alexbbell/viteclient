import React, { useEffect, useState } from 'react'
import { type Skill } from './BLLangMaster'
import formstyles from './LangMaster.module.scss'

const SkillsEditor = (props: any): JSX.Element => {
  const [swSkills, setSwSkills] = useState<Skill[]>([])
  const [newRow, addNewRow] = useState<number>(0)
  useEffect(() => {
    setSwSkills(props.data)
  }, [props, newRow])

  return (
    <>

      <h1>Skills</h1>
      <div onClick={ () => {
        const newSkill: Skill = { name: '', description: '' }
        swSkills.push(newSkill)
        const nr = newRow + 1
        addNewRow(nr)
        setSwSkills(swSkills)
      }}><span style={{ fontSize: 20 }}>+</span>Add new row</div>
      {
      swSkills.map((sk, index) => {
        return <div key={`sk${index}`} className={`${formstyles.arrayItem}`}>
<div>
  <div className={formstyles.remove} onClick={ () => {
    const newskills = swSkills
    newskills.splice(index, 1)
    setSwSkills(newskills)
    const nr = newRow - 1
    addNewRow(nr)
  }}><span>-</span> Remove row</div>
          <input type='text' value={String(sk.name)}
style={{ width: '100%' }}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              const t = swSkills
              t[index].name = evt.currentTarget.value
              props.fnc(t)
            }} />
          <br />
          <textarea key={`dd${sk.name}`} value={String(sk.description)} cols={65} rows={5}
            onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
              const t = swSkills
              t[index].description = evt.currentTarget.value
              props.fnc(t)
            }} /><br />
            </div>
        </div>
      })
    }
     <br />
    </>
  )
}

export default SkillsEditor
