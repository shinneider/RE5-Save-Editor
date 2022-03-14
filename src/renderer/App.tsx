import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import GameStatus from './screens/GameStatus';
import HackScreen from './screens/HackScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameStatus />} />
        <Route path="/hack-form" element={<HackScreen />} />
      </Routes>
    </Router>
  );
}
