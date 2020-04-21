import React from 'react';
import Select from 'react-select';

import { TagBadge } from '~/components';


interface ITagFilter {
  tags: Array<{ id: number, value: string, label: string }>,
  paramTags?: Array<{ id: number, value: string, label: string }>,
  onAdd: (value) => void,
  onRemove: (value) => void,
}

const TagFilter = ({ tags, paramTags, onAdd, onRemove }) => {
  const tagOptions = tags.filter((tag) => (
    !paramTags.find((paramTag) => paramTag.id === tag.id)
  ));

  const renderParamTagBadge = (tag, idx) => {
    const tagBadgeProps = {
      key: `tag-filter-param-tag-badge-${tag.value}`,
      label: tag.label,
      onDismiss: () => onRemove(tag),
    };
    return (<TagBadge {...tagBadgeProps}/>);
  };

  return (
    <div>
      <Select
        className="my-2"
        options={tagOptions}
        onChange={onAdd}
      />
      {paramTags.map(renderParamTagBadge)}
    </div>
  );
};

export default TagFilter;
