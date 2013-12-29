function remove_cursor() {
  $('#prompt').removeClass('cursor');
  setTimeout(add_cursor, 500);
}

function add_cursor() {
  $('#prompt').addClass('cursor');
  setTimeout(remove_cursor, 600);
}

function prepend_text(event) {
  var character = String.fromCharCode(event.keyCode);
  if (character === ' ') { character = '&nbsp;' };
  $('#terminal-input').append(character);
}

function initialize_app() {
  console.log("Initializing app");
  add_cursor();
  $(document).on('keypress', prepend_text);
};

$(document).ready(initialize_app);
