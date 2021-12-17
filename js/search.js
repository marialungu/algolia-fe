const applicationID = '7PKCLB5WKZ';
const apiKey = '253e1b38b67534943884ddee5c7bc2d7';
const index = 'fe_restaurants';

const client = algoliasearch(applicationID, apiKey);
const helper = algoliasearchHelper(client, index);

helper.on('result', function(content) {
    renderHits(content);
});

const renderHits = (content) => {
    const elementsList = document.createElement('div')
    const allElements = (elements) => {
        elements.results.hits.map(hit => {
            const div = document.createElement('div');
            div.textContent = hit.name;
            elementsList.appendChild(div)
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
