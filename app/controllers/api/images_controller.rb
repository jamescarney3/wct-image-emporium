class Api::ImagesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :require_logged_in, only: [:create, :update, :destroy]
  before_action :ensure_owner, only: [:update, :destroy]

  def index
    @images = Image.all
    if params[:f]
      @images = @images.with_tags(*params[:f][:tags].split.map(&:to_i)) if params[:f][:tags]
      if params[:f][:before] || params[:f][:after]
        after = params[:f][:after] ? Time.strptime(params[:f][:after], "%Y%m%d") : Time.new(0)
        before = params[:f][:before] ? Time.strptime(params[:f][:before], "%Y%m%d") : Time.now
        @images = @images.between(after: after, before: before)
      end
      @images = @images.for_user(params[:f][:user]) if params[:f][:user]
    end
    @images = @images.for_user(current_user.id) if params[:admin]
    @images = @images.limit(params[:limit]) if params[:limit]
    render :index, status: 200
  end

  def show
    @image = Image.find params[:id]
    render :show, status: 200
  end

  def create
    @image = Image.new image_params
    @image.admin = current_user

    if params[:tag_ids]
      params[:tag_ids].each do |id|
        @image.tags << Tag.find(id.to_i)
      end
    end

    if params[:new_tags]
      params[:new_tags].each do |label|
        @image.tags << Tag.new(label: label, value: label.gsub(/[^a-zA-Z0-9]/, '').downcase, admin: current_user)
      end
    end

    if @image.save
      render :show, status: 200
    else
      render json: { error: '422 unprocessable entity' }, status: 422
    end
  end

  def update
    @image = Image.find params[:id]

    tags = []
    if params[:tag_ids]
      params[:tag_ids].each do |id|
        tags << Tag.find(id.to_i)
      end
    end

    puts params[:tag_ids]

    if params[:new_tags]
      params[:new_tags].each do |label|
        tags << Tag.new(label: label, value: label.gsub(/[^a-zA-Z0-9]/, '').downcase, admin: current_user)
      end
    end

    if @image.update(tags: tags, title: image_params[:title])
      render :show, status: 200
    else
      render json: { error: '422 unprocessable entity' }, status: 422
    end
  end

  def destroy
    @image = Image.find params[:id]
    if @image.destroy
      render :show, status: 200
    else
      render json: { errors: '400 bad request' }, status: 400
    end
  end

  def random
    @image = Image.offset(rand(Image.count)).first
    if !@image.nil?
      render :show, status: 200
    else
      render json: { errors: '418 i\'m a teapot' }, status: 418
    end
  end

  def sample
    @images = Image.all
    if params[:f]
      @images = @images.with_tags(*params[:f][:tags].split.map(&:to_i)) if params[:f][:tags]
      if params[:f][:before] || params[:f][:after]
        after = params[:f][:after] ? Time.strptime(params[:f][:after], "%Y%m%d") : Time.new(0)
        before = params[:f][:before] ? Time.strptime(params[:f][:before], "%Y%m%d") : Time.now
        @images = @images.between(after: after, before: before)
      end
      @images = @images.for_user(params[:f][:user]) if params[:f][:user]
    end
    @images = @images.shuffle
    @images = @images.limit(params[:limit]) if params[:limit]

    if !@images.nil?
      render :index, status: 200
    else
      render json: { errors: '418 i\'m a teapot' }, status: 418
    end
  end

  private

    def image_params
      params.require(:image).permit(:title, :asset, :tag_ids, :new_tags)
    end

    def record_not_found
      render json: { errors: '404 image record not found' }, status: 404
    end

    def ensure_owner
      if Image.find(params[:id]).admin != current_user
        render json: { errors: '401 user not record owner' }, status: 401
      end
    end
end
