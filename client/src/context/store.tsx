import React, { createContext, useContext, useEffect, useState } from 'react';

import store, { actionCreators } from '~/store';


interface ITag {
  id: number,
  value: string,
  label: string,
}

const StoreContext = createContext({
  actionCreators,
  state: store.getState(),
});

const StoreProvider = ({ children }) => {
  // set store state to context state, provide updater to call when store updates
  const [state, setState] = useState(store.getState());

  useEffect(() => {
  //   store.subscribe returns an unsubscribe function which react will call
  //   when this is gonna unmount
    return store.subscribe(() => setState(store.getState()));
  }, []);

  return (
    // more granular contexts will need to process specific state keys but also
    // need reference to the store itself to bind action creators
    <StoreContext.Provider value={{ state, actionCreators }}>
      {children}
    </StoreContext.Provider>
  );
};


// hook that optionally takes a key string to look up a slice of the store
// state and specific bound action creators
//
// call as: [state, actionCreators] = useStore('user')
const useStore = (key?: string) => {
  const value = useContext(StoreContext);

  return [
    key ? value.state[key] : value.state,
    key ? value.actionCreators[key] : value.actionCreators,
  ];
};

const useAccessors = () => {
  const value = useContext(StoreContext);

  return {
    imagesCollection: (imageIds) => {
      return imageIds.map((id) => store.getState().records.images[id]).filter((el) => !!el);
    },
    imageDetail: (imageId) => {
      const image = store.getState().records.images[imageId];
      if (!image) { return null; }
      const tags = image ? image.tag_ids.map((tagId) => store.getState().records.tags[tagId]) : [];
      return { ...image, tags };
    },
    tagsIndex: () => {
      return Object.values(store.getState().records.tags);
    },
    tagDetail: (id) => {
      return store.getState().records.tags[id] || null;
    },
    tagsCollection: (tagIds) => {
      if (!tagIds) { return []; }
      return tagIds.map((id) => store.getState().records.tags[id]).filter((el) => !!el);
    },
    tagsCollectionByValue: (values) => {
      if (!values) { return []; }
      return values.map((value) => (
        Object.values(store.getState().records.tags).find((tag) => (
          (tag as ITag).value === value
        ))
      )).filter((el) => !!el);
    },
    convertQString: (urlSearchParams) => {
      const paramsHash = {};
      urlSearchParams.forEach((v, k) => {
        switch (k) {
          case 'f[tags]':
            const tags = store.getState().records.tags;
            const tagIds = v.split(' ').map((value) => (
              (Object.values(store.getState().records.tags).find(
                (tag: { value: string }) => tag.value === value,
              ) || {} as any).id
            )).filter((id) => !!id);
            paramsHash[k] = tagIds.join(' ');
            break;
          case 'f[user]':
          default:
            paramsHash[k] = v;
        }
      });
      return paramsHash;
    },
  };
};


// HOF to connect a component to the store via a consumer, optionally takes a
// key str like the hook above
//
// usage: export default connectStore(MyComponent);
const connectStore = (key?: string) => (TargetComponent) => {
  const renderTarget = (value, props) => {
    const injectedProps = {
      actionCreators: key ? value.actionCreators[key] : value.actionCreators,
      store: key ? value.state[key] : value.state,
    };
    return (<TargetComponent {...{ ...props, ...injectedProps }} />);
  };

  return (props) => (
    <StoreContext.Consumer>
      {(value) => renderTarget(value, props)}
    </StoreContext.Consumer>
  );
};


const StoreConsumer = StoreContext.Consumer;

export { StoreConsumer, StoreProvider, useStore, useAccessors, connectStore };
export default StoreContext;
