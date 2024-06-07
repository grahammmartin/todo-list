import React from 'react';
import { Modal, Button, Typography } from '@mui/material';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-96 border-2 border-black shadow-xl">
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="delete-modal-description" className="mt-2">
            Do you really want to delete this todo?
          </Typography>
          <div className="mt-3 flex justify-end space-x-2">
            <Button variant="contained" color="error" onClick={onConfirm}>
              Confirm
            </Button>
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
