import { defaultMetricSequence } from '../../app/Helpers';
import getApiUrl from '../../app/Helpers';

describe('Helpers functions', () => {
  it('should get the API URL', () => expect(getApiUrl()).toEqual('http://127.0.0.1/api/'));

  it('should get default metric query string', () => {
    expect(defaultMetricSequence()).toEqual(
      'SALES,COGS,GM$,GM%,RECEIVED COST,RECEIPT%,BOM COST,iRETAIL,iGM%,TURNOVER RATE'
    );
  });
});
