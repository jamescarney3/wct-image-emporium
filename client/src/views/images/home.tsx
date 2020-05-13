import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SearchParamsContext from '~/context/search-params';
import { useStore, useAccessors } from '~/context/store';
import { ImagePage, Paginator, TagFilter } from '~/components';


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
    } else if (serverParams && !images.loading) {
      index(serverParams);
    }
  }, [serverParams]);

  const paginatorProps = {
    offset: parseInt(dataParams.offset, 10) || 0,
    limit: parseInt(dataParams.limit, 10) || 2,
    count: images.meta ? images.meta.count : 0,
  };

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

  const paginator = (images.meta && (images.meta.count > images.meta.limit) &&
    <Paginator {...paginatorProps} />
  );

  const renderContent = () => {
    if (images.loading || allTags.loading) { return (<div>loading...</div>); }
    if (images.error || allTags.error) { return (<div>error loading page data!</div>); }
    return (
      <div>
        <div className="row">
          <ImagePage images={imagesCollection(images.data)} />
        </div>
        {paginator}
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
