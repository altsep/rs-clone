import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from '../../hooks/redux';
import { openLeftSideBar } from '../../store/reducers/leftSideBarState';

export default function HeaderBurger() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openLeftSideBar());
  };

  return (
    <Box sx={{ display: { xs: 'flex', sm: 'none' }, flex: '1 1 30%' }}>
      <IconButton size="large" onClick={handleClick}>
        <MenuIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}
