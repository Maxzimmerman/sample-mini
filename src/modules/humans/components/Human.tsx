import { Card, CardContent, Typography } from '@mui/material';
import type { JSX } from 'react';
import type { Human } from '../types';

export interface HumanProps {
  humans: Human[];
}

export function Humans({ humans }: HumanProps): JSX.Element {
 return <>
	{humans.map((human) => (
	  <Card>
	    <CardContent>
	      <Typography>{human.name} {human.type}</Typography>
	    </CardContent>
	  </Card>
	))}
	</>
}

