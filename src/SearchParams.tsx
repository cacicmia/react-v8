import { useState, useContext } from 'react';
import useBreedList from './useBreedList';
import { useQuery } from '@tanstack/react-query';
import Results from './Results';
import fetchSearch from './fetchSearch';
import AdoptedPetContext from './AdoptedPetContext';
import { Animal } from './APIResponsesTypes';
const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '' as Animal,
    breed: '',
  });
  const [animal, setAnimal] = useState('' as Animal);
  const [breeds] = useBreedList(animal);
  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          console.log(formData);
          const obj = {
            animal: (formData.get('animal')?.toString() as Animal) ?? ('' as Animal),
            breed: formData.get('breed')?.toString() ?? '',
            location: formData.get('location')?.toString() ?? '',
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input type="text" name="location" id="location" placeholder="location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            placeholder="animal"
            name="animal"
            onChange={e => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={breeds.length === 0} placeholder="breed">
            <option />
            {breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />;
    </div>
  );
};
export default SearchParams;
