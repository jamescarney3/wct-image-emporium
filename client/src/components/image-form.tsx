import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

import { TagBadge } from '~/components';


interface IImageForm {
  image?: any,
  tags: any[],
  onSubmit: (e) => void,
  loading?: boolean,
}

const processTagLabel = (label: string): string => {
  return label.replace(/[^a-zA-Z0-9]/ig, '').toLowerCase();
};

const ImageForm: React.FC<IImageForm> = ({ image, tags, onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [previewName, setPreviewName] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [tagsInputValue, setTagsInputValue] = useState('');

  const [tagIds, setTagIds] = useState([]);
  const [newTags, setNewTags] = useState([]);

  useEffect(() => {
    if (image) {
      setTitle(image.title);
      setPreviewUrl(image.url);
      setTagIds(image.tags.map((tag) => tag.id));
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(new FormData(e.target));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.onerror = () => {
        setPreviewUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const onAddTag = (tag, { action }) => {
    if (action === 'create-option') {
      setNewTags([...newTags, tag.label]);
    } else {
      setTagIds([...tagIds, tag.id]);
    }
    setTagsInputValue('');
  };

  const onRemoveTagId = (id) => () => {
      setTagIds(tagIds.filter((existingId) => existingId !== id));
      setTagsInputValue('');
    };

  const onRemoveNewTag = (label) => () => {
    setNewTags(newTags.filter((existingLabel) => existingLabel !== label));
    setTagsInputValue('');
  };

  const tagOptions = tags.filter((tag) => (
    !tagIds.find((id) => id === tag.id)
  ));

  const imageInput = (!image &&
    <div className="form-group">
      <div className="custom-file">
        <label htmlFor="image[asset]" className="custom-file-label">
          {previewName || 'upload image from device'}
        </label>
        <input
          type="file"
          className="custom-file-input"
          name="image[asset]"
          onChange={onFileChange}
          accept="image/*"
          disabled={loading}
        />
      </div>
    </div>
  );

  const imagePreview = (previewUrl &&
    <div className="form-group">
      <img className="media-object w-100" src={previewUrl} />
    </div>
  );

  const tagIdInputs = tagIds.map((id) => (
    <input
      className="d-none"
      type="text"
      name="tag_ids[]"
      value={id}
      key={`tag-id-${id}-input`}
      readOnly
    />
  ));

  const newTagInputs = newTags.map((label) => (
    <input
      className="d-none"
      type="text"
      name="new_tags[]"
      value={label}
      key={`tag-label-${processTagLabel(label)}-input`}
      readOnly
    />
  ));

  const tagIdBadges = tagIds.map((id) => {
    const { label } = tags.find((tag) => tag.id === id);
    return (
      <TagBadge label={label} onDismiss={onRemoveTagId(id)} key={`tag-id-badge-${id}`} />
    );
  });

  const newTagBadges = newTags.map((label) => (
    <TagBadge label={label} onDismiss={onRemoveNewTag(label)} key={`new-tag-badge-${processTagLabel(label)}`} />
  ));

  const tagBadges = (!!(tagIds.length || newTags.length) &&
    <div className="form-group">{tagIdBadges}{newTagBadges}</div>
  );

  return (
    <div className="image-form">
      <form onSubmit={submitForm} id="image-upload">
        <div className="form-group">
          <label htmlFor="image[title]">image title</label>
          <input
            type="text"
            className="form-control"
            name="image[title]"
            onChange={(e) => { setTitle(e.target.value); }}
            placeholder="image title"
            required
            value={title}
            disabled={loading}
          />
        </div>
        {imageInput}
        {imagePreview}
        {tagIdInputs}
        {newTagInputs}
        <label htmlFor="tags">tags</label>
        <div className="form-row form-group">
          <div className="col">
            <CreatableSelect
              options={tagOptions}
              onChange={onAddTag}
              value={tagsInputValue}
            />
          </div>
        </div>
        {tagBadges}
        <button disabled type="submit" className="d-none" aria-hidden="true"></button>
        <button disabled={loading} type="submit" form="image-upload" className="btn btn-primary">submit</button>
      </form>
    </div>
  );
};

export default ImageForm;
