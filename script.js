// API : https://api.npoint.io/99c279bb173a6e28359c/data

$(document).ready(function () {
  const itemsPerPage = 8; // Number of posts per page
  let currentPage = 1; // Current page number
  let filteredPosts = []; // Filtered posts

  // Function to filter posts based on search input
  function filterPosts(posts, query) {
    return posts.filter(function (post) {
      return post.nama.toLowerCase().includes(query.toLowerCase());
    });
  }

  // Function to display posts for the current page
  function displayCurrentPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPagePosts = filteredPosts.slice(startIndex, endIndex);

    $("#posts").empty();
    currentPagePosts.forEach(function (post) {
      const $postItem = $(`
                <div class="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer">
                    <h2 class="text-lg font-semibold mb-2">${post.nama}</h2>
                    <p class="text-gray-600 hidden">${post.keterangan}</p>
                </div>
            `);
      $postItem.click(function () {
        const title = post.nama;
        const body = post.keterangan;
        const audioUrl = post.audio; // Replace with actual audio URL
        $("#popupTitle").text(title);
        $("#popupBody").text(body);
        $("#audioPlayer").attr("src", audioUrl);
        $("#popup").removeClass("hidden");
      });
      $("#posts").append($postItem);
    });
  }

  // Function to display pagination
  function displayPagination() {
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    $("#pagination").empty();
    for (let i = 1; i <= totalPages; i++) {
      const $pageButton = $(
        `<button class="mx-2 py-1 px-3 rounded-full border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none">${i}</button>`
      );
      $pageButton.click(function () {
        currentPage = i;
        displayCurrentPage();
      });
      $("#pagination").append($pageButton);
    }
  }

  // Fetch posts from API
  $.ajax({
    url: "https://api.npoint.io/99c279bb173a6e28359c/data",
    method: "GET",
    success: function (posts) {
      filteredPosts = posts;

      displayCurrentPage();
      displayPagination();

      // Event listener for search input
      $("#searchInput").on("input", function () {
        const query = $(this).val();
        filteredPosts = filterPosts(posts, query);
        currentPage = 1; // Reset to first page when filtering
        displayCurrentPage();
        displayPagination();
      });

      // Event listener to close popup
      $("#closePopup").click(function () {
        $("#popup").addClass("hidden");
        $("#audioPlayer").get(0).pause(); // Pause audio when closing popup
      });

      // Event listener for audio button
      $("#posts").on("click", ".audio-btn", function () {
        const audioUrl = $(this).parent().find("audio").attr("src");
        const audio = new Audio(audioUrl);
        audio.play();
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
