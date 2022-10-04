const maxTimeScore = 5000;

const getScoreRatio = (totalTime: number, maxScore = maxTimeScore): number =>
  Math.floor(maxScore / totalTime);

export default getScoreRatio;
