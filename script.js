$(document).ready(function () {
  $.ajax({
    url: "https://api.npoint.io/99c279bb173a6e28359c/data",
    method: "GET",
    success: function (posts) {
      // Loop through each post and append it to the list
      posts.forEach(function (post) {
        $("#posts").append("<li>" + post.nama + "</li>");
      });
    },
    error: function () {
      // Display an error message if something goes wrong
      $("#posts").append("<li>Error fetching posts</li>");
    },
  });
});
