export function calculateProgress(completed, total) {
  if (!Number.isInteger(completed) || !Number.isInteger(total)) {
    throw new TypeError("completed and total must be integers");
  }

  if (completed < 0 || total <= 0 || completed > total) {
    throw new RangeError("require 0 <= completed <= total and total > 0");
  }

  return Math.round((completed / total) * 100);
}
