interface Grid {
    row: number[];
    targets: number[];
}

interface Puzzle {
    grid: Grid;
    puzzleRow: number[];
}

function randomListWithMaxRepetitios(min: number, max: number, length: number, rep: number): number[] {
  if (max < min) throw new Error("max should be >= min");
  const result: number[] = [];
  const counts = new Map<number, number>();

  while (result.length < length) {
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    const current = counts.get(value) ?? 0;

    if (current < rep) {
      counts.set(value, current + 1);
      result.push(value);
    }
  }
  return result;
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateSolution(): Grid {
    let row = randomListWithMaxRepetitios(1, 50, 16, 2);
    
    let targets: number[] = new Array(16);
    for (let i = 0; i < 15; i+=2) {
        targets[i] = row[i] * row[i + 1];
        targets[i + 1] = row[i] + row[i + 1];
    }
    row.sort((a, b) => a - b);
    targets = shuffleInPlace(targets);
    return { row, targets };
}

function makePuzzle(): Puzzle {
    const grid = generateSolution();
    const puzzleRow = grid.row.slice();
    const mask = Math.floor(Math.random() * (10 - 8 + 1)) + 8;
    const indexesToRemove = randomListWithMaxRepetitios(0, 15, mask, 1);
    for (const index of indexesToRemove) {
        puzzleRow[index] = 0;
    }
    return { grid, puzzleRow };
}

export { generateSolution, makePuzzle };
export type { Grid, Puzzle };

/*function solvePuzzle(puzzle: Puzzle): number[] {
    const solution: number[] = puzzle.puzzleRow.slice();
    const counts = new Map<number, number>();

    

    return solution;
}*/