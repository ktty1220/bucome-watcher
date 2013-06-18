###*
* ウォッチリスト
*
* - クラス定義のみ(インスタンス化はmain.coffeeで行われる)
* - EntryItem, EntryListを継承しているのでentry-list.coffeeが先にロードされるようにする必要がある
###

### モデル(エントリー1件1件) ###
class WatchItem extends EntryItem
  url: 'http://b.hatena.ne.jp/entry/jsonlite/'
  initialize: (options) =>
    # 定期的に自動更新
    @timer = setInterval () =>
      @update()
    , 180 * 1000

  # fetch()でやりたいけど必要なのはブックマーク数とコメント数だけなので別処理
  update: () =>
    $.ajax
      url: @url
      data:
        url: @get 'link'
      dataType: 'jsonp'
    #.fail (data) =>
    .done (data) =>
      commentBookmarks = (bm for bm in (data.bookmarks ? []) when bm.comment.length > 0).length
      newCount = commentBookmarks - @get('past')
      @set { newComment: newCount, bookmarkcount: data.count }

  parse: (data) =>
    unless data?
      alert 'エントリー情報を取得できませんでした'
      return
    view: 'watch'
    title: data.title
    link: data.url
    description: '※URLを指定して追加したエントリーは本文を取得できません'
    subject: 'URL直接指定'
    date: '不明'
    bookmarkcount: data.count
    favicon: data.url.replace /^(\w+:\/\/[^\/]+)\/.*$/, '$1/favicon.ico'
    host: data.url.replace /^\w+:\/\/([^\/]+)\/.*$/, '$1'
    newComment: 0
    past: 0

### コレクション(エントリー一覧) ###
class WatchList extends EntryList
  model: WatchItem

### ビュー ###
class WatchView extends BaseView
  el: '#watch-list'
  saveKey: 'watchList'

  ### ビュー要素操作イベント ###
  events:
    'mouseenter .list-item': 'mouseIn'
    'mouseleave .list-item': 'mouseOut'
    'click .add-url': 'addUrl'
    'click .clear': 'clear'
    'click .remove': 'removeItem'
    'click .comment': 'showComment'

  ### 初期処理 ###
  initialize: (options) =>
    super options

    # コレクション作成(エントリー追加時にrender()が実行されるようイベント設定)
    @collection = new WatchList()
    @collection.bind 'add', @render
    @collection.bind 'change', @update

    @init = true
    @loadCollection()
    @init = false

  ### ローカルストレージからウォッチリスト復元 ###
  loadCollection: () =>
    return unless localStorage?
    saveInfo = localStorage.getItem @saveKey
    if saveInfo?
      savedWatchList = JSON.parse saveInfo
      @addWatch item for item in savedWatchList

  ### ローカルストレージにウォッチリスト保存 ###
  saveCollection: () =>
    return unless localStorage?
    return if @init
    saveInfo = []
    saveInfo.push attributes: model.attributes for model in @collection.models
    localStorage.setItem @saveKey, JSON.stringify(saveInfo)

  ### URLを指定して追加 ###
  addUrl: () =>
    url = _.trim(prompt('URLを入力してください。') ? '')
    if url.length > 0
      item = new WatchItem()
      item.fetch
        data:
          url: url
        dataType: 'jsonp'
      .done (data) =>
        @addWatch(item) if data?

  ### ウォッチリストに追加 ###
  addWatch: (model) =>
    item = new WatchItem()
    item.set prop, value for prop, value of model.attributes
    item.set 'view', 'watch'
    # 新着コメント数
    item.set 'newComment', 0 unless model.attributes.newComment?
    # 既読コメント数
    item.set 'past', 0 unless model.attributes.past?

    # addのタイミングでrender()イベントが発火される
    @collection.add item
    @saveCollection()

    # とりあえず新着コメント数取得
    item.update()

  ### 定期更新 ###
  update: (model) =>
    watchItem = @cid2elem model.cid
    newComment = model.get 'newComment'
    # ブックマーク数更新
    watchItem.find('.bookmarkcount .count').text model.get('bookmarkcount')
    # 新着コメント有り
    if newComment > 0
      watchItem.find('.new-comment').text newComment
      watchItem.find('.new-comment').show()
    @saveCollection()

  ### ビューに1件書き出し ###
  render: (model) =>
    newItem = $($.parseHTML @tmpl(model.attributes)).appendTo @$listContent
    newItem.data 'cid', model.cid
    newItem.find('h3 a').powerTip
      placement: 'e'
      smartPlacement: true
    @

  ### 全消去 ###
  clear: (e) =>
    @$el.find('.list-item').each (idx, elem) =>
      @removeItem target: elem
    localStorage.remoteItem @saveKey if localStorage?

  ### ウォッチ解除 ###
  removeItem: (e) =>
    watchItem = @getItem e
    cid = watchItem.data('cid')
    model = @collection.get cid
    # 自動更新を解除してコレクションから削除
    clearInterval model.timer
    @collection.remove cid
    watchItem.fadeOut 'fast', () =>
      # ホットエントリー側のエントリーを復活(あれば)
      entryView.showEntry watchItem.find('h3 a').attr 'href'
      watchItem.remove()
      @saveCollection()

  #### コメントを見る ###
  showComment: (e) =>
    model = @elem2model(e)
    commentView.show model, (count = 0) =>
      # 取得したコメント数を保持
      model.set { past: count }, silent: true
      # 選択したウォッチアイテムの色を変更
      @$el.find('.list-item').removeClass 'selected'
      entryItem = @getItem e
      entryItem.addClass 'selected'
      # 新着マークを消す
      entryItem.find('.new-comment').hide()
      @saveCollection()

### クラス定義をグローバル化 ###
@WatchItem = WatchItem
@WatchList = WatchList
@WatchView = WatchView
