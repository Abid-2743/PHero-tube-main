document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "https://openapi.programming-hero.com/api/videos/category/";

    // Fetch data based on category ID
    const fetchData = async (categoryId) => {
        try {
            const response = await fetch(baseUrl + categoryId);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return null; // Return null to indicate fetch failure
        }
    };

    // Display videos as cards or show error message
    const displayCardsOrError = (videos) => {
        const tubeContainer = document.getElementById('tube-container');
        tubeContainer.innerHTML = '';
        if (!videos || !Array.isArray(videos) || videos.length === 0) {
            const errorMessage = document.createElement('div');
            errorMessage.classList = `col-start-1 col-span-4 text-center mx-auto mt-6`
            errorMessage.innerHTML = `
            <img class ="text-center mx-auto h-auto max-w-full" src="image/Icon.png" alt="" srcset="">
            <p class ="text-5xl text-center mx-auto pt-6 font-medium w-[80%]">Oops!! Sorry, There is no content here</p>
            `;
            tubeContainer.appendChild(errorMessage);
        } else {
            displayCards(videos);
        }
    };

    // Display videos as cards
    const displayCards = (videos) => {
        const tubeContainer = document.getElementById('tube-container');
        videos.forEach(video => {
            const { thumbnail, authors, title, others } = video;
            const tubeCard = document.createElement('div');
            tubeCard.className = 'card card-compact w-96 bg-gray-100 shadow-xl';
            tubeCard.innerHTML = `
                <figure><img src="${thumbnail}" alt="Thumbnail of ${title}" /></figure>
                <div class="card-body">
                    <div class="flex items-center space-x-3 mb-4">
                        <img src="${authors[0]?.profile_picture}" alt="Profile picture of ${authors[0]?.profile_name}" class="w-10 h-10 rounded-full">
                        <h2 class="card-title">${authors[0]?.profile_name}</h2>
                    </div>
                    <h2 class="card-title">${title}</h2>
                    <p>Views: ${others?.views ?? 'N/A'}</p>
                </div>
            `;
            tubeContainer.appendChild(tubeCard);
        });
    };

    // Filter videos by category
    window.filterCategory = async (categoryId) => {
        const data = await fetchData(categoryId);
        if (data && data.data && Array.isArray(data.data)) {
            displayCardsOrError(data.data);
        } else {
            console.error('Invalid data format:', data);
        }
    };

    // Load all videos from the "All" category on initial load
    filterCategory('1000');
});
