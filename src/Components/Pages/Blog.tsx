import { useState, useEffect, useCallback, type JSX } from 'react'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { Row, Col, Divider, Pagination } from 'antd'
import { dateToDDmmYYYY } from '../../Middleware/Helpers'
import WPImage from './Image'
import { settings } from '../../config'
import styles from './../../style/style.module.scss'

interface BlogItem {
  postId: number
  imageId: number
  title: string
  link: string
  date: string
  anons: React.ReactNode
}

interface IWpAnonsExcerpt {
  protected: boolean
  rendered: string
}

interface ITitle {
  title: string
  rendered: string
}

interface WPItem {
  id: number
  featured_media: number | null
  title: ITitle
  link: string
  date: string
  excerpt: IWpAnonsExcerpt
}

interface AnonspostProps {
  items: BlogItem[]
}

const BLOG_URL = settings.blogUrl

export default function Blog(): JSX.Element {
  const { lng } = useParams<{ lng?: string }>()
  const lang = lng ?? 'en'
  const blogLang = lang === 'ru' ? 'ru' : 'en'

  const [items, setItems] = useState<BlogItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalPosts, setTotalPosts] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)

  const loadPosts = useCallback(async () => {
    setLoading(true)
    try {
      let json: WPItem[] = []
      let total = 0

      if (settings.mode === 'development1') {
        const response = await fetch('/posts.json')
        json = await response.json()
        total = 239
      } else {
        const url = `${BLOG_URL}/wp-json/wp/v2/posts?page=${currentPage}&per_page=${perPage}&order=desc&lang=${blogLang}`
        const response = await fetch(url)
        json = await response.json()
        
        const headerTotal = response.headers.get('x-wp-total')
        total = headerTotal ? Number(headerTotal) : 0
      }

      const formattedPosts: BlogItem[] = json.map((img) => ({
        postId: img.id,
        imageId: img.featured_media ?? 0,
        title: img.title?.rendered ?? '',
        link: img.link,
        date: dateToDDmmYYYY(img.date),
        anons: parse(img.excerpt?.rendered ?? '')
      }))

      setItems(formattedPosts)
      setTotalPosts(total)
    } catch (error) {
      console.error('Failed to load posts:', error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [currentPage, perPage, blogLang])

  useEffect(() => {
    document.title = 'Aleksei Beliaev. Fullstack developer. Personal blogs'
    loadPosts()
  }, [loadPosts])

  const handlePageChange = (page: number, pageSize: number): void => {
    setCurrentPage(page)
    setPerPage(pageSize)
  }

  return (
    <>
      <Row className={`${styles.pt40} ${styles.pb40}`}>
        <Col xs={0} md={1} lg={1} />
        <Col xs={22} md={20} lg={22}>
          <h1>Posts from my blog</h1>

          {loading ? (
            <div className={styles.ldsCircle}>
              <div />
            </div>
          ) : (
            <Anonspost items={items} />
          )}
        </Col>
        <Col xs={0} md={1} lg={1} />
      </Row>

      <Row className={`${styles.pt10} ${styles.pb10}`}>
        <Col xs={0} md={1} lg={1} />
        <Col xs={24} md={20} lg={20}>
          <Pagination
            current={currentPage}
            pageSize={perPage}
            total={totalPosts}
            onChange={handlePageChange}
            pageSizeOptions={[10, 20, 40]}
            showSizeChanger
          />
          <br />
        </Col>
        <Col xs={0} md={1} lg={2} />
      </Row>
    </>
  )
}

function Anonspost({ items }: AnonspostProps): JSX.Element {
  return (
    <div className={styles.newsContainer}>
      {items.map((item) => (
        <div key={`anons-${item.postId}`} className={styles.newsItem}>
          <div className={`${styles.pt10} ${styles.pb10}`}>
            {item.imageId !== 0 && (
              <div className={styles.newsImage}>
                <WPImage media={item.imageId??0} className={styles.radius} />
              </div>
            )}
            <div className={styles.newsContent}>
              <h2>{item.title}</h2>
              <span>
                <i>Date: {item.date}</i>
              </span>
              {item.anons}
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                More
              </a>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  )
}