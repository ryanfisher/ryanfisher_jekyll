jQuery ->
  $window = $(window)
  $window.scroll ->
    header = $('.nav-header')
    if $window.scrollTop() == 0
      header.removeClass('up')
    else
      header.addClass('up')
