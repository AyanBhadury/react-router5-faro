// initializeFaro.ts
import {
    initializeFaro as coreInit,
    getWebInstrumentations,
    ReactIntegration,
    Faro,
    createReactRouterV5Options
  } from '@grafana/faro-react'
  
  import { TracingInstrumentation } from '@grafana/faro-web-tracing'
  import { createBrowserHistory } from 'history'
  import { Route } from 'react-router-dom'
  
  // Create shared history object for React Router v5
  export const history = createBrowserHistory()
  
  export function initializeFaro(): Faro {
    const faro = coreInit({
      url: process.env.REACT_APP_URL || '',
      app: {
        name: process.env.REACT_APP_NAME || 'default-app-name',
        version: '1.0.0',
        environment: 'deployment.environment'
      },
      instrumentations: [
        ...getWebInstrumentations({
          captureConsole: true
        }),
        new TracingInstrumentation(),
        new ReactIntegration({
          router: createReactRouterV5Options({
            //@ts-ignore
            history,
            Route
          })
        }),
      ],
      sessionTracking: {
        generateSessionId(): string {
          return `my-custom-id-${Math.random()}`
        },
        session: {
          attributes: {
            'my-custom-attribute': 'my-custom-attribute-value',
          },
        },
      }
    })
  
    console.log('from initializeFaro')
    console.log(process.env.REACT_APP_NAME)
  
    faro.api.pushMeasurement({
      type: 'cart-transaction',
      values: {
        delay: 122,
        duration: 4000,
      },
    })
  
    faro.api.pushMeasurement(
      {
        type: 'internal_framework_measurements',
        values: {
          root_render_ms: 142.3,
          memory_used: 286,
        },
      },
      {
        context: {
          hello: 'world',
        },
      }
    )
  
    return faro
  }
  