export type BlocType = 'course' | 'marche' | 'repos' | 'echauffement';

export type Bloc = {
  id: string;
  type: BlocType;
  mode: 'temps' | 'distance';
  duration?: number; // en secondes
  distance?: number; // en mètres
  repeat?: number;
};

export type Session = {
  id: string;
  name: string;
  blocs: Bloc[];
};