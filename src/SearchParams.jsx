import { useState } from 'react';
import useBreedList from './useBreedList';
import { useSearchQuery } from './petApiService';
import Results from './Results';
import { useSelector, useDispatch } from 'react-redux';
import { all } from './searchParamsSlice';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const adoptedPet = useSelector(state => state.adoptedPet.value);
  const searchParams = useSelector(state => state.searchParams.value);
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);
  let { data: pets } = useSearchQuery(searchParams);
  pets = pets ?? [];
  const dispatch = useDispatch();

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? '',
          };
          dispatch(all(obj));
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
        <button>Submit</button>
      </form>
      <Results pets={pets} />;
    </div>
  );
};
export default SearchParams;
