import React from 'react';
import { Link } from 'react-router-dom';


interface ITagBadge {
  label: string,
  to?: string,
  onDismiss?: () => void,
}

const TagBadge: React.SFC<ITagBadge> = ({ label, to, onDismiss }) => {
  const tagBadgeClass = 'tag-badge badge badge-secondary p-2 mr-1';
  const dismissButton = (onDismiss &&
    <span onClick={onDismiss} role="button" className="tag-badge__dismiss" aria-label="Remove tag">
      &times;
    </span>
  );

  return (to ?
    <Link className={tagBadgeClass} to={to}>{label}</Link>
    :
    <span className={tagBadgeClass}>
      {label} {dismissButton}
    </span>
  );
};


export default TagBadge;
