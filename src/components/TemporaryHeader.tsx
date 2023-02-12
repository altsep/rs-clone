import { Button } from '@mui/material';
import { useAppDispatch } from '../hooks/redux';
import { openLeftSideBar } from '../store/reducers/leftSideBarState';

export default function TemporaryHeader() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openLeftSideBar());
  };

  return (
    <Button type="button" onClick={handleClick} sx={{ display: { xs: 'block', sm: 'none' } }}>
      open menu
    </Button>
  );
}
