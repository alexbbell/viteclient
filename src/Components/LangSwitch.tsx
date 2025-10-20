import { useEffect, type JSX } from 'react'
import styles from './../style/style.module.scss'
import { NavLink } from 'react-router-dom'
import { type IStaticPage } from './../interfaces'
import i18n from './../i18n'
import '@ant-design/v5-patch-for-react-19';
import { useLangStore } from '../zstore'
import { langs } from '../consts'


// import { switchLang } from '../store/langSlice'
// import { useTranslation } from 'react-i18next';

const LangSwitch = (props: IStaticPage): JSX.Element => {
  const ml = props.query
  const siteLang =  localStorage.getItem('lang') ?? 'en'
  // console.log('ml', ml)
  // console.log('lang', siteLang)
  const { switchLang } = useLangStore();

 const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    switchLang(lng)
    localStorage.setItem('lang', lng); // persist choice
  };



  useEffect(() => {
    if(ml) void i18n.changeLanguage(ml)
  }, [ml, siteLang])

  return (
    <div className={styles.langCtrl} >

    <ul>
        {
            langs.map((lang, i) => {
              return (
                  <li key={lang}><span >
                      &nbsp;<NavLink to={`/${lang}/`} 
                        onClick={ () => {
                          // switchLang(lang)
                          changeLanguage(lang)
                        }}
                        className={lang === siteLang ? `${styles.lng}  ${styles.selected}` : `${styles.lng}`}
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
