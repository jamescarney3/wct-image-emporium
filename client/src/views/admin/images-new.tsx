import React, { useEffect, useState } from 'react';

import { ImageForm } from '~/components';
import { useStore, useAccessors } from '~/context/store';


const ImagesNew: React.SFC = () => {
  const [adminImages, adminImagesActionCreators] = useStore('adminImages');
  const [allTags, allTagsActionCreators] = useStore('allTags');

  const { create, clear } = adminImagesActionCreators;
  const { index } = allTagsActionCreators;
  const { tagsIndex } = useAccessors();

  const tags = tagsIndex();

  // clear image store on mount and fetch tags
  useEffect(() => {
    clear();
    index();
    return clear;
  }, []);

  const onSubmit = (e) => { create(e); };

  const successMessage = (adminImages.created &&
    <div className="form-group">
      <div className="alert alert-success" role="alert">
        image record for {adminImages.created.title} succesfully created
      </div>
    </div>
  );

  const errorMessage = (adminImages.error &&
    <div className="form-group">
      <div className="alert alert-danger" role="alert">
        there was an error submitting your image: {adminImages.error.message}
      </div>
    </div>
  );

  return (
    <div className="mt-3">
      <h2>UPLOAD IMAGE RECORD</h2>
      {successMessage}
      {errorMessage}
      <ImageForm
        tags={tags}
        loading={allTags.loading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ImagesNew;
