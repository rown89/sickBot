const yellow = (word: string) => {
  return " `HTTP` " + word + "`";
};
const cyan = (word: string) => {
  return " `YAML` " + word + "`";
};
const red = (word: string) => {
  return " `excel` " + word + "`";
};
const blue = (word: string) => {
  return " `Elm` " + word + "`";
};
const orange = (word: string) => {
  return " `ARM` " + word + "`";
};
const green = (word: string) => {
  return " `CSS` " + word + "`";
};

export const color = (word: string, color: string) => {
  switch (color) {
    case "yellow":
      yellow(word);
      break;
    case "cyan":
      cyan(word);
      break;
    case "red":
      red(word);
      break;
    case "blue":
      blue(word);
      break;
    case "orange":
      orange(word);
      break;
    case "green":
      green(word);
      break;
    default:
      break;
  }
};
