import axios from 'axios';

// Variables

const countriesNews = 'https://newsapi.org/v2/top-headlines';
const everethingNews = 'https://newsapi.org/v2/everything';
const country = document.querySelector('#countries');
const category = document.querySelector('#categories');
const searchInput = document.querySelector('#search');
const invalidInput = document.querySelector('.invalid');
const searchBtn = document.querySelector('.btn');
const newsBlock = document.querySelector('#news-block');

// Select
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

// Request

const getRequest = (url, search, country, category) => {
    axios
        .get(url, {
            params: {
                apiKey: '7c2789a2da3e49cf9ba7392e20e6f8a8',
                country: country,
                category: category,
                q: search,
            },
        })
        .then(function (response) {
            console.log(response.data.articles, response);
            renderNews(response.data.articles);
        })
        .catch(function (error) {
            console.log(error);
        });
};

// Render News

const renderNews = (articles) => {
    while (newsBlock.firstChild) {
        newsBlock.removeChild(newsBlock.firstChild);
    }
    const fragment = document.createDocumentFragment();
    articles.forEach(({ title, url, urlToImage, description }) => {
        const card = document.createElement('div');
        card.classList.add('col', 's12', 'm6', 'l6', 'xl4');
        const cardContent = `
    <div class="card">
      <div class="card-image">
        <img src="${urlToImage}">
      </div>
      <div class="card-content">
        <a href="${url}"><span class="card-title blue-text">${title}</span></a>
        <p>${description}</p>
      </div>
    </div>
    `;
        card.insertAdjacentHTML('afterbegin', cardContent);
        fragment.append(card);
    });
    newsBlock.append(fragment);
};

country.addEventListener('change', () => {
    getRequest(countriesNews, null, country.value, category.value);
});

category.addEventListener('change', () => {
    getRequest(countriesNews, null, country.value, category.value);
});

const search = () => {
    if (!searchInput.value) {
        invalidInput.style.display = 'block';
    } else {
        getRequest(everethingNews, searchInput.value);
        invalidInput.style.display = 'none';
        searchInput.value = '';
    }
};

searchBtn.addEventListener('click', search);
searchInput.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
        search();
    }
});

getRequest(countriesNews, null, country.value, category.value);
