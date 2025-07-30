import React, { useEffect } from 'react'
import { Row, Col, Space, Tabs } from 'antd'
import styles from './../../style/style.module.scss'
import { useTranslation } from 'react-i18next'
import { type IStaticPage } from '../../interfaces'

import type { TabsProps } from 'antd'

interface ND {
  name: string
  description: string
}

interface IWork {
  company: string
  title: string
  years: string
  description: string
}

interface IEducation {
  school: string
  degree: string
  graduated: string
  description: string
}

const Skills = (props: IStaticPage): JSX.Element => {
  const { t } = useTranslation()
  const skillsList: ND[] = t(`${props.query}.content`, { returnObjects: true })
  const skillsContent: JSX.Element[] = skillsList.map(function (skill) {
    useEffect(() => {
      document.title = `Aleksei Beliaev. Fullstack developer. ${t('skills.title')}, ${t('work.title')}, ${t('education.title')}`
    }, [skillsList])
    return <li key={skill.name}>
                    <h4>{skill.name }</h4>
                    <p>
                    {skill.description }
                    </p>
                </li>
  })

  const workList: IWork[] = t('work.content', { returnObjects: true })
  const workContent: JSX.Element[] = workList.map(function (wrk) {
    return <li key={wrk.years} className={styles.pb10}>
                <h4 className={styles.uppercase}>{wrk.company}</h4>
                <h5 className={`${styles.thin} ${styles.italic} ${styles.grey}`}>{wrk.years}</h5>
                <h3>{wrk.title} </h3>
                <p>
                    {wrk.description}
                </p>
            </li>
  })

  const educationList: IEducation[] = t('education.content', { returnObjects: true })
  const educationContent: JSX.Element[] = educationList.map(function (ed) {
    return <li key={ed.graduated} className={styles.pb10}>

            <h4 className={styles.uppercase}>{ed.school}</h4>
                           <em className={styles.date}></em>
                           <h5 className={`${styles.thin} ${styles.italic}`}>{ed.graduated} </h5>
                           <h3>{ed.degree}</h3>
                           <p>
                          {ed.description}
                           </p>

                        </li>
  })

  const items: TabsProps['items'] = [
    { key: 'skills', label: t('skills.title'), children: <ul> {skillsContent }</ul> },
    { key: 'work', label: t('work.title'), children: <ul>{workContent}</ul> },
    { key: 'education', label: t('education.title'), children: <ul>{educationContent}</ul> }
  ]

  return (
<>
<Row className={`${styles.pt40} ${styles.pb40} `}>
<Col xs={0} md={1} lg={2}></Col>
<Col xs={24} md={20} lg={20}>

<Tabs defaultActiveKey="1" items={items} type='card'
     tabBarStyle={{
       display: 'flex',
       justifyContent: 'left',
       marginBottom: '30px'
     }}
    className={styles.experience} ></Tabs>

</Col>
<Col xs={0} md={1} lg={2}></Col>
</Row>

    <Space></Space>

</>
  )
}
export default Skills
