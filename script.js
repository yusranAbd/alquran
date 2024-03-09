// API : https://api.npoint.io/99c279bb173a6e28359c/data
$(document).ready(function () {
  // Function to filter posts based on search input
  function filterPosts(posts, query) {
    return posts.filter(function (post) {
      return post.nama.toLowerCase().includes(query.toLowerCase());
    });
  }

  // Function to display filtered posts
  function displayPosts(posts) {
    $("#posts").empty();
    posts.forEach(function (post) {
      $("#posts").append(
        `<div class="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <h2 class="text-lg font-semibold mb-2">${post.nama}</h2>
                    <p class="text-gray-600">${post.ayat}</p>
                </div>`
      );
    });
  }

  // Fetch posts from API
  $.ajax({
    url: "https://api.npoint.io/99c279bb173a6e28359c/data",
    method: "GET",
    success: function (posts) {
      displayPosts(posts);

      // Event listener for search input
      $("#searchInput").on("input", function () {
        const query = $(this).val();
        const filteredPosts = filterPosts(posts, query);
        displayPosts(filteredPosts);
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
