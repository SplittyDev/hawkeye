import styled from 'styled-components'
import { useRef } from 'react'

const Clock = ({ className }) => {
  setInterval(setClock, 1000)

  const hourHand = useRef(null)
  const minuteHand = useRef(null)
  const secondHand = useRef(null)

  function setClock() {
    if (hourHand.current === null || minuteHand.current === null || secondHand.current === null) return
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand.current, secondsRatio)
    setRotation(minuteHand.current, minutesRatio)
    setRotation(hourHand.current, hoursRatio)
  }

  function setRotation(e, rotationRatio) {
    e.style.setProperty('--rotation', rotationRatio * 360)
  }

  return (
    <div className={className}>
      <div className='clock'>
        <div className='hand hour' ref={hourHand}></div>
        <div className='hand minute' ref={minuteHand}></div>
        <div className='hand second' ref={secondHand}></div>
        <div className='number number1'>1</div>
        <div className='number number2'>2</div>
        <div className='number number3'>3</div>
        <div className='number number4'>4</div>
        <div className='number number5'>5</div>
        <div className='number number6'>6</div>
        <div className='number number7'>7</div>
        <div className='number number8'>8</div>
        <div className='number number9'>9</div>
        <div className='number number10'>10</div>
        <div className='number number11'>11</div>
        <div className='number number12'>12</div>
      </div>
    </div>
  )
}

const WidgetStyled = styled(Clock)`
/* background: linear-gradient(to right, hsl(200,100%,50%), hsl(175,100%,50%)) */

.clock{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid black;
  position: relative;
}

.clock::after {
  content: '';
  position: absolute;
  background-color: black;
  z-index: 11;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.number{
  --rotation: 0;
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  transform: rotate(var(--rotation))
}

.number1{--rotation: 30deg;}
.number2{--rotation: 60deg;}
.number3{--rotation: 90deg;}
.number4{--rotation: 120deg;}
.number5{--rotation: 150deg;}
.number6{--rotation: 180deg;}
.number7{--rotation: 210deg;}
.number8{--rotation: 240deg;}
.number9{--rotation: 270deg;}
.number10{--rotation: 300deg;}
.number11{--rotation: 330deg;}

.hand{
  --rotation: 0;
  position: absolute;
  bottom: 50%;
  left: 50%;
  background-color: black;
  border: 1px solid white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform-origin: bottom;
  transform: translateX(-50%) rotate(calc(var(--rotation)* 1deg));
}

.hand.second{
width: 3px;
height: 40%;
background-color: red;
}

.hand.minute{
width: 7px;
height: 40%;
background-color: black;
}

.hand.hour{
width: 10px;
height: 35%;
background-color: black;
}
`
const WidgetDefinition = {
  id: 'hwk_clock_widget',
  name: 'Clock',
  tags: ['clock', 'time'],
  component: WidgetStyled,
}

export default WidgetDefinition
