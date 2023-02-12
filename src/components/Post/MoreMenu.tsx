import { Menu, MenuItem } from '@mui/material';
import { VariantsMoreMenu } from '../../constants';

interface IMoreMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleCloseMoreMenu: () => void;
  handleClickDeletePost: () => void;
  handleClickEditPost: () => void;
  type: VariantsMoreMenu;
}

export default function MoreMenu({
  anchorEl,
  open,
  handleCloseMoreMenu,
  handleClickDeletePost,
  handleClickEditPost,
  type,
}: IMoreMenuProps) {
  return (
    <Menu
      id="post-menu"
      anchorEl={anchorEl}
      open={open}
      MenuListProps={{
        'aria-labelledby': 'resources-button',
      }}
      onClose={handleCloseMoreMenu}
    >
      <MenuItem aria-label="post-delete" onClick={handleClickDeletePost}>
        Delete post
      </MenuItem>
      {type === VariantsMoreMenu.default && (
        <MenuItem aria-label="post-edit" onClick={handleClickEditPost}>
          Edit
        </MenuItem>
      )}
    </Menu>
  );
}
