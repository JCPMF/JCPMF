import React, { useState } from 'react';
import { Bloc, BlocType, Session } from '../types';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onCreate: (session: Session) => void;
};

const SessionCreator: React.FC<Props> = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [blocs, setBlocs] = useState<Bloc[]>([]);

  const addBloc = () => {
    setBlocs([
      ...blocs,
      {
        id: uuidv4(),
        type: 'course',
        mode: 'temps',
        duration: 60,
      },
    ]);
  };

  const updateBloc = (index: number, field: keyof Bloc, value: any) => {
    const newBlocs = [...blocs];
    (newBlocs[index] as any)[field] = value;
    setBlocs(newBlocs);
  };

  const handleCreate = () => {
    if (!name || blocs.length === 0) return;
    onCreate({ id: uuidv4(), name, blocs });
    setName('');
    setBlocs([]);
  };

  return (
    <div>
      <h2>Créer une séance</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de la séance"
      />
      {blocs.map((bloc, i) => (
        <div key={bloc.id}>
          <select
            value={bloc.type}
            onChange={(e) => updateBloc(i, 'type', e.target.value)}
          >
            <option value="course">Course</option>
            <option value="marche">Marche</option>
            <option value="repos">Repos</option>
            <option value="echauffement">Échauffement</option>
          </select>
          <select
            value={bloc.mode}
            onChange={(e) => updateBloc(i, 'mode', e.target.value)}
          >
            <option value="temps">Temps</option>
            <option value="distance">Distance</option>
          </select>
          {bloc.mode === 'temps' ? (
            <input
              type="number"
              value={bloc.duration}
              onChange={(e) => updateBloc(i, 'duration', parseInt(e.target.value))}
              placeholder="Durée (s)"
            />
          ) : (
            <input
              type="number"
              value={bloc.distance}
              onChange={(e) => updateBloc(i, 'distance', parseInt(e.target.value))}
              placeholder="Distance (m)"
            />
          )}
          <input
            type="number"
            placeholder="Répétitions"
            value={bloc.repeat || ''}
            onChange={(e) =>
              updateBloc(i, 'repeat', e.target.value ? parseInt(e.target.value) : undefined)
            }
          />
        </div>
      ))}
      <button onClick={addBloc}>Ajouter un bloc</button>
      <button onClick={handleCreate}>Créer la séance</button>
    </div>
  );
};

export default SessionCreator;
