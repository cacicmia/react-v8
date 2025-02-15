import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }
  render() {
    if (this.state.hasError) {
      <h2>
        There was an error with this listing. <Link to="/">Click here</Link> to back to the home
        page.
      </h2>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
