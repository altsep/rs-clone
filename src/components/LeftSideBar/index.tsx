import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useTranslation } from 'react-i18next';
import { TSideBarButtonsInfo } from '../../types/sideBar';
import { ApiPath, API_BASE_URL, KEY_LOCAL_STORAGE, LSKeys, RoutePath } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeLeftSideBar } from '../../store/reducers/leftSideBarState';
import { logoutUser } from '../../api/usersApi';
import { setAuth, setLoading } from '../../store/reducers/authSlice';
import { getActionString, removeToken } from '../../utils/common';
import Search from '../Search/Search';

export default function LeftSideBar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.leftSideBar);
  const { idAuthorizedUser, authorizedUser } = useAppSelector((state) => state.users);
  const { messagesWs } = useAppSelector((state) => state.users);

  const sendOfflineStatus = (): void => {
    const isOnline = false;
    const userStatusMsg = getActionString('userStatus', { userId: idAuthorizedUser, isOnline });
    messagesWs?.send(userStatusMsg);
  };

  const logout = async (): Promise<void> => {
    dispatch(setLoading(true));
    const res = await logoutUser(`${API_BASE_URL}${ApiPath.logout}`);
    if (res.ok) {
      sendOfflineStatus();
      removeToken();
      dispatch(setAuth(false));
      dispatch(setLoading(false));
      localStorage.removeItem(`${LSKeys.path}_${KEY_LOCAL_STORAGE}`);
      navigate('/');
    } else {
      dispatch(setLoading(false));
    }
  };
  const sideBarButtonsInfo: TSideBarButtonsInfo = [
    {
      text: t('sideBar.profile'),
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
      text: t('sideBar.messages'),
      icon: <ChatOutlinedIcon />,
      to: `${RoutePath.messages}`,
      handleClick: (): void => {
        navigate(`${RoutePath.messages}`);
      },
    },
    {
      text: t('sideBar.friends'),
      icon: <Diversity3OutlinedIcon />,
      to: `${RoutePath.friends}`,
      handleClick: (): void => {
        navigate(`${RoutePath.friends}`);
      },
    },
    {
      text: t('sideBar.settings'),
      icon: <SettingsOutlinedIcon />,
      to: `${RoutePath.settings}`,
      handleClick: (): void => {
        navigate(`${RoutePath.settings}`);
      },
    },
    {
      text: t('sideBar.logout'),
      icon: <LogoutOutlinedIcon />,
      to: '/',
      handleClick: () => {
        logout().catch((err: Error): Error => err);
      },
    },
  ];

  const handleClickCloseMenu = () => {
    if (isOpen) {
      dispatch(closeLeftSideBar());
    }
  };

  const drawer = (
    <Box onClick={handleClickCloseMenu}>
      <List>
        {sideBarButtonsInfo &&
          sideBarButtonsInfo.map((sideBarButtonInfo) => (
            <ListItem key={sideBarButtonInfo.text} disablePadding>
              <ListItemButton
                onClick={sideBarButtonInfo.handleClick}
                selected={sideBarButtonInfo.to === location.pathname}
                sx={{ borderRadius: 4 }}
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
        <Box>
          <Box sx={{ m: '16px' }}>
            <Search />
          </Box>
          <Box>{drawer}</Box>
        </Box>
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
