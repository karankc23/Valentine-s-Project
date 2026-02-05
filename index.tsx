
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Valentine App: Initializing...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Valentine App: Root element not found!");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Valentine App: Mounted successfully.");
} catch (error) {
  console.error("Valentine App: Failed to mount app:", error);
}
