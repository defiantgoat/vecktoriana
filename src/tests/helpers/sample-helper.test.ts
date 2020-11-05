import 'jest';
import { multiplyMe } from '../../helpers/sample-helper';

describe('Helpers Tests', () => {

  it('tests multiplyMe', () => {
    const testNumber = multiplyMe(10, 10);
    expect(testNumber).toEqual(100);
  });

});
