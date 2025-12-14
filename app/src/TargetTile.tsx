import { Button, Card, InputNumber, Typography } from "antd";

const { Text } = Typography;

export type Op = "+" | "×";

export type TargetWork = {
  a: number | null;
  op: Op;
  b: number | null;
};

type Props = {
  index: number;       
  target: number;      
  value: TargetWork;    
  onChange: (next: TargetWork) => void;
  min?: number;
  max?: number;
};

const OLIVE_BG = "#F3F7E8";
const OLIVE_BORDER = "#008259";
const OLIVE_BTN = "#7E9450";

function clampInt(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

export default function TargetTile({
  index,
  target,
  value,
  onChange,
  min = 1,
  max = 50,
}: Props) {
  const done = value.a != null && value.b != null;

  return (
    <Card
      size="small"
      hoverable
      style={{
        borderRadius: 14,
        borderColor: done ? OLIVE_BORDER : undefined,
        background: done ? OLIVE_BG : undefined,
        transition: "background-color 180ms ease, border-color 180ms ease",
      }}
      styles={{ body: { padding: 12 } }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Text type="secondary">#{index + 1}</Text>

        <div
          style={{
            padding: "2px 10px",
            borderRadius: 999,
            border: `1px solid ${done ? OLIVE_BORDER : "rgba(0,0,0,0.10)"}`,
            background: done ? "#FFFFFFAA" : "rgba(0,0,0,0.02)",
          }}
        >
          <Text strong style={{ fontSize: 20 }}>{target}</Text>
        </div>
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
        <InputNumber
          style={{ width: "100%" }}
          min={min}
          max={max}
          placeholder="A"
          value={value.a}
          onChange={(v) =>
            onChange({
              ...value,
              a: v == null ? null : clampInt(v, min, max),
            })
          }
        />

        <Button
          onClick={() => onChange({ ...value, op: value.op === "+" ? "×" : "+" })}
          aria-label="Cambiar operador"
          style={{
            minWidth: 48,
            borderRadius: 10,
            fontWeight: 700,
            background: done ? OLIVE_BTN : undefined,
            borderColor: done ? OLIVE_BTN : undefined,
            color: done ? "#fff" : undefined,
            transition: "background-color 180ms ease, border-color 180ms ease, color 180ms ease",
          }}
        >
          {value.op}
        </Button>

        <InputNumber
          style={{ width: "100%" }}
          min={min}
          max={max}
          placeholder="B"
          value={value.b}
          onChange={(v) =>
            onChange({
              ...value,
              b: v == null ? null : clampInt(v, min, max),
            })
          }
        />
      </div>
    </Card>
  );
}