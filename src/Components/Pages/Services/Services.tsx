// @flow
import { Col, Row } from 'antd'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './../../../style/style.module.scss'

export const Services: React.FC = () => {
  const { t } = useTranslation()
  // const [text, setText] = React.useState<JSX.Element>(<></>)
  const aboutText: string[] = t('services.content', { returnObjects: true })
  const aboutTextArray = aboutText[0].split('\n')
  const rr: JSX.Element[] = aboutTextArray.map(x => {
    return (
      <ol key={x}>
          {x}
      </ol>
    )
  })
  React.useEffect(() => {
    document.title = `Aleksei Beliaev. Fullstack developer. ${t('main.titleAbout')}`
    console.log('aboutTextArray', rr)
  }, [t('main.titleAbout')])

  return (
    <Row className={`${styles.pt40} ${styles.pb40} `}>
      <Col xs={1} md={1} lg={2}></Col>
      <Col xs={22} md={11} lg={7}>
      <h1>Services</h1>
        <p>{rr}</p>
        <p>Are you looking for a job abroad? </p>
      </Col>
      <Col xs={1} md={0} lg={1}></Col>
    </Row>
  )
}
