/**
 * Formats a date string into "Month DD, YYYY" format
 * using the Intl.DateTimeFormat API.
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);
};

export default formatDate;
