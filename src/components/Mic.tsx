import React, { FC, useState } from 'react'
import { ReactMic } from 'react-mic'

export const Mic: FC = () => {
  let [record, setRecorder] = useState({ record: false })
  let [blob, setBlob] = useState('')
  const startRecording = () => {
    setRecorder({ record: true })
  }

  const stopRecording = () => {
    setRecorder({ record: false })
  }

  async function onData (recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob)

    //trying to convert the blob to a wav file

    if (recordedBlob.size > 1100) {
      createHeart()
      animateHeart()
      fade(document.getElementById(soundId))
    }
  }

  function onStop (recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob)
    setBlob(recordedBlob.blobURL)
  }

  let soundId = 'heart_0'
  function createHeart () {
    soundId = soundId.split('_')[1]
    let newId = parseInt(soundId)
    newId += 1
    let newNumber = newId.toString()
    let s = 'heart_'
    soundId = s.concat(newNumber)
    console.log('soundid', soundId)
    let z = document.createElement('span')
    z.setAttribute('id', soundId)
    document.body.appendChild(z)
    let x = document.createTextNode('❤️')
    z.setAttribute('role', 'img')
    z.setAttribute(
      'style',
      'position: absolute; left:310px; bottom:400px; width: 50px; bottom:50px; height: 50px; '
    )
    z.appendChild(x)
    console.log('ZZZ', z)
  }
  const animateHeart = () => {
    let e = document.getElementById(soundId)
    let pos = 300
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
    }, 600)
  }

  return (
    <div>
      <h1>Mic</h1>
      <ReactMic
        record={record.record}
        className='sound-wave'
        onStop={onStop}
        onData={onData}
        strokeColor='#000000'
        backgroundColor='grey'
        mimeType='audio/webm'
        /*         mimeType='audio/wav'
         */
      />
      <button onClick={startRecording} type='button'>
        Start
      </button>
      <button onClick={stopRecording} type='button'>
        Stop
      </button>
      <div id='audiocontrols'>
        <audio controls src={blob}></audio>
      </div>
      {/* <AudioSpectrum
        id='audio-canvas'
        height={200}
        width={300}
        audioId={blob}
        capColor={'red'}
        capHeight={2}
        meterWidth={2}
        meterCount={512}
        meterColor={[
          { stop: 0, color: '#f00' },
          { stop: 0.5, color: '#0CD7FD' },
          { stop: 1, color: 'red' }
        ]}
        gap={4}
      /> */}
    </div>
  )
}

export default Mic
