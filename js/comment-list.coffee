###*
* コメントリスト
*
* - クラス定義のみ(インスタンス化はmain.coffeeで行われる)
###

### モデル(コメント1件1件) ###
class CommentItem extends Backbone.Model
  # デフォルトモデルプロパティ
  defaults:
    user: null
    tags: null
    timestamp: null
    comment: null

### コレクション(コメント一覧) ###
class CommentList extends Backbone.Collection
  model: CommentItem
  url: 'http://b.hatena.ne.jp/entry/jsonlite/'
  parse: (data) =>
    return unless data?
    @eid = data.eid
    @entryTitle = data.title
    @entryUrl = data.entry_url
    # コメントがあるブックマークのみ取得
    (bm for bm in (data.bookmarks ? []) when bm.comment.length > 0).reverse()

### ビュー ###
class CommentView extends BaseView
  el: '#comment-list'

  ### 初期処理 ###
  initialize: (options) =>
    super options
    @tmpl = _.template $('#view-comment').html()

    # コレクション作成(エントリー追加時にrender()が実行されるようイベント設定)
    @collection = new CommentList()
    @collection.bind 'add', @render

  ### コメント一覧表示 ###
  show: (model, callback) =>
    @clear()

    # インジケーター表示
    @$loading.activity color: '#000'

    @collection.past = model.get 'past'
    @collection.fetch
      data:
        url: model.get('link')
      dataType: 'jsonp'
    .done (data) =>
      if not data?
        @showError message: 'はてなブックマークAPIエラー'
      else if @collection.length is 0
        @showError message: 'コメントが1件も登録されていません'
      else
        # 新着コメントの部分までスクロール
        pastItem = Math.min @collection.length - 1, @collection.past
        itemPos = @$listContent.find('.list-item').eq(pastItem).offset().top - @$listContent.offset().top
        @$listContent.scrollTop itemPos

        # 取得した件数をwatchViewに返す
        callback @collection.length if callback?

      # ヘッダーにエントリー名とエントリーURLをセット
      @$el.find('.list-control .entry').attr('href', @collection.entryUrl).text @collection.entryTitle

      # インジケーターを消す
      @$loading.activity false

  ### エラー表示 ###
  showError: (error) => @$listContent.html _.template($('#view-error').html(), error)

  ### ビューに1件書き出し ###
  render: (model) =>
    timestamp = model.get 'timestamp'
    # コメント内のURLをリンク化
    model.set 'comment', model.get('comment').replace /(http[s]?\:\/\/[\w\+\$\;\?\.\%\,\!\#\~\*\/\:\@\&\\\=\_\-]+)/ig, '<a href="$1" target="_blank">$1</a>'
    param =
      eid: @collection.eid
      userIndex: model.get('user').substr 0, 2
      relTimestamp: _.niceDate timestamp
      model: model.attributes
      date: timestamp.split(/\s/)[0].replace /\D/g, ''
      itemClass: if @$listContent.find('.list-item').length >= @collection.past then 'new' else ''

    newItem = $($.parseHTML @tmpl(param)).appendTo @$listContent
    newItem.data 'cid', model.cid
    @

### クラス定義をグローバル化 ###
@CommentItem = CommentItem
@CommentList = CommentList
@CommentView = CommentView
