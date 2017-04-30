import nock from 'nock';
import { fetchFundraisers, baseUrl, fundraisersPath } from '../';

const expectedFundraisers = [
  { amount: "29168.83", name: 'Jenny payne' },
  { amount: "17350.00", name: 'Simon Gillespie' },
  { amount: "13322.40", name: 'Gemma Marshall' },
];

describe('fetchFundraisers', () => {

  describe('when data is available', () => {
    beforeAll(() => {
      nock(baseUrl)
        .get(fundraisersPath)
        .replyWithFile(200, __dirname + '/../__data__/fundraisers.json');
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('returns a list of fundraisers', () => {
      return fetchFundraisers()
        .then(fundraisers => expect(fundraisers).toEqual(expectedFundraisers));
    });
  });

  describe('when data is unavailable', () => {
    beforeAll(() => {
      nock(baseUrl)
        .get(fundraisersPath)
        .reply(404);
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('returns an error', () => {
      return fetchFundraisers()
        .catch(err => expect(err).toEqual(Error('Data Unavailable')));
    });
  });

});
