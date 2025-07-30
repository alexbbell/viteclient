import * as React from 'react'
import { useEffect, useState } from 'react'
import { type IClockParams, type IPoint, type IWatch } from '../../interfaces'

const AbbAnalogClock = (props: IClockParams): JSX.Element => {
  const clockSize = props.size
  const [sec, setSec] = useState<number>(0)
  const center: IPoint = { x: 300, y: 300 }
  const defSv: JSX.Element = <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="400px" height="400px" viewBox="0 0 1280.000000 1280.000000"
    preserveAspectRatio="xMidYMid meet"></svg>
  const [sv, setSVG] = useState<JSX.Element>(defSv)

  const renderSVG = (coords: IWatch): JSX.Element => {
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width={`${clockSize}`} height={`${clockSize}`} viewBox={'0 0 600 600'}
        preserveAspectRatio="xMidYMid meet" >
       <metadata>
       Created by Aleksei Beliaev
       </metadata>
       <g fill="#000000" stroke="#F0F0F0">

       <title>Abb Analog Clock</title>
    <path stroke="null" d="m296.76615,3.50536c-0.88168,0.41764 -2.04179,1.39213 -2.55224,2.0882c-0.92809,1.29932 -0.97449,1.94899 -1.11371,21.71727c-0.09281,12.85403 0.0464,21.02121 0.32483,22.13491c0.27843,0.97449 1.16011,2.36663 1.90258,3.1091c1.34573,1.25292 1.76337,1.39213 4.64044,1.39213c2.87707,0 3.29471,-0.13921 4.64044,-1.39213c0.78888,-0.74247 1.62416,-2.0882 1.90258,-3.01629c0.32483,-1.0209 0.41764,-8.86325 0.32483,-22.13491c-0.13921,-19.8611 -0.18562,-20.51076 -1.11371,-21.81008c-1.20652,-1.67056 -3.66595,-2.92348 -5.75415,-2.92348c-0.88168,0 -2.32022,0.37124 -3.20191,0.83528z" id="svg_2"/>
    <path stroke="null" d="m153.00523,41.69621c-3.48033,1.0209 -5.70774,5.05808 -4.59404,8.30639c0.69607,2.04179 17.91211,32.80793 19.67548,35.22096c2.27382,3.06269 6.49662,3.57314 9.4201,1.11371c2.83067,-2.36663 3.43393,-5.29011 1.80977,-8.49201c-1.0209,-1.99539 -18.00492,-32.06546 -19.07222,-33.78243c-0.69607,-1.11371 -3.94438,-2.92348 -5.10449,-2.83067c-0.37124,0 -1.29932,0.23202 -2.1346,0.46404z" id="svg_3"/>
    <path stroke="null" d="m442.05842,41.97464c-1.80977,0.88168 -2.32022,1.67056 -13.50369,22.45974c-7.2855,13.5965 -8.3992,15.91672 -8.3992,17.68009c0,5.33651 6.72864,8.95606 10.58021,5.70774c1.16011,-0.97449 14.47818,-24.87277 20.00031,-35.82422c1.48494,-3.01629 1.29932,-5.75415 -0.51045,-7.84235c-2.50584,-2.83067 -5.29011,-3.61955 -8.16718,-2.18101z" id="svg_4"/>
    <path stroke="null" d="m549.48468,148.00876c-1.20652,0.41764 -32.20467,18.74739 -35.45298,20.9284c-1.94899,1.34573 -2.92348,3.1091 -2.92348,5.42932c0,3.85157 2.41303,6.54302 6.12538,6.82145l2.45943,0.23202l17.63368,-10.4874c9.83774,-5.89336 18.28335,-11.22987 19.16503,-12.11156c2.92348,-3.1555 1.71696,-8.63122 -2.41303,-10.4874c-2.1346,-0.97449 -2.73786,-1.0209 -4.59404,-0.32483z" id="svg_8"/>
    <path stroke="null" d="m45.16133,148.65842c-1.57775,1.0209 -3.06269,3.29471 -3.43393,5.38291c-0.46404,2.41303 0.78888,4.68685 3.43393,6.311c7.2855,4.45483 35.45298,19.67548 36.79871,19.8611c5.47572,0.92809 9.79133,-6.86786 6.07898,-10.95145c-1.0673,-1.11371 -26.91457,-15.87032 -35.40658,-20.18593c-2.64505,-1.34573 -5.66134,-1.48494 -7.47111,-0.41764z" id="svg_9"/>
    <path stroke="null" d="m7.29532,293.20822c-5.70774,1.67056 -5.56853,11.32268 0.23202,12.94684c1.0673,0.27843 9.51291,0.46404 21.67087,0.46404c18.05132,0 20.09312,-0.09281 21.57806,-0.83528c4.64044,-2.32022 5.01168,-9.14167 0.60326,-12.01875c-1.16011,-0.78888 -2.87707,-0.83528 -21.9493,-0.92809c-11.74032,-0.0464 -21.29963,0.09281 -22.13491,0.37124z" id="svg_12"/>
    <path stroke="null" d="m548.37097,293.57946c-2.32022,1.0673 -3.57314,3.1555 -3.57314,6.07898c0,3.01629 1.25292,5.01168 3.71235,6.07898c1.90258,0.88168 3.06269,0.92809 23.10941,0.78888c20.51076,-0.13921 21.11402,-0.18562 22.41334,-1.11371c3.80516,-2.78427 3.80516,-8.72403 0,-11.5083c-1.29932,-0.92809 -1.90258,-0.97449 -22.50615,-1.0673c-20.04671,-0.13921 -21.29963,-0.09281 -23.15581,0.74247z" id="svg_13"/>
    <path stroke="null" d="m62.56299,428.43073c-9.79133,5.84696 -18.23694,11.18347 -19.07222,12.06515c-3.1091,3.29471 -1.62416,9.00246 2.83067,10.67302c1.67056,0.64966 2.36663,0.69607 3.66595,0.27843c1.43854,-0.46404 31.92625,-18.37615 35.91703,-21.06761c5.47572,-3.71235 2.78427,-12.38998 -3.85157,-12.38998c-1.62416,0 -4.2228,1.39213 -19.48986,10.441z" id="svg_14"/>
    <path stroke="null" d="m515.23821,419.93872c-3.43393,1.94899 -4.68685,6.63583 -2.59865,9.65212c0.78888,1.20652 5.05808,3.85157 18.37615,11.46189c9.55931,5.42932 18.14413,10.11617 19.11863,10.39459c1.48494,0.46404 1.99539,0.41764 3.85157,-0.46404c5.33651,-2.59865 5.66134,-9.04886 0.64966,-12.15796c-3.99078,-2.50584 -31.74063,-18.23694 -33.5504,-19.02582c-2.41303,-1.11371 -3.80516,-1.0673 -5.84696,0.13921z" id="svg_15"/>
    <path stroke="null" d="m422.84699,510.7986c-3.20191,1.71696 -4.68685,5.10449 -3.43393,8.07437c0.74247,1.80977 17.58728,32.06546 19.8611,35.6386c2.50584,3.99078 7.09988,4.54763 10.4874,1.25292c1.76337,-1.71696 2.50584,-4.03719 1.90258,-6.12538c-0.23202,-0.78888 -4.96527,-9.65212 -10.53381,-19.58267c-10.90504,-19.39705 -11.5083,-20.18593 -14.89582,-20.18593c-0.92809,0.0464 -2.45943,0.46404 -3.38752,0.92809z" id="svg_17"/>
    <path stroke="null" d="m171.65981,512.19073c-0.97449,0.60326 -4.82606,6.45022 -12.48279,18.8866c-10.06976,16.28796 -11.13706,18.19054 -11.13706,20.09312c-0.09281,3.80516 2.96988,6.49662 7.3319,6.49662c1.76337,0 2.41303,-0.27843 3.75876,-1.53135c1.76337,-1.62416 21.85649,-33.87523 22.78458,-36.56669c1.90258,-5.42932 -5.29011,-10.58021 -10.25538,-7.3783z" id="svg_18"/>
    <path stroke="null" d="m296.90537,545.09147c-1.43854,0.64966 -3.34112,3.1555 -3.66595,4.82606c-0.13921,0.83528 -0.23202,10.71942 -0.13921,21.9957c0.13921,19.8611 0.18562,20.51076 1.11371,21.81008c2.78427,3.80516 8.72403,3.80516 11.5083,0c0.92809,-1.29932 0.97449,-1.94899 1.11371,-22.0421c0.09281,-13.41088 0,-21.34604 -0.32483,-22.36694c-0.27843,-0.92809 -1.11371,-2.27382 -1.90258,-3.01629c-1.16011,-1.11371 -1.85618,-1.34573 -4.03719,-1.48494c-1.48494,-0.0464 -3.1091,0.0464 -3.66595,0.27843z" id="svg_19"/>
    <text transform="matrix(1 0 0 1 0 0)" xmlSpace='preserve' textAnchor='start' fontSize={54} fill="#000000" id="svg_20" y="105.92346" x="270.85613" stroke="null">XII</text>
    <text transform="matrix(1 0 0 1 0 0)" xmlSpace='preserve' textAnchor='start' fontSize={54} fill="#000000" id="svg_21" y="310.09339" x="487.84958" stroke="null">III</text>
    <text xmlSpace='preserve' textAnchor='start' fontSize={54} fill="#000000" id="svg_22" y="525.97748" x="275.10611" stroke="null">VI</text>
    <text xmlSpace='preserve' textAnchor='start' fontSize={54} fill="#000000" id="svg_23" y="310.0934" x="67.41554" stroke="null">IX</text>
    <text xmlSpace='preserve' textAnchor='start' fontSize={54} fill="#000000" id="svg_23" y="210.0934" x="190.41554" stroke="null">Aleksei</text>
    <text xmlSpace='preserve' textAnchor='start' fontSize={54} fill="#000000" id="svg_23" y="270.0934" x="190.41554" stroke="null">Beliaev</text>
    <line x2={coords.hour.x} y2={coords.hour.y} x1={center.x} y1={center.y} stroke="orange" strokeWidth={40} />
    <line x2={coords.min.x} y2={coords.min.y} x1={center.x} y1={center.y} stroke="green" strokeWidth={30} />
    <line x2={coords.sec.x} y2={coords.sec.y} x1={center.x} y1={center.y} stroke="yellow" strokeWidth={20} />
    <path id="svg_7" d="m300,310.67404c-5.89726,0 -10.67405,-4.77678 -10.67405,-10.67405c0,-5.89726 4.77678,-10.67405 10.67405,-10.67405c5.89726,0 10.67405,4.77678 10.67405,10.67405c0,5.89726 -4.77678,10.67405 -10.67405,10.67405z" opacity="undefined" stroke="null"/>
       </g>
       </svg>
    )
  }

  useEffect(() => {
    const radSec: number = 250
    const radMin: number = 200
    const radHour: number = 150
    setTimeout(() => {
      const d = new Date()
      const tSec: number = 6 * d.getSeconds() // Определяем угол для секунд
      const tMin = 6 * (d.getMinutes() + (1 / 60) * d.getSeconds()) // Определяем угол для минут
      const tHour = 30 * (d.getHours() % 12 + (1 / 60) * d.getMinutes()) // Определяем угол для часов

      const secGrad: number = tSec * (Math.PI / 180)
      const secondsLineX: number = center.x + radSec * Math.cos(Math.PI / 2 - secGrad)
      const secondsLineY: number = center.y - radSec * Math.sin(Math.PI / 2 - secGrad)

      const minGrad: number = tMin * (Math.PI / 180)
      const minLineX = center.x + radMin * Math.cos(Math.PI / 2 - minGrad)
      const minLineY: number = center.y - radMin * Math.sin(Math.PI / 2 - minGrad)

      const hourGrad: number = tHour * (Math.PI / 180)
      const hourLineX: number = center.x + radHour * Math.cos(Math.PI / 2 - hourGrad)
      const hourLineY: number = center.y - radHour * Math.sin(Math.PI / 2 - hourGrad)

      const localCoords: IWatch = {
        sec: {
          x: secondsLineX,
          y: secondsLineY
        },
        min: {
          x: minLineX,
          y: minLineY
        },
        hour: {
          x: hourLineX,
          y: hourLineY
        }
      }
      setSVG(renderSVG(localCoords))
      setSec(sec + 1)
    }, 1000)
  }, [sec])

  return (
        <div style={{ height: `${clockSize}px`, width: `${clockSize}px`, alignContent: 'center', textAlign: 'center', margin: '0px auto' }}>
        { sv }
        </div>
  )
}

export default AbbAnalogClock
