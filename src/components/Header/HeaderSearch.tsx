import { Autocomplete, TextField, InputAdornment, Box, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { IUser } from '../../types/data';

export default function HeaderSearch() {
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.users);
  const [searchValue, setSearchValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchValue(value);
    if (value.length) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleSelect = (user: IUser | null): void => {
    if (user) {
      navigate(`/${user.alias ? user.alias : `id${user.id}`}`);
      setSearchValue('');
    }
  };

  const handleOpen = (): void => {
    if (searchValue.length) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleClose = (): void => {
    setOpen(false);
    setSearchValue('');
  };

  return (
    <Stack sx={{ flex: '1 1 40%' }}>
      <Autocomplete
        forcePopupIcon={false}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        onChange={(_, value) => handleSelect(value)}
        size="small"
        options={users}
        getOptionLabel={(option) => option.name || ''}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText="Users not found"
        renderOption={(params, option) => (
          <Box component="li" {...params} key={`${option.id}`}>
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            value={searchValue}
            onChange={handleChange}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
}
