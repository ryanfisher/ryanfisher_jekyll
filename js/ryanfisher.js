function remove_cursor() {
  $('#prompt').removeClass('cursor');
  setTimeout(add_cursor, 1000);
}

function add_cursor() {
  $('#prompt').addClass('cursor');
  setTimeout(remove_cursor, 1000);
}

function initialize_app() {
  console.log("Initializing app");
  add_cursor();
};

$(document).ready(initialize_app);
