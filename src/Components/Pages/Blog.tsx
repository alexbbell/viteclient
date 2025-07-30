import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import { dateToDDmmYYYY } from '../../Middleware/Helpers'
import Image from './Image'
import { Row, Col, Divider, Pagination } from 'antd'
import styles from './../../style/style.module.scss'
import { useParams } from 'react-router-dom'

interface blogItem {
  postId: number
  imageId: number
  title: string
  link: string
  date: string
  anons: string
}

interface IWpAnonsExcerpt {
  protected: boolean
  rendered: string
}

interface WPItem {
  id: number
  featured_media: number | null
  title: any
  link: any
  date: any
  anons: any
  excerpt: IWpAnonsExcerpt
}
export default function Blog (): JSX.Element {
  // const lang = useAppSelector(state => state.lang.lang)
  const { lng } = useParams()
  const lang: string = (typeof lng === 'undefined') ? 'en' : lng
  const [items, setItems] = useState<blogItem[]>([])
  const [operationResult, setOperationResult] = useState<boolean>(false)
  const [totalPosts, setTotalPosts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const blogUrl = (lang === 'ru') ? 'https://markimarta.ru' : 'https://markimarta.com'

  const LoadPosts = async (): Promise<void> => {
    let data
    let json: WPItem[] = []

    if (process.env.NODE_ENV === 'development') {
      data = await fetch('/posts.json')
      json = await data.json()
      setTotalPosts(239)
    } else {
      data = await fetch(`${blogUrl}/wp-json/wp/v2/posts?page=${currentPage}&per_page=${perPage}&order=desc`)
      json = await data.json()
      setTotalPosts(data?.headers?.get('x-wp-total') !== null ? 10 : 0)
    }
    const t = data.headers.get('x-wp-total')?.toString()
    setTotalPosts(Number(t))

    const myimages: any = []
    json.map(img => {
      return myimages.push({
        postId: img.id,
        imageId: img.featured_media,
        title: img.title.rendered,
        link: img.link,
        date: dateToDDmmYYYY(img.date),
        anons: parse(img.excerpt.rendered)
      })
    })
    setItems(myimages)
    // return json
  }

  useEffect(() => {
    const fetchData = (): void => {
      void LoadPosts()
      setOperationResult(true)
      document.title = 'Aleksei Beliaev. Fullstack developer. Personal blogs'
    }
    fetchData()
  }, [operationResult, currentPage, perPage, lang])
  // }, [operationResult, currentPage, perPage, lang])

  const RenderPosts = (): JSX.Element => {
    if (items.length > 0) {
      return (

                <Anonspost items={items} />

      )
    } else return <div><div className={styles.ldsCircle}><div></div></div></div>
  }

  const Anonspost = (props: any): JSX.Element => {
    const items = props.items
    return (
            <>
            {/* <h1>{process.env.NODE_ENV}</h1> */}
            {items.map((item: blogItem, index: number) => {
              return (
                        <div key={`anons${item.postId}${index}`} >

                        <div className={`${styles.newsitem} ${styles.newsitem} ${styles.pt10} ${styles.pb10}`}>
                                {item.imageId !== 0 && (
                                    <div className={styles.newsImage}>
                                        <Image media={item.imageId} className={styles.radius} />
                                    </div>
                                )}
                                <div className={styles.newsContent}>
                            <h2 >{item.title}</h2>

                                <span><i>Date: {item.date}</i></span>
                                {item.anons}
                                <a href={item.link}>More</a>

                            </div>
                        </div>
                        <Divider ></Divider>
                        </div>

              )
            })
            }

            </>
    )
  }
  const onChange = (page: number, items: number): void => {
    page = (page === 0) ? page + 1 : page
    setCurrentPage(page)
    setPerPage(items)
  }

  return (

        <>
            <Row className={`${styles.pt40} ${styles.pb40}`}>
                <Col xs={0} md={1} lg={2}></Col>
                <Col xs={24} md={15} lg={15}>

                    <h1>Posts from my blog</h1>

                    <RenderPosts />
                </Col>
                <Col xs={0} md={1} lg={2}></Col>
            </Row>
            <Row className={`${styles.pt10} ${styles.pb10}`}>
            <Col xs={0} md={1} lg={2}></Col>
            <Col xs={24} md={15} lg={15}>

            <Pagination defaultCurrent={currentPage + 1 } total={totalPosts} onChange={onChange} pageSizeOptions={[10, 20, 40]} />
            <br />
            </Col>
            <Col xs={0} md={1} lg={2}></Col>
            </Row>

        </>
  )
}
