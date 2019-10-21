import React from 'react';
import './App.css';
import { TeamDraft } from './components/TeamDraft/TeamDraft';

const App: React.FC = () => {
  return (
    <div className="App">
      <TeamDraft budgetLimit={200000} />
    </div>
  );
}

export default App;
