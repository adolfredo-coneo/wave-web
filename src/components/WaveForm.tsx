import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface Props {
  currentAccount: string | null;
  loading: boolean;
  connectHandler: () => void;
  waveHandler: (message: string) => void;
}

const WaveForm: React.FC<Props> = ({
  currentAccount,
  loading,
  connectHandler,
  waveHandler,
}) => {
  const [message, setMessage] = useState('');

  return (
    <Box
      component="form"
      display="grid"
      sx={{
        p: 3,
        backgroundColor: 'white',
      }}
      noValidate
      autoComplete="off"
      gap={2}
    >
      <Box gridColumn="span 8">
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '1.0rem',
              p: 2,
            },
          }}
          variant="outlined"
        />
      </Box>
      <Box gridColumn="span 8">
        <div>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={() => waveHandler(message)}
            className="waveButton"
            fullWidth
          >
            Rock at Me! 🤘
          </LoadingButton>
        </div>
      </Box>
      {!currentAccount && (
        <Box gridColumn="span 8">
          <button className="waveButton" onClick={connectHandler}>
            Connect your wallet to Rock at me!
          </button>
        </Box>
      )}
    </Box>
  );
};

export default WaveForm;
