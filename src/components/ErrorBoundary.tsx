import React from "react";

type State = {
  hasError: boolean;
  error: string;
};

class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
    };
  }

  static getDerivedStateFromError(error: Error) {
    console.log("hihi");
    return {
      hasError: true,
      error: error.message,
    };
  }

  componentDidCatch(error: Error) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.state.error}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
