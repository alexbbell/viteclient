import React, { useEffect, useState } from 'react'

import { Row, Col, Space, Modal } from 'antd'
import styles from './../../style/style.module.scss'
import { useTranslation } from 'react-i18next'

const About = (): JSX.Element => {
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const ShowModal = (): void => {
    setIsModalOpen(true)
  }
  const CloseModal = (): void => {
    setIsModalOpen(false)
  }
  useEffect(() => {
    document.title = `Aleksei Beliaev. Fullstack developer. ${t('main.titleAbout')}`
  }, [t('main.titleAbout')])
  const aboutTextArray = t('main.about').split(/\n/g)
  const aboutText = aboutTextArray.map(function (text, index) {
    return <p key={`p${index}`}>
            {text}
          </p>
  })

  return (
<>
<Row className={`${styles.pb40} ${styles.pt40}`}>
    <Col xs={1} md={1} lg={2}></Col>

    <Col xs={22} md={11} lg={7}>
        <p style={{ alignContent: 'center' }}>
            <img className={styles.image} src='/img/abb-family-sm.jpg' onClick={ShowModal} />
        </p>
    </Col>
    <Col xs={1} md={0} lg={1}></Col>

<Col xs={1} md={1} lg={1}></Col>

<Col xs={22} md={8} lg={12}>

    <h1>{t('main.titleAbout')}</h1>
    {aboutText}

</Col>
                <Col xs={1} md={1} lg={2}></Col>
                <Modal open={isModalOpen} onOk={CloseModal} onCancel={CloseModal} width={700} centered={true}>
                    <div style={{ width: '600px', height: 'auto', boxShadow: '4px 4px 15px 0px rgba(85,181,151,0.75)' }}>
                        <img src='/img/abb-family.jpg' width={600} ></img>
                    </div>
                </Modal>

    </Row>

    <Space></Space>

</>
  )
}
export default About
