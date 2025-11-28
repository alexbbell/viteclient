import React, { useEffect, type JSX } from 'react'
import { Layout } from 'antd'
import { useNavigate, NavLink } from 'react-router-dom'
import LangSwitch from './LangSwitch'
import styles from './../style/style.module.scss'
import { useTranslation } from 'react-i18next'
import Menu from '../Middleware/Menu'
import { siteLang } from '../config'

const { Header } = Layout

const ABHeader = (): JSX.Element => {
  // const { t, i18n } = useTranslation()
  const { t } = useTranslation()
  const m = new Menu()
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  const items = m.fetchMenUItems(['home', 'skills', 'blogs', 'about', 'gallery', 'math', 'services'])
  const navigate = useNavigate()

  useEffect(() => {
    setMenuOpen(false)
  }, [])
  const logo: React.JSX.Element = <div className={styles.logo} onClick={() => { navigate(`./${siteLang}`) }}>
    <div><h1 className={styles.bold}>{t('fullname')}</h1></div>
    <div><h2 className={styles.thin}>Fullstack developer</h2></div>
  </div>

  return (
    <Header className={` ${styles.header}`}>
      <div className={styles.hdrLeft}>{logo}</div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
        <LangSwitch query={siteLang} />

        <div style={{ alignItems: 'end' }} >

          <div className={styles.menuWrapper}>
            <div className={styles.menuToggle}>
              <button onClick={toggleMenu}>Menu ☰</button></div></div>
          <nav style={{ position: 'relative' }}>
            <div className={`${styles.topMenu} ${menuOpen ? styles.open : ''}`}>
              <ul>
                {
                  items.map((elm) => {
                    return (
                      <li key={elm.url} >
                        <NavLink to={`${siteLang}${elm.url.endsWith('/') ? elm.url.replace('/', '') : elm.url}`}
                          className={({ isActive }) => {
                            return isActive ? `${styles.activelink}` : ''
                          }}
                          onClick={() => toggleMenu()}
                        >{t(`menu.${elm.label}`)}</NavLink></li>
                    )
                  })

                }
              </ul>
            </div></nav>
        </div>
      </div>
    </Header>
  )
}

export default ABHeader
