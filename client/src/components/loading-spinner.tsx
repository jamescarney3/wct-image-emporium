import React from 'react';
import classNames from 'classnames';


interface ILoadingSpinner {
  className?: string, // gotta declare this here or else TS says it's not an intrinsic prop
}

const LoadingSpinner: React.FC<ILoadingSpinner> = ({ className }) => {

  const spinnerClass = classNames('loading-spinner', 'position-relative', className);
  const quadrantClass = 'loading-spinner__quadrant';
  return (
    <div className={spinnerClass}>
      <div className="loading-spinner__quadrant" />
      <div className="loading-spinner__quadrant" />
      <div className="loading-spinner__quadrant" />
      <div className="loading-spinner__quadrant" />
    </div>
  );
};

export default LoadingSpinner;
