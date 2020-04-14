import React from 'react';

import { TagBadge } from '~/components';


interface IImageDetail {
  image: {
    title: string,
    url: string,
    tags: Array<{ label: string, id: string, value: string }>,
  }
}

const ImageDetail: React.FC<IImageDetail> = ({ image }) => {
  const renderTag = (tag) => {
    return (
      <TagBadge
        key={`image-detail-tag-${tag.id}`}
        label={tag.label}
        to={`/tags/${tag.id}`}
      />
    );
  };

  return (
    <div className="image-detail my-3">
      <img className="w-100" src={image.url} alt={image.title} />
      <h3 className="iamge-detail__title">{image.title}</h3>
      {image.tags.map(renderTag)}
    </div>
  );
};

export default ImageDetail;
