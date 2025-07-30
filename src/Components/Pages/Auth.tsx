/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react'

import { Row, Col, Space, Modal } from 'antd'
import styles from './../../style/style.module.scss'
import { useTranslation } from 'react-i18next'
import Login from './Login/Login'
import { type ITokenApiModel } from './LangMaster/BLLangMaster'

const Auth = (): JSX.Element => {
  const { t } = useTranslation()
  const lsTokens: string | null = localStorage.getItem('userToken')
  let tokens: ITokenApiModel = {}
  if (lsTokens !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tokens = JSON.parse(lsTokens)
  }

  useEffect(() => {
    console.log(tokens.accessToken)
    document.title = `Aleksei Beliaev. Fullstack developer. ${t('main.titleAbout')}`
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

    <h1>{t('main.titleAbout')}</h1>

    <Login />
</Col>

    </Row>

    <Space></Space>

</>
  )
}
export default Auth
