class NavHeader extends BaseView
  el: '.nav-header'

  hide: -> @$el.addClass('up')

  show: -> @$el.removeClass('up')

window.NavHeader = NavHeader
