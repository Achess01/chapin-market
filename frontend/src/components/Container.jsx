export const SmallContainer = ({ children, className }) => {
  return <div className={`container-sm ${className ? className : ''}`}>{children}</div>;
};
