import React, { ErrorInfo, PropsWithChildren } from 'react'
import { isDevelopment } from '../../utils/isProduction.tsx'

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export default class ErrorBoundary extends React.Component<PropsWithChildren, State> {
  state: State

  constructor(props: PropsWithChildren<State>) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, 'error info =', errorInfo)
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ display: 'block' }}>
          <pre style={{ padding: '1rem', fontSize: '200%', margin: 0 }}>
            <span style={{ color: 'red' }}>Error</span>
            <span>: {this.state.error?.message}</span>
          </pre>
          {isDevelopment() && this.state.error && (
            <>
              <div style={{ padding: '1rem', fontSize: '150%', margin: 0 }}>
                <pre>Method: {this.state.error.stack?.split('at')[1].trim().split(/\s/)[0]}</pre>
              </div>

              <div
                style={{
                  background: 'rgba(0,0,0,.15)',
                  border: '2px dotted rgba(255,255,255,.15)',
                  padding: '1rem',
                }}
              >
                <pre>{this.state.error.stack}</pre>
              </div>
            </>
          )}
        </div>
      )
    }

    return <>{this.props.children}</>
  }
}
