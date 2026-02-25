import { type JSX } from 'react'
import { Row, Col } from 'antd'
import { Link, NavLink, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { faBlog } from '@fortawesome/free-solid-svg-icons';

import { faPhone, faEnvelope,  faFileSignature} from '@fortawesome/free-solid-svg-icons';

import { faGithub, faLinkedin, faGitlab } from '@fortawesome/free-brands-svg-icons'


// import { SiteMap } from '../Middleware/Helpers'
import { Footer } from 'antd/es/layout/layout'
import { useTranslation } from 'react-i18next'
import Menu from '../Middleware/Menu'
import styles from './../style/style.module.scss'

const ABFooter = (): JSX.Element => {
  const { lng } = useParams()
  const lang: string = (typeof lng === 'undefined') ? 'en' : lng
  const { t } = useTranslation()
  const m = new Menu()
  const items = m.fetchMenUItems(['home', 'skills', 'blogs', 'about', 'gallery'])

  // const setActive = ({ isActive }) => isActive ? 'active-link' : ''

  return (
        <Footer className={styles.footer}>
    <Row justify="space-around">
        <Col xs={22} sm={11} md={5} lg={5}>
            <h3>{t('menu.sitemap')}</h3>
            <ul className={styles.cleanList}>
                {
                    items.map(elm => {
                      return (
                            <li key={`f${elm.label}`}><NavLink className={({ isActive }) => {
                              return isActive ? `${styles.activelink}` : ''
                            } }
                           to={`/${lang}/${elm.url}/`.replaceAll(/\/+/g, '/')}>{t(`menu.${elm.label}`)}</NavLink></li>
                      )
                    })
                }
            </ul>
        </Col>
        <Col xs={22} sm={11} md={5} lg={5}>
            <h3>{t('menu.contacts')}</h3>

            <ul className={styles.cleanList}>
                <li key={'mail1'}><FontAwesomeIcon icon={faEnvelope} />&nbsp; beliaeff@gmail.com</li>
                <li key={'phone1'}><FontAwesomeIcon icon={faPhone} /> +49 157 38936214<br />(mobile, WhatsApp)</li>
                <li key={'whats2'}><FontAwesomeIcon icon={faPhone} /> +7 9261803635 <br />(mobile, WhatsApp)</li>
                <li key={'whats3'}><FontAwesomeIcon icon={faFileSignature} /> <Link to={`/${lang}/contacts`} >Send request</Link></li>
            </ul>

        </Col>
        <Col xs={22} sm={11} md={5} lg={5}>
            <h3>{t('menu.resume')}</h3>
            <ul className={styles.cleanList}>
                <FontAwesomeIcon icon={faFilePdf} className='icon-high' /> &nbsp;<a href="/Aleksei_Beliaev_Software_developer.pdf">{t('menu.resume')}</a>
            </ul>
        </Col>
        <Col xs={22} sm={11} md={5} lg={5}>
            <h3>{t('menu.blogs')}</h3>
            <ul className={styles.cleanList}>

                <li key={'s1'}><FontAwesomeIcon icon={faBlog} className='icon-sm' /> <a href="https://markimarta.ru">markimarta.ru</a></li>
                <li key={'s2'}><FontAwesomeIcon icon={faBlog} className='icon-sm' />  <a href="https://markimarta.com">markimarta.com</a></li>
                <li key={'s3'}><FontAwesomeIcon icon={faLinkedin} className='icon-sm' />&nbsp; <a href="https://www.linkedin.com/in/aleksei-beliaev/">LinkedIn</a></li>
                <li key={'s4'}><FontAwesomeIcon icon={faGithub} className='icon-sm' />&nbsp;<a href="https://github.com/alexbbell/">Github</a></li>
                <li key={'s5'}><FontAwesomeIcon icon={faGitlab} className='icon-sm' />&nbsp;<a href="https://gitlab.com/alexbbell/alexeybeliaeffru/">Gitlab</a></li>
            </ul>

        </Col>
    </Row>
        </Footer>
  )
}

export default ABFooter
