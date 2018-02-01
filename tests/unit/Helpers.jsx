import { defaultMetricString } from '../../app/Helpers';
import getApiUrl from '../../app/Helpers';

describe('Helpers functions', () => {
  it('should get the API URL', () => expect(getApiUrl()).toEqual('http://127.0.0.1/api/'));

  it('should get default metric query string', () => {
    expect(defaultMetricString()).toEqual(
      'iGM%,iRETAIL,BOM COST,RECEIPT%,RECEIVED COST,GM%,GM$,COGS,SALES'
    );
  });
});
