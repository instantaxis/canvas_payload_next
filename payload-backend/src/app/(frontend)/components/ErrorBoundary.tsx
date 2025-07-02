
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * @description ErrorBoundary component to catch and display UI errors.
 * @augments {React.Component<Props, State>}
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  /**
   * @description Derives state from an error. Used to update the state so the next render will show the fallback UI.
   * @param {Error} _error - The error that was thrown.
   * @returns {State} The new state.
   */
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /**
   * @description Catches uncaught errors and logs them.
   * @param {Error} error - The error that was thrown.
   * @param {ErrorInfo} errorInfo - Information about the error.
   * @returns {void}
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  /**
   * @description Renders the component or the fallback UI if an error occurred.
   * @returns {ReactNode}
   */
  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
