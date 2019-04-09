# redux-serviceworker

---------------

### Credits

Credit to https://github.com/giantmachines/redux-websocket for the base structure of this fork. 

---------------
## Summary

A Redux middleware for managing serviceWorker related stuff.

This middleware uses actions, dispatched with Redux such as actions to interact with a broadcastChannel ----- more to be added


## Installation

```bash
$ npm install @joelgullander/redux-serviceworker --save
```

## Middleware Installation

Once you have installed the library via npm, you can add it to your Redux middleware stack just like you would any other middleware.

```javascript
// ... other imports
import serviceWorker from '@joelgullander/redux-serviceworker'

const app = combineReducers(reducers)
const store = createStore(
  app,
  applyMiddleware(
    serviceWorker,
    ...
  )
)
```

## //TODO: prefix examples

## Available Action Types

The following types are available.

```javascript
// Action types to be dispatched by the user
BROADCASTER_CONNECT

// Action types dispatched by the BROADCASTER implementation.
// These would be caught by reducers or other middleware.
BROADCASTER_MESSAGE
```

They can be imported from the standard package and used like so

```javascript
import { BROADCASTER_CONNECT } from '@joelgullander/redux-serviceworker'

store.dispatch({
  type: BROADCASTER_CONNECT,
  payload: {
    name: 'my_api_broadcastchannel'
  }
})
```

## Actions

### BROADCASTER_CONNECT

Declares a connection to the serviceworker broadcast message-queue based of a name identifier

```javascript
{
  type: BROADCASTER_CONNECT,
  payload: {
    name: string 
  }
}
```

## Tips

### Broadcast DEBUGGING

```javascript
const debugBroadcast = new BroadcastChannel('DESIREDQUEUE')
debugBroadcast.postMessage("testing")
```

This can be done in console in browser aswell.
