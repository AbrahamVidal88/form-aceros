import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Form.css';

export default function TextFieldHiddenLabel() {
  return (
    <div className="form-container">
    <Stack
      component="form"
      sx={{ width: '25ch' }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue="Small"
        variant="filled"
        size="small"
      />
      <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
        defaultValue="Normal"
        variant="filled"
      />
    </Stack>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="fullWidth" id="fullWidth" />
    </Box>
    </div>
  );
}