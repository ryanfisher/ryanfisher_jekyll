class Profile extends BaseView
  el: 'body.profile'

  initialize: ->
    @github_events = new GithubEvents
    @github_events.fetch()
    @github_events.on 'sync', => @showEvents()

  showEvents: ->
    @$('.github-last-commit').text @github_events.lastCommitMessage()

window.Profile = Profile
