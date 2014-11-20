class BaseView
  events: {}

  constructor: ->
    @$el = if @el then $(@el) else $('<div>')
    @delegateEvents()
    @initialize()

  initialize: ->

  delegateEvents: ->
    for key, value of @events
      @$el.on key, => this['__proto__'][value].call(this)

class NavHeader extends BaseView
  el: '.nav-header'

  hide: -> @$el.addClass('up')

  show: -> @$el.removeClass('up')

class WindowView extends BaseView
  el: window
  events:
    'scroll' : 'change_header'

  initialize: ->
    @header = new NavHeader

  change_header: ->
    if @$el.scrollTop() == 0 then @header.show() else @header.hide()

jQuery -> new WindowView
