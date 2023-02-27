import { Visibility, VisibilityOff } from '@mui/icons-material';
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
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../../api/usersApi';
import { ApiPath, API_BASE_URL } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setAuth } from '../../../../store/reducers/authSlice';

export default function DeleteAccount() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { idAuthorizedUser } = useAppSelector((state) => state.users);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setInputValue(e.target.value);
  const handleOpen = (): void => setOpenDialog(true);
  const handleCancel = (): void => {
    setOpenDialog(false);
    setInputValue('');
    setError(false);
    setPasswordVisible(false);
  };

  const onSubmit = async (): Promise<void> => {
    const res = await deleteUser(idAuthorizedUser, `${API_BASE_URL}${ApiPath.users}/${idAuthorizedUser}`, {
      password: inputValue,
    });
    if (!res.ok) {
      setError(true);
    } else {
      dispatch(setAuth(false));
      localStorage.clear();
      navigate('/');
    }
  };

  const changePasswordVisibility = (): void => setPasswordVisible((prev) => !prev);

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
          {t('delete.deleteBtn')}
        </Button>
        <Typography variant="body1">{t('delete.title')}</Typography>
      </Box>
      <Dialog open={openDialog}>
        <DialogTitle sx={{ color: 'primary.main' }}>{t('delete.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: '10px' }}>{t('delete.content1')}</DialogContentText>
          <DialogContentText variant="body2" sx={{ mb: '20px' }}>
            {t('delete.content2')}
          </DialogContentText>
          <Box component="form" onSubmit={onSubmit}>
            <input hidden type="text" name="username" autoComplete="username" />
            <TextField
              autoComplete="new-password"
              type={passwordVisible ? 'text' : 'password'}
              size="small"
              label={t('delete.placeholder')}
              name="password"
              value={inputValue}
              onChange={handleChange}
              helperText={error ? t('delete.error') : ''}
              error={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={changePasswordVisibility} edge="end" size="small">
                      {passwordVisible ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{ borderRadius: '8px', color: 'text.secondary' }} onClick={handleCancel}>
            {t('delete.cancelBtn')}
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: '8px' }}
            disabled={!inputValue}
            type="submit"
            onClick={onSubmit}
          >
            {t('delete.deleteBtn')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
