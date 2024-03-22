$(document).ready(function () {
  const itemsPerPage = 8; // Jumlah Post Per halaman
  let currentPage = 1; // Page default/ halaman pertama
  let filteredPosts = []; // filter post

  // Fungsi untuk memfilter post berdasarkan masukan input dari user
  function filterPosts(posts, query) {
    return posts.filter(function (post) {
      return post.nama.toLowerCase().includes(query.toLowerCase());
    });
  }

  // Fungsi ini untuk menghapus tag HTML didalam text, yang nanti digunakan diketerangan ayat
  function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  // Fungsi untuk menampilkan post
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
        const body = stripHtml(post.keterangan);
        const audioUrl = post.audio; // Replace with actual audio URL
        $("#popupTitle").text(title);
        $("#popupBody").text(body);
        $("#audioPlayer").attr("src", audioUrl);
        $("#popup").removeClass("hidden");
      });
      $("#posts").append($postItem);
    });
  }

  // Fungsi untuk menampilkan nomor halaman
  function displayPagination(totalPages) {
    $("#pagination").empty();
    for (let i = 1; i <= totalPages; i++) {
      const $pageButton = $(
        `<button class="page-btn mx-2 py-1 px-3 rounded-full border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none">${i}</button>`
      );
      if (i === currentPage) {
        $pageButton.addClass("active");
      }
      $pageButton.click(function () {
        currentPage = i;
        displayCurrentPage();
        displayPagination(totalPages);
      });
      $("#pagination").append($pageButton);
    }
  }

  // Fetching Api
  $.ajax({
    url: "https://api.npoint.io/99c279bb173a6e28359c/data",
    method: "GET",
    success: function (posts) {
      filteredPosts = posts;
      const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

      displayCurrentPage();
      displayPagination(totalPages);

      // Event listener for search input
      $("#searchInput").on("input", function () {
        const query = $(this).val();
        filteredPosts = filterPosts(posts, query);
        currentPage = 1; // Reset to first page when filtering
        const newTotalPages = Math.ceil(filteredPosts.length / itemsPerPage);
        displayCurrentPage();
        displayPagination(newTotalPages);
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
