import React, { type JSX } from 'react'
import { Row, Col, Layout } from 'antd'
import { useNavigate, NavLink, useParams } from 'react-router-dom'
import LangSwitch from './LangSwitch'
import styles from './../style/style.module.scss'
import { useTranslation } from 'react-i18next'
import Menu from '../Middleware/Menu'

const { Header } = Layout

const ABHeader = (): JSX.Element => {
  // const { t, i18n } = useTranslation()
  const { t } = useTranslation()
  const { lng } = useParams()
  const lang: string = (typeof lng === 'undefined') ? 'en' : lng
  const m = new Menu()
  const items = m.fetchMenUItems(['home', 'skills', 'blogs', 'about', 'gallery', 'math', 'services'])
  const navigate = useNavigate()

  return (
        <Header className={` ${styles.header}`}>
            <Row>
                <Col xs={0} md={11} xl={7} className={styles.logoleft}>
                    <div className={styles.logo}
     onClick={
        () => {
          navigate(`./${lang}`)
        }
    }
                    >
                        <h1 className={styles.bold}>{t('fullname')}</h1>
                        <h2 className={styles.thin}>Fullstack developer</h2>
                    </div>
                </Col>

                <Col xs={24} md={12} xl={16} className={ styles.hdrleft }>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                    <LangSwitch query={lang} />
                    
                    <div className={styles.topMenu}>
                        <ul>
                        {
                            items.map((elm) => {
                              return (
                 <li key={elm.url} >
                    <NavLink to={`${lang}${elm.url.endsWith('/') ? elm.url.replace('/', '') : elm.url}/`}
                        className={({ isActive }) => {
                          return isActive ? `${styles.activelink}` : ''
                        } }

                 >{t(`menu.${elm.label}`)}</NavLink></li>
                              )
                            })

                        }
                        </ul>
                    </div>

                    </div>
                </Col>
                <Col xs={0} md={1} xl={1}></Col>
            </Row>
        </Header>
  )
}

export default ABHeader
