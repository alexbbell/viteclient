import React, { useEffect } from 'react'

import { Row, Col, Divider } from 'antd'
import { useNavigate, NavLink, useParams } from 'react-router-dom'
import styles from './../../style/style.module.scss'
import { useTranslation, Trans } from 'react-i18next'
import Newsloader from './../NewsLoader'
import AbbAnalogClock from './AbbAnaligClock'
import Testimonials from '../Testimonials'
export const Homepage = (): JSX.Element => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { lng } = useParams()
  const lang: string = (typeof lng === 'undefined') ? 'en' : lng
  useEffect(() => {
    document.title = 'Aleksei Beliaev. Fullstack developer. Personal site'
  }, [lng])
  return (
<>
<Row className={styles.pb40}>
        <Col xs={14} md={15} lg={9} style={{ textAlign: 'center' }}>

            <div className={styles.trackingInExpand}>
                <img src='/img/abbfp.jpg' className={styles.image}
                alt={`${t('main.beforename')} ${t('main.name')}`} />
            </div>
        </Col>
        <Col xs={24} md={9} lg={13} className={styles.about}>
            <h3><Trans i18nKey="main.greeting" /></h3>

            <h1 className={styles.trackingInExpand}>{t('main.beforename')} {t('main.name')}</h1>
            <p>
              {t('main.description')}</p>
            <p>
                <NavLink to={`/${i18n.language}/about/`} className={styles.more}>{t('morelink')}...</NavLink>
            </p>

        </Col>
    </Row>

    <Divider plain={true} className={`${styles.line} ${styles.pb10}`}></Divider>

    <Row className={`${styles.pb40}`} >
     <Col xs={24} md={24} style={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>

    {/* <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap' }}>  */}

            <div id='education' className={`${styles.fpadvert} ${styles.education}`} style={{ position: 'relative' }}
              onClick={
                () => {
                  navigate(`/${lang}/experience`)
                }
              }
            >
              <div style={{ position: 'absolute', top: '38px', left: 'calc(50% + 75px)', transform: 'translate(-50%; -50%)' }}><AbbAnalogClock size={60} /></div>
              <NavLink to="./experience" className={`${styles.h3} ${styles.uppercase}`}>{t('menu.education')}</NavLink>
            </div>
            <div id="skills" className={`${styles.fpadvert} ${styles.skills}`}
              onClick={
                () => {
                  navigate(`/${lang}/skills`)
                }
              }
            >
              <NavLink to="" className={`${styles.h3} ${styles.uppercase}`}>{t('menu.skills')}</NavLink>
            </div>
            </Col>
        <Divider plain={true} className={`${styles.line} ${styles.pb40}`}></Divider>

          <Col xs={1} md={3} lg={4}></Col>
          <Col xs={23} md={18} lg={16}>
            <Testimonials lang={lang} />
          </Col>
          <Col xs={0} md={3} lg={4}></Col>
    </Row>

    <Divider plain={true} className={`${styles.line} ${styles.pb40}`}></Divider>
    <Row>
      <Col xs={1} md={1} lg={1}></Col>
      <Col xs={22} md={22} lg={22}>
        <Newsloader query={lang} />
      </Col>
    </Row>
</>
  )
}
