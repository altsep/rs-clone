import { Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
        {t('profile.post.delete')}
      </MenuItem>
      {type === VariantsMoreMenu.default && (
        <MenuItem aria-label="post-edit" onClick={handleClickEditPost}>
          {t('profile.post.edit')}
        </MenuItem>
      )}
    </Menu>
  );
}
