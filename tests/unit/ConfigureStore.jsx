import configureStore from '../../app/ConfigureStore';

describe('Configure Store', () => {
  it('should get store config', () => {
    const store = configureStore();

    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('subscribe');
    expect(store).toHaveProperty('getState');
  });
});
