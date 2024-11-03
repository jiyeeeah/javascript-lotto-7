/* eslint-disable no-new */
import { Random } from "@woowacourse/mission-utils";
import LottoMachine from "../src/LottoMachine.js";
import Lotto from "../src/Lotto.js";
import BonusNumber from "../src/BonusNumber.js";

const mockRandoms = (numbers) => {
  Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => acc.mockReturnValueOnce(number), Random.pickUniqueNumbersInRange);
};

describe("로또 기계 클래스 테스트", () => {
  test("구입 금액이 숫자가 아니면 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine("hi");
    }).toThrow("[ERROR]");
  });

  test("구입 금액이 로또 금액으로 나뉘어 떨어지지 않으면 예외가 발생한다.", () => {
    expect(() => {
      new LottoMachine("1009");
    }).toThrow("[ERROR]");
  });

  test("구입 금액에 따라 구매한 티켓 개수와 발행한 로또를 출력한다.", () => {
    const input = "8000";

    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);
    const lottoMachine = new LottoMachine(input);

    expect(lottoMachine.getTicketAmountString()).toBe("8개를 구매했습니다.");
    expect(lottoMachine.getTicketsNumberString()).toBe(`[8, 21, 23, 41, 42, 43]
[3, 5, 11, 16, 32, 38]
[7, 11, 16, 35, 36, 44]
[1, 8, 11, 31, 41, 42]
[13, 14, 16, 38, 42, 45]
[7, 11, 30, 40, 42, 43]
[2, 13, 22, 32, 38, 45]
[1, 3, 5, 14, 22, 45]`);
  });

  test("당첨 내역을 출력한다.", () => {
    const input = "8000";

    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);
    const lottoMachine = new LottoMachine(input);
    const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = new BonusNumber(winningLotto, 7);

    expect(lottoMachine.getWinningLottery({ winningLotto, bonusNumber }))
      .toBe(`3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개`);
  });
});
