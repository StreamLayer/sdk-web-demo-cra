import { useState } from 'react'
import { StreamLayerProvider, DeepLinkCallback, VideoPlayerCallback, StreamLayerSDKReact } from '@streamlayer/react'
import { StreamLayerSDKPoints } from '@streamlayer/react/points'
import { StreamLayerLogin } from '@streamlayer/react/auth'
import '@streamlayer/react/style.css'

const EVENT_ID = process.env.REACT_APP_EVENT_ID || ''
const SDK_KEY = process.env.REACT_APP_SDK_KEY || ''
const PRODUCTION = process.env.REACT_APP_PRODUCTION === 'true'

const cb: DeepLinkCallback = (params) => {
  console.log('DeepLinkUrlParams', params)
  // enable FG+
}

type VideoPlayerData = {
  muted: boolean
}

const toggleVideoVolume: VideoPlayerCallback = ({ muted }: VideoPlayerData) => {
  console.log('ToggleVideoVolume', muted)
  const player = document.getElementsByTagName('video')[0] as HTMLVideoElement

  if (muted) {
    player.volume = 0
  } else {
    player.volume = 1
  }
}

function App() {
  const [event, setEventId] = useState('')
  const [user, setUser] = useState({ token: '', schema: '' })

  const submitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const token = data.get('token') as string
    const schema = data.get('schema') as string

    setUser({ token, schema })
  }

  const activateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const event = data.get('event') as string

    setEventId(event)
  }

  return (
    <div className='app-div'>
      <div className='app-container'>
        <StreamLayerProvider sdkKey={SDK_KEY} production={PRODUCTION} onDeepLinkHandled={cb} videoPlayerController={toggleVideoVolume}>
          <div className='points'>
            <StreamLayerSDKPoints />
          </div>
          <StreamLayerLogin token={user.token} schema={user.schema} />
          <StreamLayerSDKReact event={event} />
        </StreamLayerProvider>
      </div>
      <div className='settings'>
        <form className='auth-form' onSubmit={submitUser}>
          <div>
            <label htmlFor="token">token</label>
            <input type="text" id="token" name="token" />
          </div>
          <div>
            <label htmlFor="schema">schema</label>
            <input type="text" id="schema" name="schema" />
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
        <form className='auth-form' onSubmit={activateEvent}>
          <div>
            <label htmlFor="event">event</label>
            <input type="text" id="event" name="event" defaultValue={EVENT_ID} />
          </div>
          <div>
            <button type="submit">activate</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
