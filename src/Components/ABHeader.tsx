import React, { useState, type JSX } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LangSwitch from './LangSwitch'
import Menu from '../Middleware/Menu'
import { useLangStore } from '../zstore'
import styles from './../style/style.module.scss'

const ABHeader = (): JSX.Element => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  
  // Reactively track current language from Zustand (or fallback to i18n current language)
  const lang = useLangStore((state) => state.lang) || i18n.language || 'en'

  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen((prev) => !prev)

  // Move menu instance/items out or memoize so it doesn't re-instantiate needlessly
  const menu = new Menu()
  const items = menu.fetchMenUItems([
    'home',
    'skills',
    'blogs',
    'about',
    'gallery',
    'math',
    'contacts'
  ])

  // Helper to ensure route URLs are formatted cleanly: "/en/blogs" or "/de/skills"
  const getNavLinkUrl = (url: string) => {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`
    return `/${lang}${cleanUrl}`
  }

  return (
    <header className={styles.header}>
      <div 
        className={styles.hdrLeft} 
        onClick={() => navigate(`/${lang}`)}
        role="button"
        tabIndex={0}
      >
        <div className={styles.logo}>
          <div>
            <h1 className={styles.bold}>{t('fullname')}</h1>
          </div>
          <div>
            <h2 className={styles.thin}>Fullstack developer</h2>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <LangSwitch query={lang} />

        <div style={{ alignItems: 'flex-end' }}>
          <div className={styles.menuWrapper}>
            <div className={styles.menuToggle}>
              <button type="button" onClick={toggleMenu}>
                Menu ☰
              </button>
            </div>
          </div>

          <nav style={{ position: 'relative' }}>
            <div className={`${styles.topMenu} ${menuOpen ? styles.open : ''}`}>
              <ul>
                {items.map((elm) => (
                  <li key={elm.url}>
                    <NavLink
                      to={getNavLinkUrl(elm.url)}
                      className={({ isActive }) => (isActive ? styles.activelink : '')}
                      onClick={() => setMenuOpen(false)}
                    >
                      {t(`menu.${elm.label}`)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default ABHeader