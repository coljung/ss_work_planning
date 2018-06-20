import { defaultMetricSequence } from '../../app/Helpers';
import getApiUrl from '../../app/Helpers';

describe('Helpers functions', () => {
  it('should get the API URL', () => expect(getApiUrl()).toEqual('http://127.0.0.1/api/'));
});
