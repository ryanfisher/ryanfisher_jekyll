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

function fade_image(index) {
  current = $('.windansea-images[data-image="'+index+'"]');
  z = current.css('z-index');
  if (index+1 >= image_dates.length) { index = 0 }
  else { index++ }
  change_showing(index);
  current.fadeOut(2000, function () {
    current.css('z-index', z-image_dates.length);
    current.show();
    setTimeout(function() {
        fade_image(index);
      },
      2000
    );
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

function set_list() {
 for (var i=0; i < image_dates.length; i++) {
  item = $('<li />', {
    text: image_dates[i],
    'data-image': i
  });
  $('#image-list').append(item);
 }
}

function initialize_app() {
  preload_images();
  set_list();
  change_showing(0);
  setTimeout(function() {fade_image(0);}, 1000);
}

$(document).ready(initialize_app);
