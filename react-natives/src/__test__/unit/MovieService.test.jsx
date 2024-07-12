import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { movieApikey } from '../../../utils/apikey';
import { searchMovies } from '../../../utils/moviesapi';

const omdbApiUrl = 'http://www.omdbapi.com/';

describe('OMDb API functions', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('searchMovies', () => {
    it('should fetch movies based on query', async () => {
      const query = 'Batman';
      const mockResponse = { Search: [{ Title: 'Batman', Year: '1989', imdbID: 'tt0096895' }] };
      const url = `${omdbApiUrl}?s=${query}&apikey=${movieApikey}`;

      mock.onGet(url).reply(200, mockResponse);

      const result = await searchMovies(query);

      expect(result).toEqual(mockResponse);
    });

    it('should fetch general movies when no query is provided', async () => {
      const mockResponse = { Search: [{ Title: 'Movie', Year: '2020', imdbID: 'tt1234567' }] };
      const url = `${omdbApiUrl}?s=movie&apikey=${movieApikey}`;

      mock.onGet(url).reply(200, mockResponse);

      const result = await searchMovies('');

      expect(result).toEqual(mockResponse);
    });

    it('should return an empty array on error', async () => {
      const query = 'Batman';
      const url = `${omdbApiUrl}?s=${query}&apikey=${movieApikey}`;

      mock.onGet(url).reply(500);

      const result = await searchMovies(query);

      expect(result).toEqual({ Search: [] });
    });
  });

})