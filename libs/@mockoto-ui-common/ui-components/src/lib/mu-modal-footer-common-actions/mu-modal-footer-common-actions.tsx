import { Button } from '@mui/material';
import './mu-modal-footer-common-actions.scss';

interface MuModalFooterCommonActionsProps {
  isValid?: boolean;
  showDelete?: boolean;
  onSave: () => void;
  onClose: () => void;
  onDelete: () => void;
}

export const MuModalFooterCommonActions: React.FC<MuModalFooterCommonActionsProps> = ({
  onSave,
  onClose,
  onDelete,
  isValid = true,
  showDelete = false,
}) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Button variant="contained" onClick={onSave} disabled={!isValid}>
        Save
      </Button>
      <Button variant="outlined" onClick={onClose}>
        Close
      </Button>
      {showDelete && (
        <Button variant="outlined" onClick={onDelete}>
          Delete
        </Button>
      )}
    </div>
  );
};

export default MuModalFooterCommonActions;
