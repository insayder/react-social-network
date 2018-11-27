const helpers = {
  randomNumber: (min, max) => {
    let rand = Math.random() * (max - min + 1) + min;
    return Math.floor(rand);
  },
};
export { helpers };
