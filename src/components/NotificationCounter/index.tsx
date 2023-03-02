import { Box } from '@mui/material';

interface INotificationCounterProps {
  counter: number;
}

export default function NotificationCounter({ counter }: INotificationCounterProps) {
  return (
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
        flexShrink: 0,
      }}
    >
      {counter < 10 ? counter : '9+'}
    </Box>
  );
}
