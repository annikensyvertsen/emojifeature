import React from 'react'
import socketIOClient from 'socket.io-client'
import styled from 'styled-components'

const ENDPOINT = 'http://192.168.1.191:8000'
const socket = socketIOClient(ENDPOINT)

interface ReactionProps {
  mobileScreen: boolean
  fullScreen: boolean
}
let countId = '1'

const Reactions = ({ mobileScreen, fullScreen }: ReactionProps) => {
  function createNewHeart () {
    console.log('mobileScreen', mobileScreen, 'fullscreen: ', fullScreen)
    let newId = parseInt(countId)
    console.log('heart with ID', newId)
    newId += 1
    countId = newId.toString()
    let y = document.createElement('span')
    y.setAttribute('id', countId)
    document.body.appendChild(y)
    if (parseInt(countId) % 3 === 0) {
      let x = document.createTextNode('😍')
      let randomX = Math.floor(Math.random() * window.innerWidth)
      y.setAttribute('role', 'img')
      y.setAttribute(
        'style',
        'position: absolute; bottom:30px; width: 50px; height: 50px; left:' +
          randomX.toString() +
          'px'
      )
      y.appendChild(x)
    }
  }
  const animateHeart = () => {
    let e = document.getElementById(countId)
    let pos = 30
    let id = setInterval(frame, 10)
    function frame () {
      if (e !== undefined && e !== null) {
        if (pos === 950) {
          clearInterval(id)
        } else {
          pos++
          e.style.bottom = pos + 'px'
        }
      }
    }
  }
  function fade (element: any) {
    var op = 1 // initial opacity
    var timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer)
        element.style.display = 'none'
      }
      element.style.opacity = op
      element.style.filter = 'alpha(opacity=' + op * 100 + ')'
      op -= op * 0.2
    }, 500)
  }

  const onHeartClick = () => {
    socket.emit('press heart')
    return false
  }

  socket.on('press heart', function () {
    if (fullScreen) {
      createNewHeart()
      animateHeart()
      fade(document.getElementById(countId))
    }
  })

  return (
    <div>
      {mobileScreen && (
        <Button onClick={onHeartClick}>
          <img
            style={{ width: '200px' }}
            id='eHeart'
            alt='hearteyes'
            src='hearteyes.png'
          ></img>
        </Button>
      )}
    </div>
  )
}

export default Reactions

export const Button = styled.button`
  margin-top: 300px;
  border-radius: 5px;
  background: none;
  border-style: none;
  outline: none;
  touch-action: manipulation;
  outline: none;
  focus: none;
`
