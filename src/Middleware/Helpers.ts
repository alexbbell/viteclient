export function replaceNbsps (str: string): string {
  const re = new RegExp(String.fromCharCode(160), 'g')
  return str.replace(re, ' ')
}

// export function htmlDecode (input: string): string {
//   const e = document.createElement('div')
//   e.innerHTML = input
//   let t = ' '
//   if (e.childNodes.length > 0) t = String(e.childNodes[0]?.nodeValue)

//   return t
// }

export function dateToDDmmYYYY (str: string): string {
  const pattern = /(\d{4})-(\d{2})-(\d{2})(T)(\d{2}:\d{2}:\d{2})+/g
  return str.replace(pattern, '$3.$2.$1')
}

export async function getThumbnail (id: number | undefined): Promise<string> {
  if (typeof id === 'undefined') return ''

  await fetch(`http://markimarta.com/wp-json/wp/v2/media/${id}`)
    .then(async (response) => await response.json()) // 2
    .then((response) => {
      return response.sizes.thumbnail.source_url
    })

  // const json =  data.json();
  // let img = json.media_details.sizes.thumbnail.source_url;

  return ''
}
