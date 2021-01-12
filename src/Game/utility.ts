import * as Types from "./types";

function calculateAvailableVictoties(
  GRID_DIMENSION: number
): Array<Array<number>> {
  return [
    // horizonzal
    ...Array.from({
      length: GRID_DIMENSION * GRID_DIMENSION - GRID_DIMENSION + 1
    })
      .map((e, i) => i)
      .filter((e) => !(e % GRID_DIMENSION))
      .map((n) => Array.from({ length: GRID_DIMENSION }).map((e, i) => n + i)),
    // vertical
    ...Array.from({ length: GRID_DIMENSION })
      .map((e, i) => i)
      .map((n) =>
        Array.from({ length: GRID_DIMENSION }).map(
          (e, i) => n + GRID_DIMENSION * i
        )
      ),
    // oblique
    Array.from({ length: GRID_DIMENSION }).map(
      (e, i) => (GRID_DIMENSION - 1) * (i + 1)
    ),
    Array.from({ length: GRID_DIMENSION }).map(
      (e, i) => GRID_DIMENSION * i + (i > 0 ? i : 0)
    )
  ];
}

export function isWinner({
  selectedItems,
  GRID_DIMENSION
}: Types.IWinnerConfig): boolean {
  const availableVictories = calculateAvailableVictoties(GRID_DIMENSION);

  return availableVictories.find((availableVictory) => {
    let length = 0;
    availableVictory.forEach((e) => {
      if (selectedItems.includes(e)) {
        length = length + 1;
      }
    });
    return length === GRID_DIMENSION;
  })
    ? true
    : false;
}
