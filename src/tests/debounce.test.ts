import debounce from "../core/ejecution/debounce";

describe("debounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("basic debouncing", () => {
    it("should debounce a function call", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should call function only once after delay", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 200);

      debouncedFn();
      jest.advanceTimersByTime(50);
      debouncedFn();
      jest.advanceTimersByTime(50);
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(200);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("default delay", () => {
    it("should use default delay of 250ms", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn);

      debouncedFn();

      jest.advanceTimersByTime(249);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should work without explicit delay parameter", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn);

      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(250);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("timer reset", () => {
    it("should reset the timer on subsequent calls", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      jest.advanceTimersByTime(50);

      debouncedFn();
      jest.advanceTimersByTime(50);

      debouncedFn();
      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should not call function if continuously called within delay", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      for (let i = 0; i < 10; i++) {
        debouncedFn();
        jest.advanceTimersByTime(50);
      }

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("multiple debounced functions", () => {
    it("should handle multiple independent debounced functions", () => {
      const mockFn1 = jest.fn();
      const mockFn2 = jest.fn();
      const debouncedFn1 = debounce(mockFn1, 100);
      const debouncedFn2 = debounce(mockFn2, 200);

      debouncedFn1();
      debouncedFn2();

      jest.advanceTimersByTime(100);
      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });
  });

  describe("function execution", () => {
    it("should execute the debounced function", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalled();
    });

    it("should execute only once for multiple calls", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("should handle zero delay", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 0);

      debouncedFn();

      jest.advanceTimersByTime(0);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should handle very large delays", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 10000);

      debouncedFn();

      jest.advanceTimersByTime(9999);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("should handle rapid successive calls", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      for (let i = 0; i < 100; i++) {
        debouncedFn();
      }

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("cleanup", () => {
    it("should clear previous timeout on new call", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      const pendingTimers1 = jest.getTimerCount();

      debouncedFn();
      const pendingTimers2 = jest.getTimerCount();

      expect(pendingTimers1).toBe(pendingTimers2);
    });
  });
});
