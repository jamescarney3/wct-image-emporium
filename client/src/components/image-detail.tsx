import React, { useState } from 'react';
import classNames from 'classnames';

import { TagBadge, LoadingSpinner } from '~/components';


interface IImageDetail {
  image: {
    title: string,
    url: string,
    tags: Array<{ label: string, id: string, value: string }>,
  }
}

const ImageDetail: React.FC<IImageDetail> = ({ image }) => {
  const [loaded, setLoaded]: [boolean, (v: any) => void] = useState(false);
  const [error, setError]: [boolean, (v: any) => void] = useState(false);

  const renderTag = (tag) => {
    return (
      <TagBadge
        key={`image-detail-tag-${tag.id}`}
        label={tag.label}
        to={`/images?f[tags]=${tag.value}`}
      />
    );
  };

  const imgClass: string = classNames([
    'w-100',
    !loaded && 'd-none',
  ]);
  const placeholderClass: string = classNames([
    'image-detail__placeholder',
    'w-100 bg-light',
    loaded ? 'd-none' : 'd-flex flex-column justify-content-around',
  ]);
  const errorMessageClass: string = classNames([
    'image-detail__error-message',
    'text-center',
    !error && 'd-none',
  ]);

  return (
    <div className="image-detail my-3">
      <img
        alt={image.title}
        className={imgClass}
        // onError={(e): void => setError(true)}
        // onLoad={(e): void => setLoaded(true)}
        src={image.url}
      />
      <div className={placeholderClass}>
        <div className={errorMessageClass}>☠️ image failed to load - this... is... bogus!</div>
        {!loaded && !error && <LoadingSpinner className="m-auto" />}
      </div>
      <h3 className="iamge-detail__title">{image.title}</h3>
      {image.tags.map(renderTag)}
    </div>
  );
};

export default ImageDetail;
