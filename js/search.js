const applicationID = '7PKCLB5WKZ';
const apiKey = '253e1b38b67534943884ddee5c7bc2d7';
const index = 'fe_restaurants';

const client = algoliasearch(applicationID, apiKey);
const helper = algoliasearchHelper(client, index);

const restaurantCard = document.createElement('template');
restaurantCard.innerHTML = `
<div class="restaurant-card">
        <img class="restaurant-image" src="https://source.unsplash.com/random/310x160/?restaurant">
        <div id="restaurant-name" class="restaurant-name"></div>
        <div class="restaurant-subheader">
            <div id="price"></div>
            <div id="food-type"></div>
            <div id="location"></div>
        </div>
        <div class="rating">
            <div id="rating" class="rating-score"></div>
            <div id="rating-stars"></div>
        </div>
    </div>
`;

helper.on('result', function(content) {
    renderHits(content);
});

const renderHits = (content) => {
    const elementsList = document.createElement('div')
    elementsList.setAttribute('class', 'search-result')
    const allElements = (elements) => {
        elements.results.hits.map(hit => {
            const restaurantClone = restaurantCard.content.cloneNode(true);
            const name = restaurantClone.querySelector('#restaurant-name');
            const price = restaurantClone.querySelector('#price');
            const foodType = restaurantClone.querySelector('#food-type');
            const location = restaurantClone.querySelector('#location');
            const rating = restaurantClone.querySelector('#rating');
            const ratingStars = restaurantClone.querySelector('#rating-stars');

            const starSolid = document.createElement('template')
            starSolid.innerHTML = `<i class="fas fa-star star"></i>`

            const starOutline = document.createElement('template')
            starOutline.innerHTML = `<i class="far fa-star star"></i>`

            for (let star = 0; star < hit.rounded_stars_count; star++) {
                const starClone = starSolid.content.cloneNode(true);
                ratingStars.appendChild(starClone)
            }

            for (let star = 0; star < 5 - hit.rounded_stars_count; star++) {
                const starClone = starOutline.content.cloneNode(true);
                ratingStars.appendChild(starClone)
            }

            name.textContent = hit.name
            price.textContent = hit.price_range
            foodType.textContent = hit.food_type
            location.textContent = hit.neighborhood
            rating.textContent = hit.stars_count
            elementsList.appendChild(restaurantClone)
        })
        const elementsContainer = document.querySelector('#container');
        elementsContainer.innerHTML = '';
        elementsContainer.appendChild(elementsList)
    }
    allElements(content)
}

const searchBar = document.getElementById('search-box-input')
searchBar.addEventListener('keyup', () => {
    helper.setQuery(searchBar.value)
        .search();
});

helper.search();
