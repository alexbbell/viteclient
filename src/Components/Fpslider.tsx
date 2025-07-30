import * as React from 'react'
import { useEffect, useState } from 'react'

interface Props {
  title: string
}
// function toRadians (angle: number): number {
//   return angle * (Math.PI / 180)
// }

const Fpslider = (title: Props): JSX.Element => {
  const tittle = title.title
  const [lines, setLines] = useState<string[]>([])

  const dragItem = React.useRef<number>(0)
  const dragOverItem = React.useRef<number>(0)

  const handleSort = (): void => {
    const _items = [...lines]
    const draggedItemContent = _items.splice(dragItem.current, 1)[0]
    _items.splice(dragOverItem.current, 0, draggedItemContent)
    dragItem.current = 0
    dragOverItem.current = 0
    setLines(_items)
  }

  useEffect(() => {
    setLines(['line1', 'line2', 'line 3', 'line 4'])
  }, [])

  return (
    <div>
        <h1>{tittle}</h1>
        <div style={{ height: '40px', border: '#000 1px solid' }}>1</div>
    <>
        {
          lines.map((x, index) => {
            return (
              <div key={`test${index}`} style={{ height: '20px', margin: '2px 4px', border: 'green 1px solid' }}
              draggable
              onDragStart={ (e) => { dragItem.current = index } }
              onDragEnter={ (e) => { dragOverItem.current = index } }
              onDragEnd={ handleSort }
              onDragOver={ (e) => { e.preventDefault() }}

              >
                <b >{x}</b>
              </div>
            )
          }
          )
        }
      </>
    </div>
  )
}

export default Fpslider
