import { HungryBear } from './../src/feed-the-bear.js';

describe('Fuzzy', () => {
  jest.useFakeTimers();
  let fuzzy;

  beforeEach(function() {
    fuzzy = new HungryBear("Fuzzy");
    fuzzy.setHunger();
    fuzzy.setMood();
  });

  afterEach(function() {
    jest.clearAllTimers();
  });

  test('should have a name and a food level of 10 when it is created', () => {
    expect(fuzzy.name).toEqual("Fuzzy");
    expect(fuzzy.foodLevel).toEqual(10);
  });

  test('should have a food level of 7 after 3001 milliseconds', () => {
    jest.advanceTimersByTime(3001);
    expect(fuzzy.foodLevel).toEqual(7);
  });

  test('should get very hungry if the food level drops below zero', function() {
    fuzzy.foodLevel = 0;
    expect(fuzzy.didYouGetEaten()).toEqual(true);
  });

  test('should get very hungry if 10 seconds pass without feeding', function() {
    jest.advanceTimersByTime(10001);
    expect(fuzzy.didYouGetEaten()).toEqual(true);
  });

  test('should have a food level of ten if it is fed', function() {
    jest.advanceTimersByTime(8001);
    fuzzy.feed();
    expect(fuzzy.foodLevel).toEqual(10);
  });

  test('cannot feed bear after you have been eaten', function() {
    jest.advanceTimersByTime(10001);
    fuzzy.feed();
    expect(fuzzy.foodLevel).toEqual(0);
  });

  test('object should now have a mood level which defaults at 0', () => {
    expect(fuzzy.moodLevel).toEqual(0);
  });

  test('should have mood level of 3 after 3001 milliseconds', () => {
    jest.advanceTimersByTime(3001);
    expect(fuzzy.moodLevel).toEqual(3);
  });

  test('should get very angry if the mood level reaches 10', function() {
    fuzzy.moodLevel = 10;
    expect(fuzzy.isBearAttacking()).toEqual(true);
  });

  test("should have a mood level of zero if bear's back is scratched", () => {
    jest.advanceTimersByTime(9999);
    fuzzy.scratchBack();
    expect(fuzzy.moodLevel).toEqual(0);
  });

  test('count for scratches and feedings should increase each time bear is scratched and fed', () => {
    fuzzy.scratchBack();
    fuzzy.feed();
    expect(fuzzy.scratches).toEqual(1);
    expect(fuzzy.feedings).toEqual(1);
  });

  test('moodLevel should reset to 0 after hibernate function is executed', () => {
    jest.setTimeout(30000);
    fuzzy.moodLevel = 3;
    fuzzy.hibernate();
    expect(fuzzy.moodLevel).toEqual(0);
    });

  test('moodLevel should resume incrementing', () => {
    jest.setTimeout(51001);
    fuzzy.moodLevel = 3;
    fuzzy.hibernate();
    expect(fuzzy.moodLevel).toEqual(0);
    jest.advanceTimersByTime(21000);
    console.log(fuzzy.moodLevel);
    });
});
