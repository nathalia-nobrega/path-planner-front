import axios from 'axios';
import { Suggestion } from '../components/context/SuggestionsContex';

 /* This function in being used to fetch possible tourist attractions.
  * It will be used later to generate a custom page of recommendations for the user.
  */

export const fetchSuggestions = async (lat: number, lng: number, apiKey: string): Promise<Suggestion[]> => {
  const url = `/api/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=tourist_attraction&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results.map((result: any) => ({
      name: result.name,
      vicinity: result.vicinity,
      rating: result.rating,
      photos: result.photos?.map((photo: any) => photo.photo_reference),
      icon: result.icon
    }));
    return results;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};
