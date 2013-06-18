###*
* はてなブックマークホットエントリーリスト
*
* - クラス定義のみ(インスタンス化はmain.coffeeで行われる)
###

### モデル(エントリー1件1件) ###
class EntryItem extends Backbone.Model
  # デフォルトモデルプロパティ
  defaults:
    view: 'entry'
    title: null
    link: null
    description: null
    date: null
    subject: null
    bookmarkcount: 0
    category: null
    favicon: null
    host: null

### コレクション(エントリー一覧) ###
class EntryList extends Backbone.Collection
  model: EntryItem

### ビュー ###
class EntryView extends BaseView
  el: '#entry-list'

  ### ビュー要素操作イベント ###
  events:
    'mouseenter .list-item': 'mouseIn'
    'mouseleave .list-item': 'mouseOut'
    'click .list-control a': 'changeCategory'
    'click .error .retry': 'retry'
    'click h3 a': 'openEntry'
    'click .add-watch': 'addWatch'

  ### 初期処理 ###
  initialize: (options) =>
    super options

    # カテゴリ名 => クラス名変換テーブル
    @categoryList =
      '世の中': 'social'
      '政治と経済': 'economics'
      '暮らし': 'life'
      '学び': 'knowledge'
      'テクノロジー': 'it'
      'エンタメ': 'entertainment'
      'アニメとゲーム': 'game'
      'おもしろ': 'fun'
      'カテゴリー不明': 'unknown'

    # コレクション作成(エントリー追加時にrender()が実行されるようイベント設定)
    @collection = new EntryList()
    @collection.bind 'add', @render

    @noCache = false

    # 定期的に自動更新
    setInterval () =>
      @update()
    , 600 * 1000
    @update()

  ### ビューを更新 ###
  update: (category = location.hash) =>
    # カテゴリの選択状態を変更(URLハッシュ = 取得カテゴリ)
    category = if category then category.substr(1) else 'all'
    @$el.find('.list-control a').removeClass 'current'
    @$el.find(".list-control a[href=##{category}]").addClass 'current'

    # 初期化
    @clear()

    # インジケーター表示
    @$loading.activity color: '#000'

    # Google Feed APIは結構古いキャッシュが返される事があるのでURLパラメータに日時情報を付加して無理矢理更新
    # (とはいえ全くキャッシュしないのもアレなので5分間はキャッシュさせる)
    d = new Date()
    dq = _.sprintf('%04d%02d%02d%02d%02d',
      d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), Math.floor(d.getMinutes() / 5))
    # ただし強制キャッシュ無効の場合は乱数を後ろに付けてキャッシュさせないようにする
    dq += Math.floor(Math.random() * 100) if @noCache

    feedUrl = 'http://b.hatena.ne.jp/hotentry'
    feedUrl += if category is 'all' then "?#{dq}&mode=rss" else "/#{category}.rss?#{dq}"

    # Google Feed APIではてなブックマークの各種RSSを取得
    # (collectionのfetch()でやった方が良いんだろうけどfetch()でFeed APIを使って返すやり方がよく分からんので保留)
    feed = new google.feeds.Feed feedUrl
    feed.setNumEntries 50
    feed.setResultFormat google.feeds.Feed.XML_FORMAT
    feed.load (result) =>
      @noCache = false
      if result.error
        @showError result.error
      else
        # 取得したXMLからモデル作成
        feedItems = $(result.xmlDocument).find 'item'
        dcPrefix = 'dc\\:'
        hatenaPrefix = 'hatena\\:'
        for fi, i in feedItems
          $fi = $(fi)
          if i is 0
            check = $fi.find("#{hatenaPrefix}bookmarkcount").text()
            if (check ? '').length is 0
              # chromeは'dc:'とか'hatena:'とか付けると取得できない
              dcPrefix = ''
              hatenaPrefix = ''
          entryUrl = $fi.find('link').text()
          entrySubject = $fi.find("#{dcPrefix}subject").text()
          entrySubject = 'カテゴリー不明' if (entrySubject ? '').length is 0
          item = new EntryItem
            title: $fi.find('title').text()
            link: entryUrl
            description: $fi.find('description').text()
            date: _.niceDate $fi.find("#{dcPrefix}date").text()
            subject: entrySubject
            bookmarkcount: $fi.find("#{hatenaPrefix}bookmarkcount").text()
            category: @categoryList[entrySubject]
            favicon: entryUrl.replace /^(\w+:\/\/[^\/]+)\/.*$/, '$1/favicon.ico'
            host: entryUrl.replace /^\w+:\/\/([^\/]+)\/.*$/, '$1'

          # addのタイミングでrender()イベントが発火される
          @collection.add item

      # 全モデルをコレクションに追加したらインジケーターを消す
      @$loading.activity false

  ### ビューに1件書き出し ###
  render: (model) =>
    newItem = $($.parseHTML @tmpl(model.attributes))
    newItem.data 'cid', model.cid
    # ウォッチリストに登録してあるエントリーは表示しない
    newItem.hide() if watchView.link2elem(model.get('link')).length > 0
    newItem.appendTo @$listContent
    newItem.find('h3 a').powerTip
      placement: 'e'
      smartPlacement: true
    @

  ### エラー表示 ###
  showError: (error) =>
    @$listContent.html _.template($('#view-error').html(), error)
    # エラーになった結果がgoogle側でキャッシュされてしまうので次回取得時はキャッシュを無効にする
    @noCache = true

  ### 再試行 ###
  retry: (e) => @update()
  
  ### カテゴリ変更 ###
  changeCategory: (e) =>
    return false if $(e.target).hasClass 'current'
    @update $(e.target).attr('href')
    true

  ### 記事を開く ###
  openEntry: (e) =>
    @$el.find('.list-item').removeClass 'selected'
    entryItem = @getItem e
    entryItem.addClass 'selected'
    true

  ### ウォッチリストに追加 ###
  addWatch: (e) =>
    model = @elem2model e
    entryItem = @cid2elem model.cid
    # ホットエントリーからは隠してウォッチリストに追加
    entryItem.fadeOut 'fast', () => watchView.addWatch model

  ### 隠したエントリーを復活 ###
  showEntry: (link) =>
    entryItem = @link2elem link
    entryItem.fadeIn 'fast'

### クラス定義をグローバル化 ###
@EntryItem = EntryItem
@EntryList = EntryList
@EntryView = EntryView
