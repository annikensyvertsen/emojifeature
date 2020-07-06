import React, { FC } from 'react'
import styled from 'styled-components'
import './App.css'
import socketIOClient from 'socket.io-client'

interface HomeProps {}

export const Home: FC = () => {
  let countId = '1'
  function createNewHeart () {
    let newId = parseInt(countId)
    console.log('create heart', newId)
    newId += 1
    console.log('newid', newId)

    countId = newId.toString()
    let y = document.createElement('span')
    y.setAttribute('id', countId)
    document.body.appendChild(y)
    let x = document.createTextNode('😍')
    y.setAttribute('role', 'img')
    y.setAttribute(
      'style',
      'position: absolute; bottom:400px; left: 300px; width: 50px; height: 50px; '
    )
    y.appendChild(x)
  }
  const animateHeart = () => {
    let e = document.getElementById(countId)
    let pos = 300
    let id = setInterval(frame, 10)
    function frame () {
      if (e !== undefined && e !== null) {
        if (pos === 850) {
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
    console.log('does it fade?', element)
    var timer = setInterval(function () {
      if (op <= 0.1) {
        clearInterval(timer)
        element.style.display = 'none'
      }
      element.style.opacity = op
      element.style.filter = 'alpha(opacity=' + op * 100 + ')'
      op -= op * 0.2
    }, 300)
  }
  const ENDPOINT = 'http://192.168.1.191:8000'

  const socket = socketIOClient(ENDPOINT)

  const onHeartClick = e => {
    e.preventDefault()
    socket.emit('press heart')
    console.log('onheartclick')
    return false
  }

  socket.on('press heart', function () {
    console.log('calling all functions')
    createNewHeart()
    animateHeart()
    fade(document.getElementById(countId))
  })

  return (
    <Container>
      <Button onClick={e => onHeartClick(e)}>
        <img
          style={{ width: '50px' }}
          id='eHeart'
          alt='hearteyes'
          src='hearteyes.png'
        ></img>
      </Button>
    </Container>
  )
}

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export const Button = styled.button`
  border-radius: 5px;
  background: none;
  border-style: none;
  outline: none;
`
export default Home
