import type { JSX } from 'react'
import { NavLink } from 'react-router-dom'
import i18n from './../i18n'
import { useLangStore } from '../zstore'
import { langs } from '../consts'
import styles from './../style/style.module.scss'
import '@ant-design/v5-patch-for-react-19'

interface LangSwitchProps {
  query?: string
}

const LangSwitch = ({ query }: LangSwitchProps): JSX.Element => {
  const currentLang = useLangStore((state) => state.selectedLang) || localStorage.getItem('lang') || 'en'
  const { switchLang } = useLangStore()

  const handleLanguageChange = (selectedLang: string) => {
    i18n.changeLanguage(selectedLang)
    switchLang(selectedLang)
    localStorage.setItem('lang', selectedLang)
  }

  return (
    <div className={styles.langCtrl}>
      <ul>
        {langs.map((lang) => {
          const isActive = lang === currentLang

          return (
            <li key={lang}>
              <span>
                <NavLink
                  to={`/${lang}/`}
                  onClick={() => handleLanguageChange(lang)}
                  className={`${styles.lng} ${isActive ? styles.selected : ''}`}
                >
                  {lang.toUpperCase()}
                </NavLink>
              </span>
            </li>
          )}
        )}
      </ul>
    </div>
  )
}

export default LangSwitch