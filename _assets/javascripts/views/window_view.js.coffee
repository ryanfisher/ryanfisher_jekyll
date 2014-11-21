class WindowView extends BaseView
  el: window
  events:
    'scroll' : 'change_header'

  initialize: ->
    @header = new NavHeader

  change_header: ->
    if @$el.scrollTop() == 0 then @header.show() else @header.hide()

window.WindowView = WindowView
