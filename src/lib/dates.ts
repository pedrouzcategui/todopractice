/**
 * Default config for long date format in en-US locale.
 */
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

/**
 * Formats given date based on the `dateFormatter` config.
 */
export function formatDate(date: Date) {
  return dateFormatter.format(date);
}
