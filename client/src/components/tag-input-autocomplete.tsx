import React from 'react';
import stringSimilarity from 'string-similarity';

const processTagLabel = (label: string): string => {
  return label.replace(/[^a-zA-Z0-9]/ig, '').toLowerCase();
};

const TagInputAutocomplete = ({ tags, value, selectedIds, onSelect }) => {

  const sortedTags = tags.filter((tag) => !selectedIds.includes(tag.id)).sort((a, b) => {
    const aSimilarity = stringSimilarity.compareTwoStrings(
      processTagLabel(a.label), processTagLabel(value),
    );
    const bSimilarity = stringSimilarity.compareTwoStrings(
      processTagLabel(b.label), processTagLabel(value),
    );

    return bSimilarity - aSimilarity;
  }).filter((tag) => stringSimilarity.compareTwoStrings(
    processTagLabel(tag.label), processTagLabel(value),
  ) > 0.2);

  const renderItem = (tag) => {
    return (
      <li
        className="tag-input-autocomplete__item list-group-item" key={`autocomplete-tag-${tag.id}`}
        onClick={() => onSelect(tag.id)}
      >
        {tag.label}
      </li>
    );
  };

  return (
    <ul className="tag-input-autocomplete list-group position-absolute">
      {sortedTags.slice(0, 10).map(renderItem)}
    </ul>
  );
};

export default TagInputAutocomplete;
