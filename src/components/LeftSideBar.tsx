import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { TSideBarButtonsInfo } from '../types/sideBar';
import { idAuthorizedUser } from '../mock-data/data';
import { RoutePath } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { closeLeftSideBar } from '../store/reducers/leftSideBarState';

export default function LeftSideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isOpen } = useAppSelector((state) => state.leftSideBar);
  const dispatch = useAppDispatch();

  const sideBarButtonsInfo: TSideBarButtonsInfo = [
    {
      text: 'Profile',
      icon: <AccountBoxOutlinedIcon />,
      to: `/${idAuthorizedUser}`,
      handleClick: (): void => {
        navigate(`/${idAuthorizedUser}`);
      },
    },
    {
      text: 'Messages',
      icon: <ChatOutlinedIcon />,
      to: `${RoutePath.messages}`,
      handleClick: (): void => {
        navigate(`${RoutePath.messages}`);
      },
    },
    {
      text: 'Friends',
      icon: <Diversity3OutlinedIcon />,
      to: `${RoutePath.friends}`,
      handleClick: (): void => {
        navigate(`${RoutePath.friends}`);
      },
    },
    {
      text: 'Settings',
      icon: <SettingsOutlinedIcon />,
      to: `${RoutePath.settings}`,
      handleClick: (): void => {
        navigate(`${RoutePath.settings}`);
      },
    },
    {
      text: 'Logout',
      icon: <LogoutOutlinedIcon />,
      to: '/',
      handleClick: (): void => {
        navigate('/');
      },
    },
  ];

  const handleClickCloseMenu = () => {
    dispatch(closeLeftSideBar());
  };

  const drawer = (
    <Box onClick={handleClickCloseMenu} sx={{ position: 'sticky', zIndex: 1 }}>
      <List>
        {sideBarButtonsInfo &&
          sideBarButtonsInfo.map((sideBarButtonInfo) => (
            <ListItem key={sideBarButtonInfo.text} disablePadding>
              <ListItemButton
                onClick={sideBarButtonInfo.handleClick}
                selected={sideBarButtonInfo.to === location.pathname}
              >
                <ListItemIcon>{sideBarButtonInfo.icon}</ListItemIcon>
                <ListItemText primary={sideBarButtonInfo.text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={handleClickCloseMenu}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <Box>{drawer}</Box>
      </Drawer>

      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {drawer}
      </Box>
    </>
  );
}
