import  {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  type JSX,
} from 'react'
import {
  Row,
  Col,
  Space,
  Input,
  type CollapseProps,
  Collapse,
  Button,
  Popconfirm,
  message,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'

import styles from './../../../style/style.module.scss'
import formstyles from './LangMaster.module.scss'
import {
  emptyObject,
  type Skill,
  type ISiteObjects,
  type WorkItem,
  type EducationItem,
  type ISocial,
  type ITokenApiModel,
} from './BLLangMaster'
import { GetLangContent, updateSkills } from './ApiRequests'
import LangSelector from './LangSelector'
import SkillsEditor from './SkillsEditor'
import { useLangStore } from '../../../zstore'


type FieldName =
  | 'address'
  | 'beforename'
  | 'bio'
  | 'description'
  | 'email'
  | 'fullname'
  | 'greeting'
  | 'image'
  | 'name'
  | 'phone'
  | 'position'
  | 'resumedownload'
  | 'social'
  | 'titleAbout'
  | 'website'
  | 'resume'
  | 'contacts'
  | 'sitemap'
  | 'home'
  | 'experience'
  | 'skills'
  | 'blogs'
  | 'about'
  | 'education'

const LangManager = (): JSX.Element => {
  
  const selectedGlobalLang = useLangStore(state => state.selectedLang)

  //const [selectedLang, setSelectedLang] = useState(selectedGlobalLang)
  const selectedLang = selectedGlobalLang
  const [content, setContent] = useState<ISiteObjects>(emptyObject)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Token
  const bearerToken = useMemo<ITokenApiModel | null>(() => {
    const lsToken = localStorage.getItem('userToken')
    if (!lsToken) return null
    try {
      return JSON.parse(lsToken) as ITokenApiModel
    } catch {
      return null
    }
  }, [])

  // Drag & Drop for work
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const handleSortWork = useCallback(() => {
    setContent(prev => {
      if (
        dragItem.current == null ||
        dragOverItem.current == null ||
        dragItem.current === dragOverItem.current
      ) {
        return prev
      }

      const items = [...prev.work.content]
      const draggedItemContent = items.splice(dragItem.current, 1)[0]
      items.splice(dragOverItem.current, 0, draggedItemContent)

      dragItem.current = null
      dragOverItem.current = null

      return {
        ...prev,
        work: {
          ...prev.work,
          content: items,
        },
      }
    })
  }, [])

  const readdata = useCallback(async () => {
    try {
      const siteData: ISiteObjects = await GetLangContent(
        selectedLang,
        bearerToken ?? {},
      )
      setContent(siteData)
    } finally {
      setIsLoaded(true)
    }
  }, [selectedLang, bearerToken])

  const reloadSkills = useCallback((newSkills: Skill[]): void => {
    setContent(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        content: newSkills,
      },
    }))
  }, [])

  useEffect(() => {
    void readdata()
  }, [readdata])

  // ---- Text fields mapping ----

  const fieldConfig: Record<
    FieldName,
    {
      label: string
      getValue: (c: ISiteObjects) => string
      setValue: (c: ISiteObjects, value: string) => ISiteObjects
    }
  > = {
    address: {
      label: 'address',
      getValue: c => c.main?.address ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, address: value },
      }),
    },
    beforename: {
      label: 'beforename',
      getValue: c => c.main?.beforename ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, beforename: value },
      }),
    },
    bio: {
      label: 'bio',
      getValue: c => c.main?.bio ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, bio: value },
      }),
    },
    description: {
      label: 'description',
      getValue: c => c.main?.description ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, description: value },
      }),
    },
    email: {
      label: 'email',
      getValue: c => c.main?.email ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, email: value },
      }),
    },
    fullname: {
      label: 'fullname',
      getValue: c => c.fullname ?? '',
      setValue: (c, value) => ({
        ...c,
        fullname: value,
      }),
    },
    greeting: {
      label: 'greeting',
      getValue: c => c.main?.greeting ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, greeting: value },
      }),
    },
    image: {
      label: 'image',
      getValue: c => c.main?.image ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, image: value },
      }),
    },
    name: {
      label: 'name',
      getValue: c => c.main?.name ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, name: value },
      }),
    },
    phone: {
      label: 'phone',
      getValue: c => c.main?.phone ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, phone: value },
      }),
    },
    position: {
      label: 'position',
      getValue: c => c.main?.position ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, position: value },
      }),
    },
    resumedownload: {
      label: 'resumedownload',
      getValue: c => c.main?.resumedownload ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, resumedownload: value },
      }),
    },
    website: {
      label: 'website',
      getValue: c => c.main?.website ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, website: value },
      }),
    },
    titleAbout: {
      label: 'titleAbout',
      getValue: c => c.main?.titleAbout ?? '',
      setValue: (c, value) => ({
        ...c,
        main: { ...c.main, titleAbout: value },
      }),
    },
    resume: {
      label: 'resume',
      getValue: c => c.menu?.resume ?? '',
      setValue: (c, value) => ({
        ...c,
        menu: { ...c.menu, resume: value },
      }),
    },
    contacts: {
      label: 'contacts',
      getValue: c => c.menu?.contacts ?? '',
      setValue: (c, value) => ({
        ...c,
        menu: { ...c.menu, contacts: value },
      }),
    },
    sitemap: {
      label: 'sitemap',
      getValue: c => c.menu?.sitemap ?? '',
      setValue: (c, value) => ({
        ...c,
        menu: { ...c.menu, sitemap: value },
      }),
    },
    home: {
      label: 'home',
      getValue: c => c.menu?.home ?? '',
      setValue: (c, value) => ({
        ...c,
        menu: { ...c.menu, home: value },
      }),
    },
    experience: {
      label: 'experience',
      getValue: c => c.menu?.experience ?? '',
      setValue: (c, value) => ({
        ...c,
        menu: { ...c.menu, experience: value },
      }),
    },
    skills: {
      label: 'skills',
      getValue: c => c.menu?.skills ?? '',
      setValue: (c, value) => ({
        ...c,
        menu: { ...c.menu, skills: value },
      }),
    },
    blogs: {
      label: 'blogs',
      getValue: c => c.menu?.blogs ?? '',
      setValue: (c, value) => ({
        ...c,
        menu: { ...c.menu, blogs: value },
      }),
    },
    about: {
      label: 'about',
      getValue: c => c.menu?.about ?? '',
      setValue: (c, value) => ({
        ...c,
        menu: { ...c.menu, about: value },
      }),
    },
    education: {
      label: 'education',
      getValue: c => c.menu?.education ?? '',
      setValue: (c, value) => ({
        ...c,
        menu: { ...c.menu, education: value },
      }),
    },
    // Not really used directly as single string, but kept for completeness
    social: {
      label: 'social',
      getValue: () => '',
      setValue: c => c,
    },
  }

  const renderTextInput = (fieldName: FieldName): JSX.Element => {
    const config = fieldConfig[fieldName]
    const value = config.getValue(content)

    return (
      <div className={formstyles.formRow} key={fieldName}>
        <div>
          <label>{config.label}</label>
        </div>
        <div>
          <Input
            type="text"
            value={value}
            aria-label={fieldName}
            onChange={evt => {
              const newValue = evt.currentTarget.value
              setContent(prev => config.setValue(prev, newValue))
            }}
          />
        </div>
      </div>
    )
  }

  // ---- JSX blocks ----

  const renderMainBlock = (): JSX.Element => (
    <div>
      {renderTextInput('fullname')}
      {renderTextInput('resume')}
      {renderTextInput('contacts')}
      {renderTextInput('sitemap')}
      {renderTextInput('home')}
      {renderTextInput('experience')}
      {renderTextInput('skills')}
      {renderTextInput('blogs')}
      {renderTextInput('about')}
      {renderTextInput('education')}

      <br />

      {renderTextInput('image')}
      <br />
      {renderTextInput('image')}
      {renderTextInput('bio')}
      {renderTextInput('email')}
      {renderTextInput('phone')}

      <div key="description" className={formstyles.formRow}>
        <label>description at the 1st page</label>
        <TextArea
          value={content.main?.description ?? ''}
          aria-label="description"
          rows={6}
          onChange={evt => {
            const value = evt.currentTarget.value
            setContent(prev => ({
              ...prev,
              main: { ...prev.main, description: value },
            }))
          }}
        />
      </div>

      <div key="about" className={formstyles.formRow}>
        <label>about</label>
        <TextArea
          value={content.main?.about ?? ''}
          aria-label="about"
          rows={15}
          onChange={evt => {
            const value = evt.currentTarget.value
            setContent(prev => ({
              ...prev,
              main: { ...prev.main, about: value },
            }))
          }}
        />
      </div>
    </div>
  )

  const renderWork = (): JSX.Element => (
    <>
      <h1>Work</h1>
      <div
        onClick={() => {
          const newWork: WorkItem = {
            company: '',
            description: '',
            title: '',
            years: '',
          }

          setContent(prev => ({
            ...prev,
            work: {
              ...prev.work,
              content: [...prev.work.content, newWork],
            },
          }))
        }}
      >
        <span style={{ fontSize: 20 }}>+</span>
        Add new row
      </div>

      {content.work.content.map((workItem, index) => (
        <div
          key={index}
          className={formstyles.arrayItem}
          draggable
          onDragStart={() => {
            dragItem.current = index
          }}
          onDragEnter={() => {
            dragOverItem.current = index
          }}
          onDragEnd={handleSortWork}
          onDragOver={e => e.preventDefault()}
        >
          <div>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                setContent(prev => {
                  const items = [...prev.work.content]
                  items.splice(index, 1)
                  return {
                    ...prev,
                    work: { ...prev.work, content: items },
                  }
                })
                void message.info(`the row # ${index} removed`)
              }}
              onCancel={() => {
                void message.success('canceled')
              }}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <br />
          </div>

          Title:{' '}
          <input
            value={workItem.title}
            className={formstyles.inputText}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.work.content]
                items[index] = { ...items[index], title: value }
                return {
                  ...prev,
                  work: { ...prev.work, content: items },
                }
              })
            }}
          />
          <br />
          company{' '}
          <input
            value={String(workItem.company)}
            className={formstyles.inputText}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.work.content]
                items[index] = { ...items[index], company: value }
                return {
                  ...prev,
                  work: { ...prev.work, content: items },
                }
              })
            }}
          />
          <br />
          years:{' '}
          <input
            value={String(workItem.years)}
            className={formstyles.inputText}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.work.content]
                items[index] = { ...items[index], years: value }
                return {
                  ...prev,
                  work: { ...prev.work, content: items },
                }
              })
            }}
          />
          <br />
          <textarea
            value={String(workItem.description)}
            cols={65}
            rows={5}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.work.content]
                items[index] = { ...items[index], description: value }
                return {
                  ...prev,
                  work: { ...prev.work, content: items },
                }
              })
            }}
          />
        </div>
      ))}
    </>
  )

  const renderEducation = (): JSX.Element => (
    <>
      <h1>Education</h1>
      <div
        onClick={() => {
          const newEdu: EducationItem = {
            degree: '',
            description: '',
            graduated: '',
            school: '',
          }

          setContent(prev => ({
            ...prev,
            education: {
              ...prev.education,
              content: [...prev.education.content, newEdu],
            },
          }))
        }}
      >
        <span style={{ fontSize: 20 }}>+</span>
        Add new row
      </div>

      {content.education.content.map((edu, index) => (
        <div key={index}>
          <div
            className={formstyles.remove}
            onClick={() => {
              setContent(prev => {
                const items = [...prev.education.content]
                items.splice(index, 1)
                return {
                  ...prev,
                  education: { ...prev.education, content: items },
                }
              })
            }}
          >
            <span>-</span> Remove row
          </div>
          Degree:{' '}
          <input
            value={edu.degree}
            className={formstyles.inputText}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.education.content]
                items[index] = { ...items[index], degree: value }
                return {
                  ...prev,
                  education: { ...prev.education, content: items },
                }
              })
            }}
          />
          <br />
          School{' '}
          <input
            value={String(edu.school)}
            className={formstyles.inputText}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.education.content]
                items[index] = { ...items[index], school: value }
                return {
                  ...prev,
                  education: { ...prev.education, content: items },
                }
              })
            }}
          />
          <br />
          graduated:{' '}
          <input
            value={String(edu.graduated)}
            className={formstyles.inputText}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.education.content]
                items[index] = { ...items[index], graduated: value }
                return {
                  ...prev,
                  education: { ...prev.education, content: items },
                }
              })
            }}
          />
          <br />
          <textarea
            value={String(edu.description)}
            cols={65}
            rows={5}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.education.content]
                items[index] = { ...items[index], description: value }
                return {
                  ...prev,
                  education: { ...prev.education, content: items },
                }
              })
            }}
          />
        </div>
      ))}
      <br />
    </>
  )

  const renderSocial = (): JSX.Element => (
    <>
      <h1>Social</h1>
      <div
        onClick={() => {
          const newSoc: ISocial = { className: '', name: '', url: '' }
          setContent(prev => ({
            ...prev,
            main: {
              ...prev.main,
              social: [...prev.main.social, newSoc],
            },
          }))
        }}
      >
        <span style={{ fontSize: 20 }}>+</span>
        Add new row
      </div>

      {content.main.social.map((soc, index) => (
        <div key={index}>
          <div
            className={formstyles.remove}
            onClick={() => {
              setContent(prev => {
                const items = [...prev.main.social]
                items.splice(index, 1)
                return {
                  ...prev,
                  main: { ...prev.main, social: items },
                }
              })
            }}
          >
            <span>-</span> Remove row
          </div>
          Name:{' '}
          <input
            value={soc.name}
            className={formstyles.inputText}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.main.social]
                items[index] = { ...items[index], name: value }
                return {
                  ...prev,
                  main: { ...prev.main, social: items },
                }
              })
            }}
          />
          <br />
          URL{' '}
          <input
            value={String(soc.url)}
            className={formstyles.inputText}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.main.social]
                items[index] = { ...items[index], url: value }
                return {
                  ...prev,
                  main: { ...prev.main, social: items },
                }
              })
            }}
          />
          <br />
          className:{' '}
          <input
            value={String(soc.className)}
            className={formstyles.inputText}
            onChange={evt => {
              const value = evt.currentTarget.value
              setContent(prev => {
                const items = [...prev.main.social]
                items[index] = { ...items[index], className: value }
                return {
                  ...prev,
                  main: { ...prev.main, social: items },
                }
              })
            }}
          />
          <br />
        </div>
      ))}
      <br />
    </>
  )

  const getCollapseItems = (): CollapseProps['items'] => [
    {
      key: 'cp1',
      label: 'Main',
      children: renderMainBlock(),
    },
    {
      key: 'cp4',
      label: 'Work',
      children: renderWork(),
    },
    {
      key: 'cp2',
      label: 'Skills',
      children: (
        <SkillsEditor data={content.skills.content} fnc={reloadSkills} />
      ),
    },
    {
      key: 'cp3',
      label: 'Education',
      children: renderEducation(),
    },
    {
      key: 'cp5',
      label: 'Social',
      children: renderSocial(),
    },
  ]

  const canUpdate =
    bearerToken != null && typeof bearerToken.accessToken === 'string' && bearerToken.accessToken !== ''

  return (
    <>
      <Row className={`${styles.pb40} ${styles.pt40}`}>
        <Col xs={1} md={1} lg={1} />
        <Col xs={21} md={21} lg={21}>
          <LangSelector
            // if you actually want to allow manual language change:
            // value={selectedLang}
            // onChange={setSelectedLang}
          />
          <br />

          {!isLoaded && <div>...Loading</div>}

          {isLoaded && (
            <>
              {content.errorText && <b>{content.errorText}</b>}

              {!content.errorText && (
                <>
                  <h1>Content Editor</h1>
                  <Collapse items={getCollapseItems()} defaultActiveKey={['cp4']} />

                  {canUpdate && (
                    <Button
                      type="primary"
                      onClick={evt => {
                        evt.preventDefault()
                        void updateSkills(selectedLang, content, bearerToken)
                      }}
                    >
                      Update Skills {selectedLang}
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </Col>
      </Row>
      <Space />
    </>
  )
}

export default LangManager
