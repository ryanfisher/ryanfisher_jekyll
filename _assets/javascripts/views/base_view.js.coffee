class BaseView
  events: {}

  constructor: ->
    @$el = if @el then $(@el) else $('<div>')
    @delegateEvents()
    @initialize()

  initialize: ->

  delegateEvents: ->
    for key, value of @events
      @$el.on key, (event) => this['__proto__'][value].call(this, event)

  $: (el) -> @$el.find(el)

window.BaseView = BaseView
