import { Menu, MenuItem } from '@mui/material';
import { VariantsMoreMenu } from '../constants';

interface IMoreMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleMoreMenuClose: () => void;
  handleDeletePostClick: () => void;
  handleEditPostClick: () => void;
  type: VariantsMoreMenu;
}

export default function MoreMenu({
  anchorEl,
  open,
  handleMoreMenuClose,
  handleDeletePostClick,
  handleEditPostClick,
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
      onClose={handleMoreMenuClose}
    >
      <MenuItem aria-label="post-delete" onClick={handleDeletePostClick}>
        Delete post
      </MenuItem>
      {type === VariantsMoreMenu.default && (
        <MenuItem aria-label="post-edit" onClick={handleEditPostClick}>
          Edit
        </MenuItem>
      )}
    </Menu>
  );
}
