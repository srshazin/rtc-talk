/**
 * Formats a Unix timestamp (in seconds) into an adaptive relative time or absolute date string.
 *
 * Examples:
 * - "5 sec"
 * - "10 min"
 * - "10 hour"
 * - "10 day"
 * - "10 Jul, 2026 10:22 PM" (if >= 30 days)
 *
 * @param timestampInSeconds - Unix timestamp in seconds.
 * @returns Formatted time string.
 */
export function formatTimeAgo(timestampInSeconds: number): string {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const diffInSeconds = Math.max(0, nowInSeconds - timestampInSeconds);

  const SECONDS_PER_MINUTE = 60;
  const SECONDS_PER_HOUR = 3600;
  const SECONDS_PER_DAY = 86400;
  const SECONDS_PER_MONTH = 30 * SECONDS_PER_DAY; // ~30 days threshold

  // If older than ~30 days, format as "10 Jul, 2026 10:22 PM"
  if (diffInSeconds >= SECONDS_PER_MONTH) {
    const date = new Date(timestampInSeconds * 1000);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day} ${month}, ${year} ${hours}:${minutes} ${ampm}`;
  }

  // Relative units
  if (diffInSeconds < SECONDS_PER_MINUTE) {
    return `${diffInSeconds} sec`;
  }

  const minutes = Math.floor(diffInSeconds / SECONDS_PER_MINUTE);
  if (diffInSeconds < SECONDS_PER_HOUR) {
    return `${minutes} min`;
  }

  const hours = Math.floor(diffInSeconds / SECONDS_PER_HOUR);
  if (diffInSeconds < SECONDS_PER_DAY) {
    return `${hours} hour`;
  }

  const days = Math.floor(diffInSeconds / SECONDS_PER_DAY);
  return `${days} day`;
}
