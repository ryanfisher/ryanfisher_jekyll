image_dates = [
  '2012-09-23',
  '2012-12-02',
  '2012-12-08',
  '2012-12-15',
  '2013-01-05',
  '2013-01-13',
  '2013-02-02',
  '2013-02-03',
  '2013-02-23',
  '2013-02-24',
  '2013-04-27',
  '2013-05-11',
];

function change_showing(index) {
  $('#image-list li').removeClass('showing');
  $('#image-list li[data-image="'+index+'"]').addClass('showing');
}

var timeouts = [];

function clear_timeouts() {
  $.each(timeouts, function (index, value) { clearTimeout(value) });
}

function fade_image(index) {
  current = $('.windansea-images[data-image="'+index+'"]');
  if (index+1 >= image_dates.length) { index = 0 }
  else { index++ }
  change_showing(index);
  current.fadeOut(2000, function () {
    z = current.css('z-index');
    current.css('z-index', z-image_dates.length);
    current.show();
    var to = setTimeout(function() {
        fade_image(index);
      },
      2000
    );
    timeouts.push(to);
  });
}

function preload_images() {
 for (var i=0; i < image_dates.length; i++) {
  image = $('<img />', {
    src:"/images/windansea/"+image_dates[i]+".jpg",
    class: 'windansea-images',
    'data-image': i
  });
  image.css('z-index', -i);
  $('#windansea-image-container').append(image);
 }
}

function reset_z_indices_at(element) {
  element.css('z-index', 0);
  z = -1;
  $.each(element.nextAll('img'), function(index, value) {
    console.log(value);
    $(value).css('z-index', z);
    z--;
  });
  z = -(image_dates.length - 1);
  $.each(element.prevAll('img'), function(index, value) {
    $(value).css('z-index', z);
    z++;
  });
}

function show_image(event) {
  clear_timeouts();
  selected = $(event.currentTarget);
  index = selected.data('image');
  change_showing(index);
  reset_z_indices_at($('img[data-image="'+index+'"]'));
  var to = setTimeout(function() {
    fade_image(parseInt(selected.data('image')));
  }, 2000);
  timeouts.push(to);
}

function set_list() {
  for (var i=0; i < image_dates.length; i++) {
    item = $('<li />', {
      text: image_dates[i],
      'data-image': i
    });
    $('#image-list').append(item);
  }
  $('li').on('click', show_image);
}

function initialize_app() {
  preload_images();
  set_list();
  change_showing(0);
  var to = setTimeout(function() {fade_image(0);}, 1000);
  timeouts.push(to);
}

$(document).ready(initialize_app);
