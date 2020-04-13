import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TagBadge, ImageForm } from '~/components';
import { useStore, useAccessors } from '~/context/store';


const ImagesEdit = () => {
  const { id } = useParams();
  const [images, imagesActionCreators] = useStore('images');
  const [allTags, tagsActionCreators] = useStore('allTags');
  const { imageDetail, tagsIndex } = useAccessors();
  const { show, clear, update } = imagesActionCreators;
  const { index } = tagsActionCreators;

  const image = imageDetail(id);
  const tags = tagsIndex();

  useEffect(() => {
    clear();
    index();
    show(id);
    return clear;
  }, []);

  const onSubmit = (e) => { update(id, e); };

  const editForm = (image &&
    <ImageForm
      image={image}
      tags={tags}
      onSubmit={onSubmit}
      loading={images.loading || allTags.loading}
    />
  );

  const successMessage = (images.updated &&
    <div className="form-group">
      <div className="alert alert-success" role="alert">
        image record for {images.updated.title} succesfully updated
      </div>
    </div>
  );

  const errorMessage = (images.error &&
      <div className="form-group">
        <div className="alert alert-danger" role="alert">
          there was an error submitting your image: {images.error.message}
        </div>
      </div>
    );


  return (
    <div className="mt-3">
      <h2>EDIT IMAGE RECORD</h2>
      {successMessage}
      {errorMessage}
      {editForm}
    </div>
  );
};

export default ImagesEdit;
