import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { TSideBarButtonsInfo } from '../../types/sideBar';
import { ApiPath, API_BASE_URL, RoutePath } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeLeftSideBar } from '../../store/reducers/leftSideBarState';
import { logoutUser } from '../../api/usersApi';
import { setAuth, setLoading } from '../../store/reducers/authSlice';

export default function LeftSideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.leftSideBar);
  const { idAuthorizedUser, authorizedUser } = useAppSelector((state) => state.users);

  const logout = async (): Promise<void> => {
    dispatch(setLoading(true));
    const res = await logoutUser(`${API_BASE_URL}${ApiPath.logout}`);
    if (res.ok) {
      localStorage.clear();
      dispatch(setAuth(false));
      dispatch(setLoading(false));
      navigate('/');
    }
  };

  const sideBarButtonsInfo: TSideBarButtonsInfo = [
    {
      text: 'Profile',
      icon: <AccountBoxOutlinedIcon />,
      to: `${
        authorizedUser?.alias && location.pathname !== `/id${idAuthorizedUser}`
          ? `/${authorizedUser.alias}`
          : `/id${idAuthorizedUser}`
      }`,
      handleClick: (): void => {
        if (authorizedUser?.alias && location.pathname !== `/id${idAuthorizedUser}`) {
          navigate(`/${authorizedUser.alias}`);
        } else {
          navigate(`/id${idAuthorizedUser}`);
        }
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
      handleClick: () => {
        logout().catch((err: Error): Error => err);
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
