import { Avatar, Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

export default function PostCreator() {
  return (
    <Card>
      <Box>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar>B</Avatar>
          <TextField label="What's happening?" sx={{ flexGrow: '1' }} />
        </CardContent>
      </Box>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button aria-label="Upload photo" sx={{ gap: 1 }}>
          <AddPhotoAlternateOutlinedIcon />
          <Typography>Photo</Typography>
        </Button>
        <Button variant="contained" aria-label="Create post" sx={{ gap: 1 }}>
          <Typography>Post</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
