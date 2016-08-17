(function() {
  var BaseView;

  BaseView = (function() {
    BaseView.prototype.events = {};

    function BaseView() {
      this.$el = this.el ? $(this.el) : $('<div>');
      this.delegateEvents();
      this.initialize();
    }

    BaseView.prototype.initialize = function() {};

    BaseView.prototype.delegateEvents = function() {
      var key, ref, results, value;
      ref = this.events;
      results = [];
      for (key in ref) {
        value = ref[key];
        results.push(this.$el.on(key, (function(_this) {
          return function(event) {
            return _this['__proto__'][value].call(_this, event);
          };
        })(this)));
      }
      return results;
    };

    BaseView.prototype.$ = function(el) {
      return this.$el.find(el);
    };

    return BaseView;

  })();

  window.BaseView = BaseView;

}).call(this);
(function() {
  var GithubEvents;

  GithubEvents = (function() {
    GithubEvents.prototype.url = 'https://api.github.com/users/ryanfisher/events';

    function GithubEvents() {
      this.trigger_obj = $('<div>');
    }

    GithubEvents.prototype.fetch = function() {
      var jqXHR;
      jqXHR = $.ajax({
        url: this.url
      });
      return jqXHR.done((function(_this) {
        return function(data) {
          return _this.setAttributes(data);
        };
      })(this));
    };

    GithubEvents.prototype.setAttributes = function(data) {
      this.attributes = data;
      return this.trigger_obj.trigger('sync');
    };

    GithubEvents.prototype.get = function(key) {
      return this.attributes[key];
    };

    GithubEvents.prototype.on = function(ev, callback) {
      return this.trigger_obj.on('sync', function() {
        return callback();
      });
    };

    GithubEvents.prototype.lastCommitMessage = function() {
      var commits, ev, i, len, ref;
      ref = this.attributes;
      for (i = 0, len = ref.length; i < len; i++) {
        ev = ref[i];
        if (ev.type === 'PushEvent') {
          commits = ev.payload.commits;
          return commits[commits.length - 1].message;
        }
      }
      return null;
    };

    return GithubEvents;

  })();

  window.GithubEvents = GithubEvents;

}).call(this);
$(document).ready();
(function() {
  var Link,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Link = (function(superClass) {
    extend(Link, superClass);

    function Link() {
      return Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.el = 'a';

    Link.prototype.events = {
      'click': 'track'
    };

    Link.prototype.track = function(event) {
      var $el;
      $el = $(event.currentTarget);
      return ga('send', 'event', 'Link', 'Visit', $el.text());
    };

    return Link;

  })(BaseView);

  window.Link = Link;

}).call(this);
(function() {
  var Nav,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Nav = (function(superClass) {
    extend(Nav, superClass);

    function Nav() {
      return Nav.__super__.constructor.apply(this, arguments);
    }

    Nav.prototype.el = 'nav';

    Nav.prototype.hide = function() {
      return this.$el.addClass('up');
    };

    Nav.prototype.show = function() {
      return this.$el.removeClass('up');
    };

    return Nav;

  })(BaseView);

  window.Nav = Nav;

}).call(this);
(function() {
  var Profile,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Profile = (function(superClass) {
    extend(Profile, superClass);

    function Profile() {
      return Profile.__super__.constructor.apply(this, arguments);
    }

    Profile.prototype.el = 'body.profile';

    Profile.prototype.initialize = function() {
      this.github_events = new GithubEvents;
      this.github_events.fetch();
      return this.github_events.on('sync', (function(_this) {
        return function() {
          return _this.showEvents();
        };
      })(this));
    };

    Profile.prototype.showEvents = function() {
      return this.$('.github-last-commit').text(this.github_events.lastCommitMessage());
    };

    return Profile;

  })(BaseView);

  window.Profile = Profile;

}).call(this);
(function() {
  var WindowView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  WindowView = (function(superClass) {
    extend(WindowView, superClass);

    function WindowView() {
      return WindowView.__super__.constructor.apply(this, arguments);
    }

    WindowView.prototype.el = window;

    WindowView.prototype.events = {
      'scroll': 'change_nav'
    };

    WindowView.prototype.initialize = function() {
      return this.nav = new Nav;
    };

    WindowView.prototype.change_nav = function() {
      if (this.$el.scrollTop() === 0) {
        return this.nav.show();
      } else {
        return this.nav.hide();
      }
    };

    return WindowView;

  })(BaseView);

  window.WindowView = WindowView;

}).call(this);
(function() {
  jQuery(function() {
    new WindowView;
    if ($('body.profile').length > 0) {
      new Profile;
    }
    return new Link;
  });

}).call(this);
