export default function fetchCountries(names) {
  return fetch(`https://restcountries.com/v3.1/name/${names}?fields=name,capital,population,flags,languages`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
	
}




