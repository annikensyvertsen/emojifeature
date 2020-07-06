import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from './ThemeProvider'
import { Home } from './Home'
import { AppTheme } from './colors'
import styled from 'styled-components'
import { Mic } from './components/Mic'
import axios from 'axios'
import ReactPlayer from 'react-player'
import Reactions from './components/Reactions'

//export const createHeartEmoji = (payload) => api.post(`/createHeart`, payload)
//const ENDPOINT = 'http://192.168.1.191:8000'

const App: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [APIResponse, setAPIResponse] = useState('')
  const [heartCount, setHeartCount] = useState(0)
  const [display, setDisplay] = useState(false)
  const [mobileScreen, setMobileScreen] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)

  const callAPI = () => {
    fetch('http://192.168.1.191:8000/testAPI')
      .then(res => res.text())
      .then(res => setAPIResponse(res))
  }

  const increaseCount = async id => {
    await axios.put('http://192.168.1.191:8000/api/emoji/' + id).then(res => {
      setHeartCount(res.data.count)
    })
  }
  const getEmojis = async () => {
    await axios.get('http://192.168.1.191:8000/api/emojis').then(res => {
      setHeartCount(res.data.data[0].count)
    })
  }

  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobileScreen(true)
    } else {
      setMobileScreen(false)
    }
    if (window.innerWidth > 900) {
      setFullScreen(true)
    }

    callAPI()
    getEmojis()
  }, [])
  return (
    <div>
      <Container theme={theme}>
        {fullScreen && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginLeft: '3%'
            }}
          >
            <img
              width='100px'
              height='60px'
              alt='anywhere-logo'
              src='anywhere-logo.png'
              style={{ marginTop: '20px' }}
            />
            <div>
              <Heading>LIVE CONCERT</Heading>
            </div>
            <img
              width='100px'
              height='60px'
              alt='anywhere-logo'
              src='anywhere-logo.png'
              style={{ opacity: '0' }}
            />
          </div>
        )}

        {display ? (
          <div>
            {' '}
            <Button theme={theme} onClick={toggleTheme}>
              {theme === 'light' ? 'light ☀️' : 'dark 🌙'} mode
            </Button>
            <VideoFrame />
            <Home />
            <Mic />
            <Button theme={theme} onClick={getEmojis}>
              -- Check Network Connection--
            </Button>
            <Button
              theme={theme}
              onClick={() => {
                increaseCount('31')
              }}
            >
              -- Increase Heart Emoji Count--
            </Button>
            <h1>The heart count is: {heartCount} </h1>
          </div>
        ) : (
          <div>
            <Reactions fullScreen={fullScreen} mobileScreen={mobileScreen} />
          </div>
        )}
        {!mobileScreen && (
          <div>
            <Wrapper>
              <div style={{ width: '100%', marginLeft: '3%' }}>
                <h3 style={{ textAlign: 'center' }}>
                  Streaming right now, at this very moment: Dua Lipa
                </h3>
              </div>
              <ReactPlayer
                width={'80vw'}
                height={'75vh'}
                url='https://www.youtube.com/watch?v=Nwh_lkETRX0'
              />
            </Wrapper>
          </div>
        )}
      </Container>
    </div>
  )
}

const Container = styled.div`
  background: ${props => AppTheme[props.theme].backgroundColor};
  color: ${props => AppTheme[props.theme].textColor};
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const Heading = styled.h1`
  font-size: 40px;
`

const Button = styled.button`
  font-family: helvetica;
  background: ${props => AppTheme[props.theme].textColor};
  color: ${props => AppTheme[props.theme].backgroundColor};
  border-radius: 5px;
  outline: none;
  height: 30px;
`
const VideoFrame = styled.div`
  width: 700px;
  height: 300px;
  margin: 10px;
  background: black;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default App
