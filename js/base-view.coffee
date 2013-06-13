###*
* 各ビューの共通部分をまとめてベースクラス化(主にイベント系)
*
* - entry-list.coffee, watch-list.coffeeより先にロードされる必要がある
###

class BaseView extends Backbone.View
  ### コレクションの初期化 & ビュークリア ###
  clear: () =>
    @$listContent.empty()
    @collection.reset()

  ### 初期処理 ###
  initialize: (options) =>
    _.bindAll @
    @tmpl = _.template $('#view-entry').html()
    @$loading = @$el.find('.loading')
    @$listContent = @$el.find('.list-content')

  ### イベントが発生した要素の親を遡ってエントリー要素を取得 ###
  getItem: (e) =>
    $item = $(e.target)
    $item = $item.parent() while not $item.hasClass 'list-item'
    $item

  ### エントリー内にカーソルが入った ###
  mouseIn: (e) =>
    entryItem = @getItem e
    entryItem.find('.list-item .pure-button').stop().hide()
    entryItem.find('.pure-button').fadeIn 'fast'

  ### エントリー内からカーソルが外れた ###
  mouseOut: (e) =>
    entryItem = @getItem e
    entryItem.find('.pure-button').stop().hide()
  
  ### cidからビュー上の要素を取得 ###
  cid2elem: (cid) => @$el.find('.list-item').filter () -> $(@).data('cid') is cid

  ### URLからビュー上の要素を取得 ###
  link2elem: (link) => @$el.find('.list-item').filter () -> $(@).find('h3 a').attr('href') is link

  ### ビュー上の要素から元のモデルを取得 ###
  elem2model: (e) => @collection.get(@getItem(e).data 'cid')

### クラス定義をグローバル化 ###
@BaseView = BaseView
