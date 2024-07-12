
import axios from 'axios';
import { getMovieDetails, searchMovies } from '../../../utils/moviesapi';

jest.mock('axios');

describe('moviesapi', () => {
  describe('searchMovies', () => {
    it('fetches movies successfully', async () => {
      const mockResponse = {
        data: {
          Search: [
            { Title: 'Batman', Year: '1989', imdbID: 'tt0096895' },
            { Title: 'Superman', Year: '1978', imdbID: 'tt0078346' },
          ],
        },
      };
      axios.get.mockResolvedValue(mockResponse);

      const result = await searchMovies('Batman');
      expect(result.Search).toHaveLength(2);
      expect(result.Search[0].Title).toBe('Batman');
    });

    it('handles error when fetching movies', async () => {
      axios.get.mockRejectedValue(new Error('Request failed with status code 500'));

      const result = await searchMovies('Spiderman');
      expect(result.Search).toEqual([]);
    });
  });

  describe('getMovieDetails', () => {
    it('fetches movie details successfully', async () => {
      const imdbID = 'tt0096895';
      const mockResponse = {
        data: {
          Title: 'Batman',
          Year: '1989',
          imdbID: 'tt0096895',
          Plot: 'The Dark Knight of Gotham City begins his war on crime...',
        },
      };
      axios.get.mockResolvedValue(mockResponse);

      const result = await getMovieDetails(imdbID);
      expect(result.Title).toBe('Batman');
    });

    it('returns null on error when fetching movie details', async () => {
      const imdbID = 'tt0096895';
      axios.get.mockRejectedValue(new Error('Request failed with status code 500'));

      const result = await getMovieDetails(imdbID);
      expect(result).toBeNull();
    });
  });
});
