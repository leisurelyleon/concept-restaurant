// Add a function for an event listener to load DOM performance
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const searchSubmitBtn = document.querySelector('[data-search-submit-btn');
    const searchCloseBtn = document.querySelector('[data-search-close-btn');
    const searchContainer = document.getElementById('searchContainer');
    const foodMenuList = documentSelector('.food-menu-list');

    searchSubmitBtn.addEventListener('click', performSearch);

    // Add an event listener to handle "Search" icon when clicked
    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Add an event listener to handle "Enter" key press
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default form submission behavior
            performSearch();
        }
    });

    searchCloseBtn.addEventListener('click', closeSearch);

    // Add an event listener to close the search when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!searchContainer.contains(event.target)) {
        }
    });

    function closeSearch() {
        // Clear the search input and remove highlights
        searchInput.value = '';
        removeHighlights();

        // Hide the search container
        searchContainer.style.display = 'none';
    }

    function performSearch() {
        const keywords = searchInput.value.trim().toLowerCase();
        if (keywords === '') {
            // Handle empty search input
            return;
        }

        const matchingElements = findMatchingElements(keywords);

        if (matchingElements.length > 0) {
            // Scroll to the first matching element
            const firstMatchingElement = matchingElements[0];
            window.scrollTo({
                top: firstMatchingElement.offsetTop - 50,
                behavior: 'smooth',
            });

            // Highlight the matching text
            highlightText(firstMatchingElement, keywords);
        } else {
            // Highlight no matching elements found
            console.log('No matching elements found.');
        }
    }

    // Additional debugging
    console.log('Performing search');

    function findMatchingElements(keywords) {
        const elements = document.querySelectorAll('.food-menu-card');
        const matchingElements = [];

        elements.forEach(element => {
            const itemName = element.querySelector('.card-title').textContent.toLowerCase();
            const itemCategory = element.querySelector('.category').textContent.toLowerCase();
            if (itemName.includes(keywords) || itemCategory.includes(keywords)) {
                matchingElements.push(element);
            }
        });

        return matchingElements;
    }

    function highlightText(element, keywords) {
        // Remove existing highlights
        removeHighlights();

        // Create a RegExp with the keywords to match globally and case insensitively
        const regex = new RegExp(keywords, 'gi');
        const html = element.innerHTML;

        // Wrap matching text with a span to apply styling
        const highlightedHtml = html.replace(regex, match => `<span class="highlight">${match}</span>`);

        // Update the element's content with the highlighted HTML
        element.innerHTML = highlightedHtml;
    }

    function removeHighlights() {
        const highlightedElements = foodMenuList.querySelectorAll('.food-menu-card .highlight');
        highlightedElements.forEach(element => {
            const parent = element.parentNode;
            parent.replaceChild(document.createTextNode(element.textContent), element);
        });
    }
});