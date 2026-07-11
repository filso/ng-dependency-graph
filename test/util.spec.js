describe('util', () => {
  let util;

  beforeEach(window.module('ngDependencyGraph'));
  beforeEach(inject(function (_util_) {
    util = _util_;
  }));

  describe('wildcardToRegexp()', () => {
    it('matches exact names', () => {
      const re = util.wildcardToRegexp('ngLocale');
      expect(re.test('ngLocale')).toBe(true);
      expect(re.test('ngLocaleX')).toBe(false);
      expect(re.test('xngLocale')).toBe(false);
    });

    it('expands * wildcards', () => {
      const re = util.wildcardToRegexp('ui.*');
      expect(re.test('ui.router')).toBe(true);
      expect(re.test('ui.bootstrap')).toBe(true);
      expect(re.test('myui.router')).toBe(false);
    });

    it('supports wildcards on both ends', () => {
      const re = util.wildcardToRegexp('*ng-temp*');
      expect(re.test('my-ng-template')).toBe(true);
      expect(re.test('other')).toBe(false);
    });
  });

  describe('extractMasks()', () => {
    it('splits on commas and semicolons, trimming whitespace', () => {
      const masks = util.extractMasks('ngLocale, ui.*; *.html');
      expect(masks).toHaveLength(3);
      expect(masks[0].test('ngLocale')).toBe(true);
      expect(masks[1].test('ui.router')).toBe(true);
      expect(masks[2].test('template.html')).toBe(true);
    });
  });

  describe('uniqueId()', () => {
    it('returns increasing unique ids', () => {
      const a = util.uniqueId();
      const b = util.uniqueId();
      expect(b).not.toBe(a);
    });
  });

  describe('debounce()', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('invokes the function once after the wait', () => {
      const fn = vi.fn();
      const debounced = util.debounce(fn, 100);
      debounced();
      debounced();
      debounced();
      expect(fn).not.toHaveBeenCalled();
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle()', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('fires immediately, then at most once per wait period', () => {
      const fn = vi.fn();
      const throttled = util.throttle(fn, 100);
      throttled();
      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(2); // trailing call
    });
  });
});
