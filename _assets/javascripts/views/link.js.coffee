class Link extends BaseView
  el: 'a'
  events: 'click': 'track'

  track: ->
    ga('send', 'event', 'Link', 'Visit', @$el.text())

window.Link = Link
