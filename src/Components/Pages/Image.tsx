import { useEffect, useState, type JSX } from 'react'
// import PropTypes from 'prop-types'
import { settings } from '../../config'
import type { WPImageProps } from '../../interfaces'


const WPImage = ({ media, className }: WPImageProps): JSX.Element => {
  const [image, setImage] = useState()
  // const lang = useLangStore(s => s.selectedLang)

  

  const blogUrl = settings.blogUrl

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data: any = await fetch(`${blogUrl}/wp-json/wp/v2/media/${media}`)
      const json = await data.json()
      setImage(json.media_details?.sizes?.thumbnail?.source_url)
    }
    void fetchData()
  }, [])

  return (
      <>
      {    image !== undefined  ? <img src={image} className={className} /> : <></>
      
      }
            
      </>

  )
}



export default WPImage
