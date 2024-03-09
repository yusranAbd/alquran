// API : https://api.npoint.io/99c279bb173a6e28359c/data
$(document).ready(function () {
  $.ajax({
    url: "https://api.npoint.io/99c279bb173a6e28359c/data",
    method: "GET",
    success: function (posts) {
      // Loop through each post and append it to the grid
      posts.forEach(function (post) {
        $("#posts").append(
          `<div class="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h2 class="text-lg font-semibold mb-2">${post.nama}</h2>
                        <p class="text-gray-600">${post.ayat}</p>
                    </div>`
        );
      });
    },
    error: function () {
      // Display an error message if something goes wrong
      $("#posts").append(
        '<div class="text-red-600">Error fetching posts</div>'
      );
    },
  });
});
