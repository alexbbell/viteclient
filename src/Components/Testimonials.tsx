import React, { useEffect, useState } from 'react'
import { type ITestimonials } from '../interfaces'
import { Carousel } from 'antd'
import { pubDir } from '../config'
import styles from './../style/style.module.scss'
// import styles from './../style/style.module.scss'

interface Props {
  lang: string
}
const Testimonials = (lng: Props): React.JSX.Element => {
  const { lang } = { ...lng }
  // const { lng } = useParams()
  // const lang: string = (typeof lng === 'undefined') ? 'en' : lng
  const [testimonials, setTestimonials] = useState<ITestimonials>({ posts: [{ author: '', img: '', text: '' }] })
  const LoadText = async (): Promise<void> => {
    const fUrl = `${pubDir}locales/${lang}/${lang}-testimonials.json`
    void fetch(fUrl)
      .then(async (response) => {
        return await response.json()
      }).then(data => {
        setTestimonials({ ...data })
      }).catch((error) => {
        console.error('Error fetching data:', error)
      })
  }
  useEffect(() => {
    void LoadText()
  }, [lang])

  return (
    <>
    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}
     className={`${styles.h3} ${styles.uppercase}`}>
      <h3>{ (lang === 'ru') ? 'Отзывы' : 'Testimonials'} </h3></div>
{
  testimonials.posts.length > 1 &&
  <Carousel dotPosition='bottom'
  dots={{ className: 'dots' }}
  autoplay autoplaySpeed={4000} fade={true} pauseOnHover pauseOnFocus pauseOnDotsHover
  className='carousel'>

{testimonials.posts.map((x, index) => {
  return (
  <div key={x.author} className='testimonial'>
        <div className='tImage'>
          <div className='circular'><img src={`/img/testimonials/${x.img}`} alt={x.author} /></div>
        </div>
        <div className='tSpeech'>
        <div className='beruf'><b >{x.author}</b><br />{x.position}</div>
          <i>{x.text}</i></div>
     </div>
  )
})}
  </Carousel>
}
</>
  )
}

export default Testimonials
