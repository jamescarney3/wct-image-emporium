import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SearchParamsContext from '~/context/search-params';
import { useStore, useAccessors } from '~/context/store';
import { ImagePage, TagFilter } from '~/components';


const ImagesHome = () => {
  const [images, imagesActionCreators] = useStore('images');
  const { index, clear } = imagesActionCreators;
  const [allTags, allTagsActionCreators] = useStore('allTags');
  const { index: tagsIndex } = allTagsActionCreators;
  const { serverParams, dataParams, setParam, unsetParam } = useContext(SearchParamsContext);

  const {
    imagesCollection, tagsCollection, tagsCollectionByValue,
  } = useAccessors();

  const { search } = useLocation();

  useEffect(() => {
    clear();
    return clear;
  }, []);

  useEffect(() => {
    if (!search) {
      index();
    } else if (serverParams && !images.loading && !images.data.length) {
      index(serverParams);
    }
  }, [search, serverParams]);

  const handleAddTag = (tag) => {
    const paramTags = dataParams['f[tags]'] || [];
    setParam('f[tags]', [...paramTags, tag.value]);
  };

  const handleRemoveTag = (tag) => {
    const paramTags = dataParams['f[tags]'];
    if (paramTags.length === 1) {
      unsetParam('f[tags]');
    } else {
      setParam('f[tags]', paramTags.filter((paramTag) => paramTag !== tag.value));
    }
  };

  const renderContent = () => {
    if (images.loading || allTags.loading) { return (<div>loading...</div>); }
    if (images.error || allTags.error) { return (<div>error loading page data!</div>); }
    return (
      <div>
        <div className="row">
          <ImagePage images={imagesCollection(images.data)} />
        </div>
        <h3>filter by tag:</h3>
        <TagFilter
          tags={tagsCollection(allTags.data)}
          paramTags={tagsCollectionByValue(dataParams['f[tags]'])}
          onAdd={handleAddTag}
          onRemove={handleRemoveTag}
        />
      </div>
    );
  };

  return (
    <div className="my-3">
      <div className="clearfix">
        <h2 className="float-left">artifacts:</h2>
      </div>
      {renderContent()}
    </div>
  );
};

export default ImagesHome;
