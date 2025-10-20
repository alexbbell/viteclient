// @flow
import { Col, Row } from 'antd'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './../../../style/style.module.scss'
import { ConsultForm } from '../../ConsultForm'

export const Services: React.FC = () => {
  const { t } = useTranslation()
  // const [text, setText] = React.useState<JSX.Element>(<></>)
  // const aboutText: string[] = t('services.content', { returnObjects: true })
  // const aboutTextArray = aboutText[0].split('\n')
  
  React.useEffect(() => {
    document.title = `Aleksei Beliaev. Fullstack developer. ${t('main.titleAbout')}`
  
  }, [t('main.titleAbout')])

  return (
    <Row className={`${styles.pt40} ${styles.pb40} `}>
      <Col xs={1} md={1} lg={2}></Col>
      <Col xs={20} md={16} lg={10}>
      <h1>Services</h1>

        <p>Find Your Path Abroad with Confidence </p>
        <p>I help professionals prepare for relocation and job search abroad, based on my own real experience of moving and working in Germany.</p>
        <ConsultForm />
      </Col>
      <Col xs={1} md={0} lg={1}></Col>
    </Row>
  )
}
