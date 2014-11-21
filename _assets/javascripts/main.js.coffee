#= require views/base_view
#= require_tree .

jQuery ->
  new WindowView
  new Profile if $('body.profile').length > 0
