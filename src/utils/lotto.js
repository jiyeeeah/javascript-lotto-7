import { Random } from "@woowacourse/mission-utils";
import { LOTTO_RULE, LOTTO_WIN_RANK } from "../constants/rule.js";

export const buyOneLotto = () =>
  Random.pickUniqueNumbersInRange(LOTTO_RULE.MIN_NUMBER, LOTTO_RULE.MAX_NUMBER, 6);

export const buyMultipleTickets = (amount) =>
  Array.from({ length: amount }, () => buyOneLotto().sort((a, b) => a - b));

export const getRankType = (matchCount, isBonusMatch) => {
  const [rankType] = Object.entries(LOTTO_WIN_RANK)
    .filter(
      ([, details]) => details.matchCount === matchCount && details.requiresBonus === isBonusMatch,
    )
    .map(([rank]) => rank);

  return rankType;
};

export const createWinningRankCount = () =>
  Object.keys(LOTTO_WIN_RANK).reduce((acc, rank) => {
    acc[rank] = 0;
    return acc;
  }, {});

export const parseWinningLottoString = (
  winningRankCount,
) => `${LOTTO_WIN_RANK.threeMatch.string} (${LOTTO_WIN_RANK.threeMatch.prize.toLocaleString()}원) - ${winningRankCount.threeMatch}개
${LOTTO_WIN_RANK.fourMatch.string} (${LOTTO_WIN_RANK.fourMatch.prize.toLocaleString()}원) - ${winningRankCount.fourMatch}개
${LOTTO_WIN_RANK.fiveMatch.string} (${LOTTO_WIN_RANK.fiveMatch.prize.toLocaleString()}원) - ${winningRankCount.fiveMatch}개
${LOTTO_WIN_RANK.fiveMatchAndBonus.string} (${LOTTO_WIN_RANK.fiveMatchAndBonus.prize.toLocaleString()}원) - ${winningRankCount.fiveMatchAndBonus}개
${LOTTO_WIN_RANK.allMatch.string} (${LOTTO_WIN_RANK.allMatch.prize.toLocaleString()}원) - ${winningRankCount.allMatch}개`;

export const calculateProfit = (winningRankCount) =>
  winningRankCount.threeMatch * LOTTO_WIN_RANK.threeMatch.prize +
  winningRankCount.fourMatch * LOTTO_WIN_RANK.fourMatch.prize +
  winningRankCount.fiveMatch * LOTTO_WIN_RANK.fiveMatch.prize +
  winningRankCount.fiveMatchAndBonus * LOTTO_WIN_RANK.fiveMatchAndBonus.prize +
  winningRankCount.allMatch * LOTTO_WIN_RANK.allMatch.prize;
