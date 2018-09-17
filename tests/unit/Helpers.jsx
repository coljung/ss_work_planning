import { defaultMetricSequence } from '../../app/helpers';
import getApiUrl from '../../app/helpers';

describe('Helpers functions', () => {
  it('should get the API URL', () => expect(getApiUrl()).toEqual('http://127.0.0.1/api/'));
});
