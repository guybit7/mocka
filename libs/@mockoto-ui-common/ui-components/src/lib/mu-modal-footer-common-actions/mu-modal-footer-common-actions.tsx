import { Button } from '@mui/material';
import './mu-modal-footer-common-actions.scss';

interface MuModalFooterCommonActionsProps {
  onSave: () => void;
  onClose: () => void;
  isValid?: boolean;
}

export const MuModalFooterCommonActions: React.FC<MuModalFooterCommonActionsProps> = ({
  onSave,
  onClose,
  isValid = true,
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
    </div>
  );
};

export default MuModalFooterCommonActions;
