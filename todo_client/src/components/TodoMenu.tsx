import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, Edit } from '@mui/icons-material';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useTodoContext } from '../context/TodoContext';
import { Todo } from '../types/todo';

interface TodoMenuProps {
  todo: Todo | null;
}

const TodoMenu: React.FC<TodoMenuProps> = ({ todo }) => {
  const { handleDelete: onDelete, setTodo } = useTodoContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
    handleClose();
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleConfirmDelete = () => {
    setTodo(null);
    if (todo && todo.id) {
      setTodo(null);
      onDelete(todo.id);
    }
    setDeleteModalOpen(false);
  };

  const handleEditClick = () => {
    if (todo) {
      setTodo(todo);
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDeleteClick}>
          <Stack
            direction="row"
            spacing={1}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Delete fontSize="small" />
            <span>Delete</span>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleEditClick}>
          <Stack
            direction="row"
            spacing={1}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Edit fontSize="small" />
            <span>Edit</span>
          </Stack>
        </MenuItem>
      </Menu>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default TodoMenu;
