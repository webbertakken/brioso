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
          <span style={{ color: 'red' }}>Error</span>
          {isDevelopment() && <span>: {this.state.error?.message}</span>}
        </div>
      )
    }

    return <>{this.props.children}</>
  }
}
