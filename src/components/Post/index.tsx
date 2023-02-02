import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

export default function Post() {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>B</Avatar>}
        title="Saleh ahmed"
        subheader="Just Now"
        action={
          <IconButton aria-label="settings">
            <MoreHorizOutlinedIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body1">If you think adventure is dangerous, try routine</Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        image="https://www.rgo.ru/sites/default/files/node/32473/yuriy-ufimcev-fioletovyy-zakat-536530.jpg"
      />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button aria-label="Like" sx={{ gap: 1 }}>
          <FavoriteBorderOutlinedIcon />
          <Typography>Like</Typography>
        </Button>
        <Button aria-label="Comments" sx={{ gap: 1 }}>
          <CommentOutlinedIcon />
          <Typography>Comments</Typography>
        </Button>
        <Button aria-label="Share" sx={{ gap: 1 }}>
          <ReplyOutlinedIcon sx={{ transform: 'scaleX(-1)' }} />
          <Typography>Share</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
