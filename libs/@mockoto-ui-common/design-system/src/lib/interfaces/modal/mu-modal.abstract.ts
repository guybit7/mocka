export interface MuModalPropsAbstract {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  minWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  overlayColor?: string;
}
