const maxTimeScore = 5000;

const getScoreRatio = (totalTime: number): number =>
  Math.floor(maxTimeScore / totalTime);

export default getScoreRatio;
