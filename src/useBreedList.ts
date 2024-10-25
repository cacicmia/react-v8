import { Animal } from './APIResponsesTypes';
import fetchBreedList from './fetchBreedList';
import { QueryStatus, useQuery } from '@tanstack/react-query';
export default function useBreedList(animal: Animal) {
  const results = useQuery(['breeds', animal], fetchBreedList);
  return [results?.data?.breeds ?? [], results.status] as [string[], QueryStatus];
}
