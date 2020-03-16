module TagHelper
  def filter_tag_attrs(tag)
    tag.attributes.filter {  |k, v| ['id', 'label', 'value'].include? k }
  end
end
