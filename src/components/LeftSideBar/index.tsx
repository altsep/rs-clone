import { useNavigate, useLocation } from 'react-router-dom';
import { Badge, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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
import { getActionString, setLastMessages, removeToken } from '../../utils/common';
import Search from '../Search/Search';
import NotificationCounter from '../NotificationCounter';

export default function LeftSideBar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.leftSideBar);
  const { idAuthorizedUser, authorizedUser } = useAppSelector((state) => state.users);
  const { totalNumberOfUnreadMessages, numberOfUnreadMessagesInChats, lastMessagesInChats, chats } = useAppSelector(
    (state) => state.chats
  );
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
      setLastMessages({ chats, numberOfUnreadMessagesInChats, lastMessagesInChats, idAuthorizedUser });
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
      counter: null,
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
      counter: totalNumberOfUnreadMessages,
      to: `${RoutePath.messages}`,
      handleClick: (): void => {
        navigate(`${RoutePath.messages}`);
      },
    },
    {
      text: t('sideBar.friends'),
      icon: <Diversity3OutlinedIcon />,
      counter: null,
      to: `${RoutePath.friends}`,
      handleClick: (): void => {
        navigate(`${RoutePath.friends}`);
      },
    },
    {
      text: t('sideBar.settings'),
      icon: <SettingsOutlinedIcon />,
      counter: null,
      to: `${RoutePath.settings}`,
      handleClick: (): void => {
        navigate(`${RoutePath.settings}`);
      },
    },
    {
      text: t('sideBar.logout'),
      icon: <LogoutOutlinedIcon />,
      counter: null,
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
                selected={
                  sideBarButtonInfo.to === location.pathname ||
                  sideBarButtonInfo.to === `${location.pathname.split('/').slice(0, 2).join('/')}`
                }
                sx={{ borderRadius: 4 }}
              >
                <ListItemIcon>
                  {sideBarButtonInfo.counter ? (
                    <Badge badgeContent={<NotificationCounter counter={sideBarButtonInfo.counter} />}>
                      {sideBarButtonInfo.icon}
                    </Badge>
                  ) : (
                    sideBarButtonInfo.icon
                  )}
                </ListItemIcon>
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
