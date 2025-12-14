import { useState } from "react";
import { Button, Divider, InputNumber, Space, Typography } from "antd";
import { Puzzle, makePuzzle } from "./algorithm";
import "./page.css";
import TargetTile, { TargetWork } from "./TargetTile";

function clampInt(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

const { Title, Text } = Typography;




export default function TetonorBoard() {
  const [puzzle, setPuzzle] = useState<Puzzle>(() => makePuzzle());
  const [canEditRowAt, setCanEditRowAt] = useState<boolean[]>(() =>
    puzzle.puzzleRow.map((value) => value === 0)
  );
  const [targetWork, setTargetWork] = useState<TargetWork[]>(
    () => Array.from({ length: 16 }, () => ({ a: null, op: "+", b: null }))
  );
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const targets = puzzle.grid.targets;

  function newGame() {
    const nextPuzzle = makePuzzle();
    setPuzzle(nextPuzzle);
    setCanEditRowAt(nextPuzzle.puzzleRow.map((value) => value === 0));
    setTargetWork(Array.from({ length: 16 }, () => ({ a: null, op: "+", b: null })));
    setShowSolution(false);
  }

  function setRowValue(i: number, v: number | null) {
    if (!canEditRowAt[i]) return;
    const next = puzzle.puzzleRow.slice();
    next[i] = v == null ? 0 : clampInt(v, 1, 50);
    setPuzzle({ ...puzzle, puzzleRow: next });
  }

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }} align="center">
        <Title level={3} style={{ margin: 0 }}>Tetonor</Title>
        <Space>
          <Button onClick={newGame}>Nueva partida</Button>
          <Button 
            type="primary"
            style={{ backgroundColor: "#008259", borderColor: "#008259" }}
            onClick={() => setShowSolution(!showSolution)}
            >Verificar
          </Button>
        </Space>
      </Space>

      <Divider />

      <Text style = {{fontSize: 20}}>
        Debajo de cada tarjeta: elegí dos números y el operador (+ / ×).
      </Text>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
        {targets.map((t, i) => (
            <TargetTile
            key={i}
            index={i}
            target={t}
            value={targetWork[i]}
            onChange={(next) =>
                setTargetWork((prev) => {
                const copy = prev.slice();
                copy[i] = next;
                return copy;
                })
            }
            min={1}
            max={50}
            />
        ))}
      </div>


      <Divider />

      <Text style = {{fontSize: 20}}>
        Fila (16). Los valores visibles no se pueden editar; completá los huecos.
      </Text>

      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "repeat(16, minmax(0, 1fr))",
          gap: 8,
          alignItems: "center",
        }}
      >
        {puzzle.puzzleRow.map((v, i) => {
          const disabled = !canEditRowAt[i];
          return (
            <div key={i} style={{ textAlign: "center", fontWeight: "bold"}}>
              <InputNumber
                size="middle"
                className="puzzle-row-input"
                style={{ width: "100%" }}
                min={1}
                max={50}
                value={v === 0 ? null : v}
                placeholder={v === 0 ? "?" : undefined}
                disabled={disabled}
                onChange={(val) => setRowValue(i, val)}
              />
              <div style={{ marginTop: 4, fontSize: 11, color: "rgba(0,0,0,0.45)", fontWeight: "bold" }}>
                {i + 1}
              </div>
            </div>
          );
        })}
      </div>

      <Divider />

      {showSolution && (
        <div>
            <Space style={{ marginTop: 12, marginBottom: 8, justifyContent: "space-between", width: "100%" }}>
                <Text style={{ fontSize: 20, margin: 0 }}>Solución</Text>
                <Button onClick={() => setShowSolution((prev) => !prev)}>
                {"Ocultar solución"}
                </Button>
            </Space>

            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(16, minmax(0, 1fr))",
                gap: 8,
                alignItems: "center",
            }}
            >
            {puzzle.grid.row.map((value, i) => (
                <div key={i} style={{ textAlign: "center", fontWeight: "bold" }}>
                <div
                    style={{
                    width: "100%",
                    border: "1px solid rgba(0,0,0,0.12)",
                    borderRadius: 6,
                    padding: "4px 0",
                    minHeight: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.02)",
                    }}
                >
                    {value}
                </div>
                <div style={{ marginTop: 4, fontSize: 11, color: "rgba(0,0,0,0.45)", fontWeight: "bold" }}>
                    {i + 1}
                </div>
                </div>
            ))}
            </div>
        </div> 
      )}
    </div>
  );
}
