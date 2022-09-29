const initialToCaps = (wordToConverd: string): string =>
  `${wordToConverd.charAt(0).toUpperCase()}${wordToConverd.slice(1)}`;

export default initialToCaps;
