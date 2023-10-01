import { Spinner } from "./Spinner";

export const SmallContainer = ({ children, className, loading = false }) => {
  return (
    loading ? <Spinner /> :
      (
        <div className={`container-sm ${className ? className : ''}`}>
          {children}
        </div>
      )

  )
};
