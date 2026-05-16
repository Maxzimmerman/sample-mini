import { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useAnimalStore } from '../../stores/useAnimalStore';

export interface AnimalProps {
  
};


export function Animals({}: AnimalProps) {
  const animals = useAnimalStore((s) => s.animals);
  const getAll = useAnimalStore((s) => s.getAll);

  useEffect(() => {
    getAll()
  }, [getAll()])

 return <>
	{animals.map((animal) => (
	  <Card>
	    <CardContent>
	      <Typography>{animal.name} {animal.type}</Typography>
	    </CardContent>
	  </Card>
	))}
	</>
}

export default Animals;
