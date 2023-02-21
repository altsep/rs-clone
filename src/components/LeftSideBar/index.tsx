import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { TSideBarButtonsInfo } from '../../types/sideBar';
import { ApiPath, API_BASE_URL, KEY_LOCAL_STORAGE, LSKeys, RoutePath } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeLeftSideBar } from '../../store/reducers/leftSideBarState';
import { logoutUser } from '../../api/usersApi';
import { setAuth, setLoading } from '../../store/reducers/authSlice';
import { removeToken } from '../../utils/common';
import { TLastMessage } from '../../types/data';

export default function LeftSideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.leftSideBar);
  const { idAuthorizedUser, authorizedUser } = useAppSelector((state) => state.users);
  const { totalNumberOfUnreadMessages, numberOfUnreadMessagesInChats, lastMessagesInChats, chats } = useAppSelector(
    (state) => state.chats
  );

  const logout = async (): Promise<void> => {
    dispatch(setLoading(true));
    const res = await logoutUser(`${API_BASE_URL}${ApiPath.logout}`);
    if (res.ok) {
      const lastMessages = chats.reduce<TLastMessage[]>((acc, chat) => {
        if (numberOfUnreadMessagesInChats && lastMessagesInChats) {
          // CHANGE_NAME
          const data = numberOfUnreadMessagesInChats.find((val) => val.chatId === chat.id);
          if (data) {
            const dataLastMessage = lastMessagesInChats.find((lastMessage) => lastMessage.chatId === data.chatId);
            if (dataLastMessage) {
              acc.push(dataLastMessage);
              return acc;
            }
          }
        }
        if (chat.messages.length > 0) {
          acc.push({
            chatId: chat.id,
            userId: +chat.userIds.filter((userId) => userId !== idAuthorizedUser).join(),
            idLastMessage: chat.messages[chat.messages.length - 1].id,
          });
        }

        return acc;
      }, []);

      localStorage.setItem(
        `${LSKeys.lastMessages}_${idAuthorizedUser}_${KEY_LOCAL_STORAGE}`,
        JSON.stringify(lastMessages)
      );

      removeToken();
      dispatch(setAuth(false));
      dispatch(setLoading(false));
      navigate('/');
    }
  };

  const sideBarButtonsInfo: TSideBarButtonsInfo = [
    {
      text: 'Profile',
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
      text: 'Messages',
      icon: <ChatOutlinedIcon />,
      counter: totalNumberOfUnreadMessages,
      to: `${RoutePath.messages}`,
      handleClick: (): void => {
        navigate(`${RoutePath.messages}`);
      },
    },
    {
      text: 'Friends',
      icon: <Diversity3OutlinedIcon />,
      counter: null,
      to: `${RoutePath.friends}`,
      handleClick: (): void => {
        navigate(`${RoutePath.friends}`);
      },
    },
    {
      text: 'Settings',
      icon: <SettingsOutlinedIcon />,
      counter: null,
      to: `${RoutePath.settings}`,
      handleClick: (): void => {
        navigate(`${RoutePath.settings}`);
      },
    },
    {
      text: 'Logout',
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
                <ListItemIcon>{sideBarButtonInfo.icon}</ListItemIcon>
                <ListItemText primary={sideBarButtonInfo.text} />
                {sideBarButtonInfo.counter !== null && sideBarButtonInfo.counter !== 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      ml: 1,
                      width: 25,
                      height: 25,
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {sideBarButtonInfo.counter < 10 ? sideBarButtonInfo.counter : '9+'}
                  </Box>
                )}
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
