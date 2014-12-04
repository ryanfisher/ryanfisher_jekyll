class WindowView extends BaseView
  el: window
  events:
    'scroll' : 'change_nav'

  initialize: ->
    @nav = new Nav

  change_nav: ->
    if @$el.scrollTop() == 0 then @nav.show() else @nav.hide()

window.WindowView = WindowView
