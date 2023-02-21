import {
  Button,
  Dialog,
  DialogTitle,
  Box,
  Typography,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import { useState } from 'react';

export default function DeleteAccount() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [error] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setInputValue(e.target.value);
  const handleOpen = (): void => setOpenDialog(true);
  const handleCancel = (): void => {
    setOpenDialog(false);
    setInputValue('');
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: '20px' }}>
        <Button
          variant="contained"
          sx={{
            mr: '10px',
            bgcolor: '#d50000',
            borderRadius: '8px',
            '&:hover': {
              bgcolor: '#b71c1c',
            },
          }}
          onClick={handleOpen}
        >
          Delete
        </Button>
        <Typography variant="body1">Delete account</Typography>
      </Box>
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle sx={{ color: 'primary.main' }}>Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: '10px' }}>
            Are you sure you want to delete your account? This action is irreversible.
          </DialogContentText>
          <DialogContentText
            variant="body2"
            sx={{ mb: '20px' }}
          >{`To confirm, enter the password and click the "delete" button.`}</DialogContentText>
          <TextField
            size="small"
            label="Enter password"
            value={inputValue}
            onChange={handleChange}
            helperText={error ? 'Error' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ borderRadius: '8px', color: 'text.secondary' }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ borderRadius: '8px' }} disabled={!inputValue}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
