import React, { useEffect, type JSX } from 'react'
import styles from './../style/style.module.scss'
import { NavLink } from 'react-router-dom'
import { type IStaticPage } from './../interfaces'
import i18n from './../i18n'

const LangSwitch = (props: IStaticPage): JSX.Element => {
  const langs = ['en', 'ru', 'de', 'he']
  const ml = props.query
  useEffect(() => {
    void i18n.changeLanguage(ml)
  }, [ml])

  return (
    <div className={styles.langCtrl} >
    <ul>
        {
            langs.map((lang, i) => {
              return (
                  <li key={lang}><span >
                      &nbsp;<NavLink to={`/${lang}/`} className={lang === ml ? `${styles.lng}  ${styles.selected}` : `${styles.lng}`}
                      >{lang.toUpperCase()}</NavLink>
                      { (typeof langs[i + 1] !== 'undefined') ? ' | ' : '' }
                  </span></li>
              )
            })
        }
    </ul>
    </div>

  )
}

export default LangSwitch
