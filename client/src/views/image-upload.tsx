import React, { useEffect, useState } from 'react';

import { TagBadge, TagInputAutocomplete } from '~/components';
import { useStore } from '~/context/store';



const processTagLabel = (label: string): string => {
  return label.replace(/[^a-zA-Z0-9]/ig, '').toLowerCase();
};

const ImageUploadForm: React.SFC = () => {

  const [adminImages, adminImagesActionCreators] = useStore('adminImages');
  const [allTags, allTagsActionCreators] = useStore('allTags');
  const [records] = useStore('records');

  const { create, clean } = adminImagesActionCreators;
  const { index } = allTagsActionCreators;

  const [title, setTitle] = useState('');
  const [previewName, setPreviewName] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [tagsInputValue, setTagsInputValue] = useState('');

  const [tagIds, setTagIds] = useState([]);
  const [newTags, setNewTags] = useState([]);

  // clear image store on mount and fetch tags
  useEffect(() => {
    clean();
    index();
  }, []);

  const onTagsFormSubmit = (e) => {
    e.preventDefault();

    interface ITag {
      id: string, label: string, value: string
    }

    const tagValue = processTagLabel(tagsInputValue);
    const match: ITag = Object.values(records.tags as ITag[]).find((tag) => tag.value === tagValue);

    if (match && !tagIds.includes(match.id)) {
      setTagIds([...tagIds, match.id]);
      setTagsInputValue('');
    } else if (!match && tagValue && !newTags.map(processTagLabel).includes(tagValue)) {
      setNewTags([...newTags, tagsInputValue]);
      setTagsInputValue('');
    }
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

  const onSubmit = (e) => {
    e.preventDefault();
    create(new FormData(e.target));
  };

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

  const onAutocompleteSelect = (id) => {
    setTagIds([...tagIds, id]);
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

  const tagIdBadges = tagIds.map((id) => (
    <TagBadge label={records.tags[id].label} onDismiss={onRemoveTagId(id)} key={`tag-id-badge-${id}`} />
  ));

  const newTagBadges = newTags.map((label) => (
    <TagBadge label={label} onDismiss={onRemoveNewTag(label)} key={`new-tag-badge-${processTagLabel(label)}`} />
  ));

  const tagBadges = (!!(tagIds.length || newTags.length) &&
    <div className="mt-4">{tagIdBadges}{newTagBadges}</div>
  );

  const successMessage = (adminImages.created &&
    <div className="form-group">
      <div className="alert alert-success" role="alert">
        image record for {adminImages.created.title} succesfully created
      </div>
    </div>
  );

  const loadingMessage = (adminImages.loading &&
    <div className="form-group">
      <div className="alert alert-info" role="alert">
        processing upload
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

  const imagePreview = (previewUrl &&
    <div className="form-group">
      <img className="media-object w-100" src={previewUrl} />
    </div>
  );

  return (
    <div>
      <form className="mt-5" onSubmit={onSubmit} id="image-upload">
        {successMessage}
        {errorMessage}
        {loadingMessage}
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
          />
        </div>
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
            />
          </div>
        </div>
        {imagePreview}
        {tagIdInputs}
        {newTagInputs}
      </form>
      <form className="mt-5" onSubmit={onTagsFormSubmit}>
        <label htmlFor="tags">tags</label>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="tags"
              onChange={(e) => { setTagsInputValue(e.target.value); }}
              value={tagsInputValue}
            />
            <TagInputAutocomplete
              tags={Object.values(records.tags)}
              value={tagsInputValue}
              onSelect={onAutocompleteSelect}
              selectedIds={tagIds}
            />
          </div>
          <button className="btn btn-primary" type="submit">add tag</button>
        </div>
        {tagBadges}
      </form>
      <button type="submit" form="image-upload" className="btn btn-primary mt-5">submit</button>
    </div>
  );
};

export default ImageUploadForm;
