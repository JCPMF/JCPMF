import React, { useEffect, useState } from 'react';
import { Bloc } from '../types';
import { speak } from '../utils/speech';

type Props = {
  bloc: Bloc;
  onComplete: () => void;
};

const BlockTimer: React.FC<Props> = ({ bloc, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(bloc.duration || 0);

  useEffect(() => {
    if (bloc.mode === 'temps' && bloc.duration) {
      speak(`${bloc.type} pendant ${bloc.duration} secondes`);
      const timer = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timer);
            onComplete();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else if (bloc.mode === 'distance' && bloc.distance) {
      speak(`${bloc.type} sur ${bloc.distance} mètres`);
      // En vrai usage, ici on écouterait le GPS
      const fakeTimer = setTimeout(() => onComplete(), 5000);
      return () => clearTimeout(fakeTimer);
    }
  }, []);

  return (
    <div>
      <h3>{bloc.type.toUpperCase()}</h3>
      <p>
        {bloc.mode === 'temps'
          ? `Temps restant : ${timeLeft}s`
          : `Distance : ${bloc.distance} m`}
      </p>
    </div>
  );
};

export default BlockTimer;

