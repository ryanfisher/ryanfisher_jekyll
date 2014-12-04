class Nav extends BaseView
  el: 'nav'

  hide: -> @$el.addClass('up')

  show: -> @$el.removeClass('up')

window.Nav = Nav
