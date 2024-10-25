import { useState, useContext, useDeferredValue, useMemo, useTransition } from 'react';
import useBreedList from './useBreedList';
import { useQuery } from '@tanstack/react-query';
import Results from './Results';
import fetchSearch from './fetchSearch';
import AdoptedPetContext from './AdoptedPetContext';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);
  const [isPending, startTransition] = useTransition();
  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const defferedPets = useDeferredValue(pets);
  const renderedPets = useMemo(() => <Results pets={defferedPets} />, [defferedPets]);
  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.target);
          console.log(formData);
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? '',
          };
          startTransition(() => {
            setRequestParams(obj);
          });
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
              setAnimal(e.target.value);
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
        {isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">🤡</h2>
          </div>
        ) : (
          <button>Submit</button>
        )}
      </form>
      {renderedPets}
    </div>
  );
};
export default SearchParams;
