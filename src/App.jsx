import { createRoot } from 'react-dom';
import Pet from './Pet';
const App = () => {
  return (
    <div>
      <h1>Adopt me!</h1>
      <Pet name="luna" breed="havanese" animal="Dog" />
      <Pet name="Luna" breed="havanese" animal="Dog" />
      <Pet name="luna" breed="Havanese" animal="Dog" />
    </div>
  );
};
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
