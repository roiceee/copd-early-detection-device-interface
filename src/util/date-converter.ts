function dateToDateString(date: Date) {
  //HH:MM:SS:Milliseconds

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const millisecondsString = milliseconds < 100 ? `0${milliseconds}` : `${milliseconds}`;

  return `${hoursString}:${minutesString}:${secondsString}:${millisecondsString}`;
}

export default dateToDateString;