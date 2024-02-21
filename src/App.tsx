import { useState } from 'react'
import { StreamLayerLogin, MastersStreamLayerProvider, MastersStreamLayerSDKReact, StreamLayerSDKPoints } from '@streamlayer/react/masters'
import '@streamlayer/react/style.css'

const EVENT_ID = process.env.REACT_APP_EVENT_ID || ''
const SDK_KEY = process.env.REACT_APP_SDK_KEY || ''
const PRODUCTION = process.env.REACT_APP_PRODUCTION === 'true'

type DeepLinkUrlParams = {
  // StreamLayer user id
  sldl_uid?: string
  // StreamLayer event id
  sldl_eid?: string
  // Masters event id
  sldl_e_eid?: string
}

const cb = ({ sldl_uid, sldl_eid, sldl_e_eid }: DeepLinkUrlParams) => {
  console.log('DeepLinkUrlParams', { sldl_uid, sldl_eid, sldl_e_eid })
  // enable FG+
}

type VideoPlayerData = {
  muted: boolean
}

const toggleVideoVolume = ({ muted }: VideoPlayerData) => {
  console.log('ToggleVideoVolume', muted)
  const player = document.getElementsByTagName('video')[0] as HTMLVideoElement

  if (muted) {
    player.volume = 0
  } else {
    player.volume = 1
  }
}

function App() {
  const [user, setUser] = useState({ token: '', schema: '' })

  const submitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const token = data.get('token') as string
    const schema = data.get('schema') as string

    setUser({ token, schema })
  }

  return (
    <div className='app-div'>
      <div className='app-container'>
        <MastersStreamLayerProvider sdkKey={SDK_KEY} production={PRODUCTION} onDeepLinkHandled={cb} videoPlayerController={toggleVideoVolume}>
          <div className='points'>
            <StreamLayerSDKPoints />
          </div>
          <StreamLayerLogin token={user.token} schema={user.schema} />
          <MastersStreamLayerSDKReact>
              {({ activateEventWithId, deactivate }) => (
                <div id="rendered-by-sdk">
                  <button onClick={() => activateEventWithId(EVENT_ID)}>Open event {EVENT_ID}</button>
                  <button onClick={deactivate}>Close event</button>
                </div>
              )}
            </MastersStreamLayerSDKReact>
        </MastersStreamLayerProvider>
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
      </div>
    </div>
  )
}

export default App
