// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends(...args: any[]) => void>(
  fn: T,
  delay = 300,
) {
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = (...args: Parameters<T>) => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }

    timeout.value = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  onUnmounted(() => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
  });

  return debouncedFn;
}