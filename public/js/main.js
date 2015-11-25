console.log('JS loaded!');

var $mainContent;

var showCrawl = function(e) {
  // get the clicked crawl's id
  var crawlId = $(e.target).data('id');
  var $showbody = $('#showbody');
  // get the crawl's JSON
  $.get("/crawls/" + crawlId)
    .success(function(data) {
      console.log(data);
      // template the crawl show page
      var showCrawlTemplate = _.template($('#showTemplate').html());
      var $showHTML = $(showCrawlTemplate({crawl: data}));
      console.log($showHTML);

      // swap out the page's content
      $mainContent.fadeOut(1000, function() {
        $showbody.append($showHTML);
        $showbody.fadeIn(1000, function(){});

      });
    });
};

$(document).ready(function () {
  $mainContent = $('#main-content');
  var $crawlDetail = $('.crawl-detail');

  // compile all templates

  var crawlDetailTemplate = _.template($('#crawlDetailTemplate').html());

  // render a crawl by templating it and adding a click event
  var renderCrawl = function(crawl) {
    var $crawlHTML = $(crawlDetailTemplate({crawl: crawl}));
    $crawlHTML.on('click', showCrawl);
    return $crawlHTML;
  };

  // get all crawls and render on index
  $.get('/crawls', function(crawls) {
    console.log(crawls);

    crawls.forEach(function(crawl) {
      var crawlHTML = renderCrawl(crawl);
      $crawlDetail.append(crawlHTML);
    });
  });
});
