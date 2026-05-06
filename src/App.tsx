import { Box, Container, Stack, Typography } from '@mui/material';

export function App() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            sample-mini
          </Typography>
          <Typography variant="h3" component="h1">
            Books
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A guided rebuild of sample-web's frontend conventions.
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3,
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h6" gutterBottom>
            You're at Stage 0.
          </Typography>
          <Typography variant="body2">
            Open <code>stages/01-typescript-basics/LESSON.md</code> and run
            <code> npm run test:unit:watch</code> to begin.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
