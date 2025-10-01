import React, { useState } from 'react';
import { Session, Bloc } from '../types';
import BlockTimer from './BlockTimer';

type Props = {
  session: Session;
};

const SessionPlayer: React.FC<Props> = ({ session }) => {
  const [currentBlocIndex, setCurrentBlocIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);

  const currentBloc = session.blocs[currentBlocIndex];

  const handleBlocComplete = () => {
    if (currentBloc.repeat && repeatCount + 1 < currentBloc.repeat) {
      setRepeatCount(repeatCount + 1);
    } else {
      setRepeatCount(0);
      setCurrentBlocIndex(currentBlocIndex + 1);
    }
  };

  if (!currentBloc) {
    return <h2>Séance terminée ! 🎉</h2>;
  }

  return (
    <div>
      <h2>{session.name}</h2>
      <BlockTimer bloc={currentBloc} onComplete={handleBlocComplete} />
    </div>
  );
};

export default SessionPlayer;

