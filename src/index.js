import './css/styles.css';
// import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
// визов 
// Notiflix.Notify.success('Sol lucet omnibus');
import fetchCountries from './js/fetchCountries';

refs = {
	input: document.querySelector("#search-box")
};

refs.input.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY ));

function inputValue(event) {
	event.preventDefault();
	console.log(event.target.value);
	
	fetchCountries(event.target.value)
		.then(
			(name) => verifyArray(name)
		)
		.catch((error) => errorMasage(error));
};
function verifyArray(name) {
	if (name.length > 10) {return	Notiflix.Notify.success("Too many matches found. Please enter a more specific name.");
	} if (name.length <= 10 && name.length >= 2) { 
		Notiflix.Notify.success("XexEexE");
		name.map(country => console.log(country.capital))
		return
		
	} else {
		const newName = name;
		console.log(newName);
}}

	

function errorMasage(error) {
	Notiflix.Notify.failure("Oops, there is no country with that name");
}
