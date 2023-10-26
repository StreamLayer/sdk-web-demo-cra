import { useState } from 'react';
import { StreamLayerProvider, StreamLayerSDKReact, useStreamLayer } from '@streamlayer/react'
import '@streamlayer/react/style.css'

const EventInput = () => {
  const sdk = useStreamLayer()
  const [event, setEvent] = useState('')
  const startEventSession = () => {
    sdk?.createEventSession(event)
  }

  if (!sdk) {
    return null
  }

  return (
    <div>
      <input type="text" value={event} onChange={e => setEvent(e.target.value)} />
      <button onClick={startEventSession}>set</button>
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <StreamLayerProvider sdkKey={process.env.REACT_APP_SDK_KEY}>
        <EventInput />
        <StreamLayerSDKReact />
      </StreamLayerProvider>
    </div>
  );
}

export default App;
