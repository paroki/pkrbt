"use client";

import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

// eslint-lint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state sehingga siklus render selanjutnya akan menunjukkan fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Kamu bisa mencatat error ke layanan pelacakan error di sini (seperti Sentry)
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      console.log(this.state);

      // Kamu bisa menyesuaikan fallback UI di sini
      return <h1>Something went wrong: {this.state.error?.message}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
