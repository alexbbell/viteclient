import React, { useEffect, useState } from 'react'
import { Row, Col, Space, Input, type CollapseProps, Collapse, Button, Popconfirm, message } from 'antd'
import styles from './../../../style/style.module.scss'
import formstyles from './LangMaster.module.scss'
import { emptyObject, type Skill, type ISiteObjects, type WorkItem, type EducationItem, type ISocial, type ITokenApiModel } from './BLLangMaster'
import { GetLangContent, updateSkills } from './ApiRequests'
import LangSelector from './LangSelector'
import SkillsEditor from './SkillsEditor'
import TextArea from 'antd/es/input/TextArea'
import { useAppSelector } from './../../../hooks'

const LangManager = (): JSX.Element => {
  const selectedGlobalLang = useAppSelector(state => state.lang.lang)
  const [selectedLang, setSelectedLang] = useState(selectedGlobalLang)
  const [content, setContent] = useState<ISiteObjects>(emptyObject)

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const lsToken: string | null = localStorage.getItem('userToken')

  let bearerToken: ITokenApiModel = {}
  if (lsToken !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bearerToken = JSON.parse(lsToken)
  }
  // const tokenApi: ITokenApiModel = useAppSelector(state => state.lang.userToken)
  // console.log({ tokenApi })
  // const refreshToken: string | null = useAppSelector(state => state.lang.userToken)

  const switchLangEdit = (lang: string): void => {
    setSelectedLang(lang)
  }

  // Implementation drag n drop for work
  const dragItem = React.useRef<number>(0)
  const dragOverItem = React.useRef<number>(0)

  const handleSortWork = (): void => {
    const prevItems = content
    const _items = [...content.work.content]
    const draggedItemContent = _items.splice(dragItem.current, 1)[0]
    _items.splice(dragOverItem.current, 0, draggedItemContent)

    dragItem.current = 0
    dragOverItem.current = 0
    prevItems.work.content = _items
    setContent({ ...prevItems })
  }

  const readdata = async (): Promise<void> => {
    const siteData: ISiteObjects = await GetLangContent(selectedLang, bearerToken)
    // if (siteData.errorText !== '' || siteData.errorText !== '') console.log('Error in useffex', siteData.errorText)
    // const eduData: ISiteObjects = await GetLangContent(selectedLang)
    setIsLoaded(true)
    setContent(siteData)
  }

  const reloadSkills = (newSkills: Skill[]): void => {
    const t = content
    t.skills.content = newSkills
    setContent({ ...t })
  }

  useEffect(() => {
    void readdata()
  }, [selectedLang])

  const jsxInputText = (fieldName: 'address' | 'beforename' | 'bio' | 'description' | 'email' | 'fullname' | 'greeting' | 'image' | 'name' | 'phone' | 'position' | 'resumedownload' | 'social' | 'titleAbout' | 'website'
  | 'resume' | 'contacts' | 'sitemap' | 'home' | 'experience' | 'skills' | 'blogs' | 'about' | 'education'): JSX.Element => {
    let cValue = ''
    if (fieldName === 'address') cValue = content.main.address
    if (fieldName === 'beforename') cValue = content.main.beforename
    if (fieldName === 'bio') cValue = content.main.bio
    if (fieldName === 'description') cValue = content.main.description
    if (fieldName === 'email') cValue = content.main.email
    if (fieldName === 'fullname') cValue = content.fullname
    if (fieldName === 'greeting') cValue = content.main.greeting
    if (fieldName === 'image') cValue = content.main.image
    if (fieldName === 'name') cValue = content.main.name
    if (fieldName === 'phone') cValue = content.main.phone
    if (fieldName === 'position') cValue = content.main.position
    if (fieldName === 'resumedownload') cValue = content.main.resumedownload
    if (fieldName === 'website') cValue = content.main.website
    if (fieldName === 'titleAbout') cValue = content.main.titleAbout
    if (fieldName === 'resume') cValue = content.menu.resume
    if (fieldName === 'contacts') cValue = content.menu.contacts
    if (fieldName === 'sitemap') cValue = content.menu.sitemap
    if (fieldName === 'home') cValue = content.menu.home
    if (fieldName === 'experience') cValue = content.menu.experience
    if (fieldName === 'skills') cValue = content.menu.skills
    if (fieldName === 'blogs') cValue = content.menu.blogs
    if (fieldName === 'about') cValue = content.menu.about
    if (fieldName === 'education') cValue = content.menu.education

    return (
      <div className={formstyles.formRow}>
      <div key={fieldName}>
    <label>{fieldName}</label></div>
    <div>
    <Input type='text' value={`${cValue}`} aria-label={fieldName} width={400}
      onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
        const t = content
        if (fieldName === 'address') t.main.address = evt.currentTarget.value
        if (fieldName === 'beforename') t.main.beforename = evt.currentTarget.value
        if (fieldName === 'bio') t.main.bio = evt.currentTarget.value
        if (fieldName === 'description') t.main.description = evt.currentTarget.value
        if (fieldName === 'email') t.main.email = evt.currentTarget.value
        if (fieldName === 'fullname') t.fullname = evt.currentTarget.value
        if (fieldName === 'greeting') t.main.greeting = evt.currentTarget.value
        if (fieldName === 'image') t.main.image = evt.currentTarget.value
        if (fieldName === 'name') t.main.name = evt.currentTarget.value
        if (fieldName === 'phone') t.main.phone = evt.currentTarget.value
        if (fieldName === 'position') t.main.position = evt.currentTarget.value
        if (fieldName === 'resumedownload') t.main.resumedownload = evt.currentTarget.value
        if (fieldName === 'website') t.main.website = evt.currentTarget.value
        if (fieldName === 'titleAbout') t.main.titleAbout = evt.currentTarget.value
        if (fieldName === 'resume') t.menu.resume = evt.currentTarget.value
        if (fieldName === 'contacts') t.menu.contacts = evt.currentTarget.value
        if (fieldName === 'sitemap') t.menu.sitemap = evt.currentTarget.value
        if (fieldName === 'home') t.menu.home = evt.currentTarget.value
        if (fieldName === 'experience') t.menu.experience = evt.currentTarget.value
        if (fieldName === 'skills') t.menu.skills = evt.currentTarget.value
        if (fieldName === 'blogs') t.menu.blogs = evt.currentTarget.value
        if (fieldName === 'about') t.menu.about = evt.currentTarget.value
        if (fieldName === 'education') t.menu.education = evt.currentTarget.value
        setContent({ ...t })
      } } /></div>
      </div>
    )
  }

  const jsxLangComponent = (alldata: ISiteObjects): JSX.Element => (
    <div>
      <>{jsxInputText('fullname')}</>
      <>{jsxInputText('resume')}</>
      <>{jsxInputText('contacts')}</>
      <>{jsxInputText('sitemap')}</>
      <>{jsxInputText('home')}</>
      <>{jsxInputText('experience')}</>
      <>{jsxInputText('skills')}</>
      <>{jsxInputText('blogs')}</>
      <>{jsxInputText('about')}</>
      <>{jsxInputText('education')}</>

      <br />

      <>{jsxInputText('image')}</>
      <br />
      <>{jsxInputText('image')}</>
      <>{jsxInputText('bio')}</>
      <>{jsxInputText('email')}</>
      <>{jsxInputText('phone')}</>
      <div key='description'>
        <label>description at the 1st page</label>
        <TextArea value={`${content.main.description}`} aria-label='description' rows={6}
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            const t = content
            t.main.description = evt.currentTarget.value
            setContent({ ...t })
          } } /></div>

