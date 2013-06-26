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

function display_next_image(index) {
  current = $('.windansea-images:visible')
  current.css('z-index', 1);
  next = $('.windansea-images:hidden')
  next.css('z-index', 0).css(
    'background-image',
    'url(/images/windansea/'+image_dates[index]+'.jpg)'
  );
  if (index+1 >= image_dates.length) { index = 0 }
  else { index++ }
  next.show();
  current.fadeOut(1000, function () {
  setTimeout(function() {
      display_next_image(index);
    },
    2000
  );
  });
}

function preload_images() {
 for (var i=0; i < image_dates.length; i++) {
  image = $('<img />', {src:"/images/windansea/"+image_dates[i]+".jpg"});
  $('body').append(image);
 }
}

function initialize_app() {
  preload_images();
  display_next_image(0);
}

$(document).ready(initialize_app);
