import React, { type JSX } from 'react'
import {  Layout } from 'antd'
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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  const items = m.fetchMenUItems(['home', 'skills', 'blogs', 'about', 'gallery', 'math', 'services'])
  const navigate = useNavigate()

  const logo:React.JSX.Element =  <div className={styles.logo} onClick={ () => { navigate(`./${lang}`) }}>
        <div><h1 className={styles.bold}>{t('fullname')}</h1></div>
        <div style={{whiteSpace: 'nowrap'}}><h2 className={styles.thin}>Fullstack developer</h2></div>
            </div>

  return (
        <Header className={` ${styles.header}`}>
          <div className={styles.hdrLeft}>{logo}</div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                    <LangSwitch query={lang} />

                    <button className={styles.menuToggle} onClick={toggleMenu}>☰ Menu</button>
                          <nav style={{ position: 'relative'}}>
            <div className={`${styles.topMenu} ${menuOpen ? styles.open : ''}`}>
                        <ul>
                        {
                            items.map((elm) => {
                              return (
                 <li key={elm.url} >
                    <NavLink to={`${lang}${elm.url.endsWith('/') ? elm.url.replace('/', '') : elm.url}/`}
                        className={({ isActive }) => {
                          return isActive ? `${styles.activelink}` : ''
                        } }
                        onClick={() => toggleMenu()}
                 >{t(`menu.${elm.label}`)}</NavLink></li>
                              )
                            })

                        }
                        </ul>
                    </div></nav>

                    </div>
        </Header>
  )
}

export default ABHeader
