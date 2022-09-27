import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
import fetchCountries from './js/fetchCountries';

refs = {
	input: document.querySelector("#search-box"),
	countryList: document.querySelector(".country-list"),
	countryInfo: document.querySelector(".country-info"),
};

refs.input.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY ));

function inputValue(event) {
	event.preventDefault();
	const countries = event.target.value.trim()
	console.log(countries);

	if (countries === "") {
		return
}
	
	fetchCountries(countries)
		.then(
			(name) => verifyArray(name)
		)
		.catch((error) => errorMasage(error));
};
function verifyArray(name) {
	if (name.length > 10) {
		refs.countryList.innerHTML = "";
		refs.countryInfo.innerHTML = "";
		Notiflix.Notify.success("Too many matches found. Please enter a more specific name."
		);
		return;
	} if (name.length <= 10 && name.length >= 2) { 
		refs.countryInfo.innerHTML = "";
		const html = name.map(country => `<li class="list-item" style="display: flex; align-items:center;">
		<img  src="${country.flags.png}" alt="${country.name.official}" width="80" height="50">
      <p style="margin-left: 10px">${country.name.official}</p></li >`).join("");
		console.log(refs.countryList);
		refs.countryList.innerHTML = html;

		return
		
	} else {
		refs.countryList.innerHTML = "";
		const newName = name[0];
		const htmlOneCountry = `<li class="list-item" style="display: inline-flex; align-items:center;">
		<img  src="${newName.flags.png}" alt="${newName.name.official}" width="80" height="50">
      <p style="margin-left: 10px">${newName.name.official}</p></li >`;
		
		const htmlInfoCountry = `<p>Capital: ${newName.capital}</p>
		<p>Population: ${newName.population}</p>
		<p>Languages: ${Object.values(newName.languages)}</p>`;
		
		refs.countryList.innerHTML = htmlOneCountry;
		refs.countryInfo.innerHTML = htmlInfoCountry;
		return
	} }

	

function errorMasage(error) {
	Notiflix.Notify.failure("Oops, there is no country with that name");
}
