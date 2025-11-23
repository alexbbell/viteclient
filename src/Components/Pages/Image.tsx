import { useEffect, useState, type JSX } from 'react'
import PropTypes from 'prop-types'

import { useLangStore } from '../../zstore'

const Image = (props: any): JSX.Element => {
  const [image, setImage] = useState()
  const lang = useLangStore(s => s.selectedLang)

  const className = (props?.className !== null) ? props.className : ''

  let blogUrl = 'https://markimarta.com'
  if (lang === 'ru') {
    blogUrl = 'https://markimarta.ru'
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      // GetImageInfo().then().catch()
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const data: any = await fetch(`${blogUrl}/wp-json/wp/v2/media/${props?.media}`)
      const json = await data.json()
      setImage(json.media_details?.sizes?.thumbnail?.source_url)
    }
    void fetchData()
  }, [])

  // const GetImageInfo = async (): void => {
  //   const data = await fetch(`${blogUrl}/wp-json/wp/v2/media/` + props.media)
  //   const json = await data.json()
  //   setImage(json.media_details?.sizes.thumbnail.source_url)
  // }

  return (
      <>
      {    image !== undefined  ? <img src={image} className={className} /> : <></>
      
      }
            
      </>

  )
}

Image.propTypes = {
  className: PropTypes.string,
  media: PropTypes.number
}

export default Image
