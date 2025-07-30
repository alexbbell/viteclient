import React, { Suspense } from 'react'
import { Layout, Divider } from 'antd'
import styles from './../style/style.module.scss'
import { Outlet } from 'react-router-dom'
import ABHeader from './ABHeader'
import ABFooter from './Footer'
const { Content } = Layout

export const MyLayout = (): JSX.Element => {
  return (
    <Layout className={styles.body}>

       <ABHeader />
       <Divider plain={true} className={`${styles.line}`}></Divider>
      <Content>
        <Suspense fallback={<b>Loading....</b>}>
        <Outlet></Outlet>
        </Suspense>
    </Content>
    <Divider plain={true} className={`${styles.line}`}></Divider>

    <ABFooter />
  </Layout>

  )
}
