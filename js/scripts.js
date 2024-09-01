document.addEventListener('DOMContentLoaded', function () {
    const episodesContainer = document.getElementById('episodes-container');
    const loadMoreButton = document.getElementById('load-more');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    let episodeCount = 30; // Start after the last static episode
    const episodesPerClick = 10; // Number of episodes to add per click

    // Function to add episodes
    function addEpisodes(count) {
        for (let i = 1; i <= count; i++) {
            episodeCount++;
            const episodeDiv = document.createElement('div');
            episodeDiv.className = 'col-sm-6 col-md-3 col-lg-1 mb-4 me-md-3 me-lg-3 episode';
            episodeDiv.setAttribute('data-episode', episodeCount); // Set episode number for searching
            episodeDiv.innerHTML = `
                <img src="images/animies/anime3.jpeg" alt="" class="img-fluid">
                <p>Episode ${episodeCount}</p>
            `;
            episodesContainer.appendChild(episodeDiv);
        }
    }

    // Initial load of 30 episodes
    addEpisodes(30);

    // Event listener for "More Episodes" button
    loadMoreButton.addEventListener('click', function () {
        addEpisodes(episodesPerClick);
    });

    // Event listener for the search form
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        const searchValue = searchInput.value.trim();
        
        // Convert search value to number to match episode data
        const episodeNumber = parseInt(searchValue, 10);

        if (!isNaN(episodeNumber)) {
            const episodes = document.querySelectorAll('.episode');
            let found = false; // Flag to check if the episode was found

            // Loop through all episodes and hide/show based on search
            episodes.forEach(function (episode) {
                if (parseInt(episode.getAttribute('data-episode'), 10) === episodeNumber) {
                    episode.style.display = 'block'; // Show matching episode
                    episode.style.width = '100%'; // Make the matching episode fill the screen
                    episode.style.textAlign = 'center'; // Center align content
                    found = true; // Episode found
                } else {
                    episode.style.display = 'none'; // Hide non-matching episodes
                }
            });

            // Hide the load more button and episodes container if an episode is found
            if (found) {
                loadMoreButton.style.display = 'none';
                episodesContainer.style.display = 'block';
            }
        } else {
            alert("Please enter a valid episode number."); // Alert for invalid input
        }

        searchInput.value = ''; // Clear the search input after submission
    });
});