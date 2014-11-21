class GithubEvents
  url: 'https://api.github.com/users/ryanfisher/events'

  constructor: ->
    @trigger_obj = $('<div>')

  fetch: ->
    jqXHR = $.ajax url: @url
    jqXHR.done (data) => @setAttributes data

  setAttributes: (data) ->
    @attributes = data
    @trigger_obj.trigger 'sync'

  get: (key) -> @attributes[key]

  on: (ev, callback) ->
    @trigger_obj.on 'sync', -> callback()

  lastCommitMessage: ->
    for ev in @attributes
      return ev.payload.commits['0'].message if ev.type == 'PushEvent'
    null

window.GithubEvents = GithubEvents
