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

function rotate_images() {
  $('#windansea-images').css('background-image', 'url(/images/windansea/2013-05-11.jpg)');
}

function preload_images() {
 for (var i=0; i < image_dates.length; i++) {
  image = $('<img />', {src:"/images/windansea/"+image_dates[i]+".jpg"});
  $('body').append(image);
 }
}

function initialize_app() {
  preload_images();
  rotate_images();
}

$(document).ready(initialize_app);
