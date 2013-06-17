###*
* 全体・共通処理
*
* - DOMがロードされて準備完了になったら実行される
###

$ () ->
  ### JavaScriptでエラーが発生したらブラウザにエラー情報を表示させる ###
  window.onerror = (msg, url, line) ->
    $('#error .message').text msg
    $('#error .at').text "at '#{url}': #{line}"
    $('#error').slideDown 300
    $(window).scrollTop 0
  $('#error .close').click () -> $('#error').slideUp()

  ### ソーシャルボタン ###
  unless __DEBUG__
    $('#social-buttons').popnSocialButton [ 'twitter', 'facebook', 'hatebu', 'gplus', 'github' ], githubRepo: 'ktty1220/bucome-watcher'

  ### 各リストの高さを自動的にブラウザの高さに合わせる ###
  $listHeader = $('.list-header').get(0)
  $listControl = $('.list-control').get(0)
  $footer = $('#footer').get(0)
  resizeList = () ->
    listMargin = $listHeader.offsetHeight
    listMargin += $listControl.offsetHeight
    listMargin += $footer.offsetHeight
    $('.list-content').height $(window).height() - listMargin
  $(window).bind 'resize', resizeList
  resizeList()

  ### ビュー作成 ###
  window.watchView = new WatchView()
  window.entryView = new EntryView()
  window.commentView = new CommentView()
