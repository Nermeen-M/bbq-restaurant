export function validateNotEmpty(value) {
  let result = true;

  if (value.trim().length === 0) result = false;

  return result;
}
