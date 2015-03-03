class Link extends BaseView
  el: 'a'
  events: 'click': 'track'

  track: (event) ->
    $el = $(event.currentTarget)
    ga('send', 'event', 'Link', 'Visit', $el.text())

window.Link = Link