<div key='about'>
        <label>about</label>
        <TextArea value={`${content.main.about}`} aria-label='about' rows={15}
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            const t = content
            t.main.about = evt.currentTarget.value
            setContent({ ...t })
          } } /></div>
    </div>
  )

  const jsxWork = (alldata: ISiteObjects): JSX.Element => <>
    <h1 key='h1edu'>Work</h1>
    <div onClick={ () => {
      const t = content
      const newWork: WorkItem = { company: '', description: '', title: '', years: '' }
      t.work.content.push(newWork)
      setContent({ ...t })
    }}><span style={{ fontSize: 20 }}>+</span>Add new row</div>
    {content.work.content.map((edu, index) => {
      return <div key={`j${index}`} className={formstyles.arrayItem}
      draggable
      onDragStart={ () => { dragItem.current = index } }
      onDragEnter={ () => { dragOverItem.current = index } }
      onDragEnd={ handleSortWork }
      onDragOver={ (e) => { e.preventDefault() }}
      >

<div>
<Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
  onConfirm={ (e) => {
    const newWorks = content
    newWorks.work.content.splice(index, 1)
    setContent({ ...newWorks })
    void message.info(`the row # ${index} removed`)
  }}
  onCancel={ () => {
    void message.success('canceled')
  }}
    // onConfirm={ confirm }
    // onCancel={ cancel }
    okText="Yes"
    cancelText="No"
  >
        <Button danger>Delete</Button>
  </Popconfirm><br />
  </div>
        Title: <input key={`dddeg${index}`} value={edu.title} className={formstyles.inputText}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            evt.preventDefault()
            const t = { ...content }
            t.work.content[index].title = evt.currentTarget.value
            setContent({ ...t })
          } } /><br />
        company <input key={'schoold'} value={String(edu.company)} className={formstyles.inputText}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            const t = { ...content }
            t.work.content[index].company = evt.currentTarget.value
            setContent({ ...t })
          } } /><br />
        years: <input key={'grad'} value={String(edu.years)} className={formstyles.inputText}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            const t = { ...content }
            // t.content[index].graduated = evt.currentTarget.value
            t.work.content[index].years = evt.currentTarget.value
            setContent({ ...t })
          } } /><br />
        <textarea key={'ddescr'} value={String(edu.description)} cols={65} rows={5}
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
            const t = { ...content }
            t.work.content[index].description = evt.currentTarget.value
            setContent({ ...t })
          } } />
      </div>
    })}
  </>

  const jsxEducation = (alldata: ISiteObjects): JSX.Element => {
    return <>
    <h1 key='h1edu'>Education</h1>
    <div onClick={ () => {
      const t = content
      const newEdu: EducationItem = { degree: '', description: '', graduated: '', school: '' }
      t.education.content.push(newEdu)
      setContent({ ...t })
    }}><span style={{ fontSize: 20 }}>+</span>Add new row</div>
    {
      content.education.content.map((edu, index) => {
        return <div key={`j${index}`}>
<div className={formstyles.remove} onClick={ () => {
  const newEducations = content
  newEducations.education.content.splice(index, 1)
  setContent({ ...newEducations })
}}><span>-</span> Remove row</div>
          Degree: <input key={`dddeg${index}`} value={edu.degree} className={formstyles.inputText}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              evt.preventDefault()
              const t = { ...content }
              t.education.content[index].degree = evt.currentTarget.value
              setContent({ ...t })
            }} /><br />
            School <input key={'schoold'} value={String(edu.school)} className={formstyles.inputText}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                const t = { ...content }
                t.education.content[index].school = evt.currentTarget.value
                setContent({ ...t })
              }} /><br />
            graduated: <input key={'grad'} value={String(edu.graduated)} className={formstyles.inputText}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                const t = { ...content }
                // t.content[index].graduated = evt.currentTarget.value
                t.education.content[index].graduated = evt.currentTarget.value
                setContent({ ...t })
              }} /><br />
            <textarea key={'ddescr'} value={String(edu.description)} cols={65} rows={5}
              onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                const t = { ...content }
                t.education.content[index].description = evt.currentTarget.value
                setContent({ ...t })
              }} />
        </div>
      })
    }
   <br />
  </>
  }

  const jsxSocial = (alldata: ISiteObjects): JSX.Element => {
    return <>
    <h1 key='h1soc'>Social</h1>
    <div onClick={ () => {
      const t = content
      const newSoc: ISocial = { className: '', name: '', url: '' }
      t.main.social.push(newSoc)
      setContent({ ...t })
    }}><span style={{ fontSize: 20 }}>+</span>Add new row</div>
    {
      content.main.social.map((soc, index) => {
        return <div key={`j${index}`}>
<div className={formstyles.remove} onClick={ () => {
  const socials = content
  socials.main.social.splice(index, 1)
  setContent({ ...socials })
}}><span>-</span> Remove row</div>
          Name: <input key={`dddeg${index}`} value={soc.name} className={formstyles.inputText}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              evt.preventDefault()
              const t = { ...content }
              t.main.social[index].name = evt.currentTarget.value
              setContent({ ...t })
            }} /><br />
            URL <input key={'schoold'} value={String(soc.url)} className={formstyles.inputText}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                const t = { ...content }
                t.main.social[index].url = evt.currentTarget.value
                setContent({ ...t })
              }} /><br />
            className: <input key={'grad'} value={String(soc.className)} className={formstyles.inputText}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                const t = { ...content }
                // t.content[index].graduated = evt.currentTarget.value
                t.main.social[index].className = evt.currentTarget.value
                setContent({ ...t })
              }} /><br />
        </div>
      })
    }
   <br />
  </>
  }

  const GetCollapseProps = (lang: string): CollapseProps['items'] => {
    const items: CollapseProps['items'] = [
      {
        key: 'cp1',
        label: 'Main',
        children: <>{jsxLangComponent(content)}</>
      },
      {
        key: 'cp4',
        label: 'Work',
        children: <>{jsxWork(content)}</>
      },
      {
        key: 'cp2',
        label: 'Skills',
        // children: <>{skillJSX(content)}</>
        children: <SkillsEditor data={content.skills.content} fnc={reloadSkills} />
      },
      {
        key: 'cp3',
        label: 'Education',
        // children: <EducationEditor data={education} fnc={reloadEdu} />
        children: <>{jsxEducation(content)}</>
      },
      {
        key: 'cp5',
        label: 'Social',
        children: <>{jsxSocial(content)}</>
      }

    ]
    return items
  }

  return (
<>
<Row className={`${styles.pb40} ${styles.pt40}`}>
    <Col xs={1} md={1} lg={1}></Col>
    <Col xs={21} md={21} lg={21}>
      <LangSelector data={switchLangEdit} />
      <br />
    {
  !isLoaded &&
  (
    <div>...Loading  </div>
  )
  }
{
  isLoaded && (
    <>
    {
      content.errorText !== null && (
        <b>{content.errorText}</b>
      )
    }

    {
    content.errorText === undefined && (
      <>
      {content.errorText}
        <h1>Content Editor</h1>
        <Collapse items={GetCollapseProps('ru')} defaultActiveKey={['cp4']} />

        {
          (bearerToken !== undefined && bearerToken.accessToken !== '') && (
            <Button type="primary" onClick={(evt: any) => {
              evt.preventDefault()
              updateSkills(selectedLang, content, bearerToken)
            }}>Update Skills {selectedLang}</Button>
          )

        }
        </>
    )
  }
    </>
  )
}

</Col>
    </Row>
    <Space></Space>

</>
  )
}
export default LangManager
