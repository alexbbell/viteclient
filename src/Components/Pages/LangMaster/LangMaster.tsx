import { type JSX } from 'react'
import LangManager from './LangManager'
import Login from '../Login/Login'
import { useLangStore } from '../../../zstore'
import { useLocalStorage } from 'usehooks-ts'

import styles from './../../../style/style.module.scss'
import { Col, Row } from 'antd'
import { type ITokenApiModel } from './BLLangMaster'

const LangMaster = (): JSX.Element => {
  
  // let tokenApi: ITokenApiModel = useAppSelector(state => state.lang.userToken)
  let tokenApi: ITokenApiModel = { accessToken: '' }
  const [, setTokenAuth] = useLocalStorage('userToken', tokenApi)
  const setUserToken = useLangStore(s => s.setUserToken)!
  const lsUserToken: string | null = localStorage.getItem('userToken')

  if (lsUserToken !== null) {
    tokenApi = JSON.parse(lsUserToken)
  }
  if (tokenApi.accessToken === undefined) {
    if (tokenApi === null || tokenApi.accessToken === '') tokenApi = { accessToken: '' }
    setUserToken(tokenApi)
  }

  return (
    <>
    <Row className={`${styles.pt40} ${styles.pb40}`}>
    <Col xs={1} md={1} xl={1} ></Col>
      <Col xs={20} md={20} xl={20} >
        {(tokenApi.accessToken === '' || tokenApi.accessToken === undefined) && (
          <Login />
        )}
        {tokenApi.accessToken !== '' && (

          <>
            <div style={{ position: 'absolute', right: '30px' }} onClick={() => {
              setUserToken({ accessToken: '' })
              setTokenAuth({})
            }}>Logout</div>

<hr />
<h3>LangManager</h3>
            <LangManager />
          </>
        )}
      </Col>
    </Row>
    </>
  )
}

export default LangMaster
