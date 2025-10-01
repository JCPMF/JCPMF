import React, { useState } from 'react';
import SessionCreator from './components/SessionCreator';
import SessionPlayer from './components/SessionPlayer';
import { Session } from './types';

const App = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);

  const handleCreateSession = (session: Session) => {
    setSessions([...sessions, session]);
  };

  if (activeSession) {
    return <SessionPlayer session={activeSession} />;
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Roboto, sans-serif' }}>
      <h1 style={{ color: '#E53935' }}>JCPMF 🏃</h1>
      <SessionCreator onCreate={handleCreateSession} />
      <h2>Mes séances</h2>
      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            {s.name}{' '}
            <button onClick={() => setActiveSession(s)}>Démarrer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
