// JEST 정상 동작 확인용 임시 테스트 코드
import sum from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
