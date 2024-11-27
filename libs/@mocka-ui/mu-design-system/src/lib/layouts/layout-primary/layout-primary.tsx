import './layout-primary.scss';

interface LayoutProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

export const LayoutPrimary: React.FC<LayoutProps> = ({ header, body, footer }) => {
  return (
    <div className="layout">
      {/* <div className="layout-header">{header}</div> */}
      <div className="layout-body">{body}</div>
      <div className="layout-footer">{footer}</div>
    </div>
  );
};

export default LayoutPrimary;
