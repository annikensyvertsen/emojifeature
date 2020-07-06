import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../ThemeProvider'

export const Header: React.FC = () => {
  const { theme } = useContext(ThemeContext)

  const buttons: Array<String> = ['home', 'chat', 'stream']
  return (
    <Container theme={theme}>
      {buttons.map((button, i) => (
        <Button key={i} theme={theme}>
          <p>{button}</p>
        </Button>
      ))}
    </Container>
  )
}

const Button = styled.button`
   background: ${props => (props.theme === 'light' ? '#282c34' : 'white')}; 
   color: ${props => (props.theme === 'light' ? 'white' : '#282c34')}; 
   margin: 10px;
   width: 150px;
   border-radius: 5px;
   outline: none;
   border-style: none;
   &:hover {
     letter-spacing: 5px;
   }
  }
`

const Container = styled.div`
  background: ${props => (props.theme === 'light' ? 'white' : '#282c34')}; 
  display: 'flex',
      marginLeft: '10%'
`
