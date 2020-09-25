import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import SearchParamsContext from '~/context/search-params';
import { useStore, useAccessors } from '~/context/store';
import { ImagePage, LoadingSpinner, TagFilter } from '~/components';

const Sample = () => {
  const [images, imagesActionCreators] = useStore('randomImages');
  const { sample, clear } = imagesActionCreators;
  const [allTags, allTagsActionCreators] = useStore('allTags');
  const { index: tagsIndex } = allTagsActionCreators;
  const {
    dataParams, serverParams, setParam, unsetParam,
  } = useContext(SearchParamsContext);

  const { imagesCollection, tagsCollection, tagsCollectionByValue } = useAccessors();

  const { search } = useLocation();

  useEffect(() => {
    clear();
    return clear;
  }, []);

  useEffect(() => {
    if (!search) {
      sample();
    } else if (serverParams && !images.loading && !images.data.length) {
      sample(serverParams);
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
    if (images.loading || allTags.loading) { return (<LoadingSpinner className="mx-auto my-5" />); }
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
        <h2 className="float-left">random artifacts:</h2>
        <button className="btn btn-primary btn-sm float-right" onClick={() => sample({ limit: 8 })}>
          refresh
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Sample;
