import { getCommentsCount } from '../utils/counter.js';

describe('counter tests', () => {
  test('count total comments for a single item', () => {
    const items = [
      { id: 'item1', expectedCount: 1 },
      { id: 'item2', expectedCount: 2 },
      { id: 'item3', expectedCount: 3 },
    ];

    items.forEach((item) => {
      getCommentsCount(item).then((counts) => {
        expect(counts).toEqual(item.expectedCount);
      }).catch((error) => { return new Error(error); });
    });
  });
});