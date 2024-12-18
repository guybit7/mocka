import { Box, Modal } from '@mui/material';
import { MuModalPropsAbstract } from '../../interfaces/modal/mu-modal.abstract';
import './mu-modal.scss';

export const MuModal: React.FC<MuModalPropsAbstract> = ({
  open = false,
  onClose,
  header = null,
  children = null,
  footer = null,
  maxWidth,
  minWidth,
  minHeight,
}) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box className="modal-container" sx={{ bgcolor: 'background.paper', maxWidth, minWidth, minHeight }}>
        {header && <Box className="modal-header">{header}</Box>}
        <Box className="modal-body">{children}</Box>
        {footer && <Box className="modal-footer">{footer}</Box>}
      </Box>
    </Modal>
  );
};
