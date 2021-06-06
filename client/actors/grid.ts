import { Scene, Vector } from "excalibur";
import { ScreenInformation } from "../entities/screen-information";
import { GridCell } from "./grid-cell";
import { GridLine } from "./grid-line";

export class Grid {
  private verticalLines: GridLine[] = [];
  private horizontalLines: GridLine[] = [];
  private cells: GridCell[][] = [];
  private readonly gridSize = 20;

  public init(scene: Scene, screen: ScreenInformation) {
    const cellSize = screen.screenSize / this.gridSize;

    for (let line = 0; line < this.gridSize + 1; line++) {
      this.verticalLines.push(
        new GridLine({
          height: screen.screenSize,
          width: screen.screenSize / 500,
          x: screen.startingX + line * cellSize,
          y: screen.halfY,
        }),
      );
      this.horizontalLines.push(
        new GridLine({
          width: screen.screenSize,
          height: screen.screenSize / 500,
          x: screen.halfX,
          y: screen.startingY + line * cellSize,
        }),
      );
    }

    for (let rowLine = 0; rowLine < this.gridSize; rowLine++) {
      const row = [];
      for (let colLine = 0; colLine < this.gridSize; colLine++) {
        row.push(
          new GridCell(
            cellSize,
            new Vector(
              screen.startingX + rowLine * cellSize + cellSize / 2,
              screen.startingY + colLine * cellSize + cellSize / 2,
            ),
          ),
        );
      }
      this.cells.push(row);
    }

    this.verticalLines.forEach((line) => scene.add(line));
    this.horizontalLines.forEach((line) => scene.add(line));
    this.cells.forEach((row) => {
      row.forEach((cell) => scene.add(cell));
    });
  }

  public update(players: { x: number; y: number; id: string }[]) {
    this.cells.forEach((cellRow: GridCell[], rowIndex: number) => {
      cellRow.forEach((cell: GridCell, colIndex: number) => {
        cell.setEmpty();

        for (const player of players) {
          if (player.x === rowIndex && player.y === colIndex) {
            cell.setSnake()

            return;
          }
        }
      });
    });
  }

  public remove(scene: Scene) {
    this.verticalLines.forEach((line) => scene.remove(line));
    this.horizontalLines.forEach((line) => scene.remove(line));
  }
}