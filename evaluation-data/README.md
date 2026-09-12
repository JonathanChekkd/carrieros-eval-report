# CarrierOS local reasoning evaluation — data bundle (2026-09-12)

A controlled test of one local model answering questions about a large spreadsheet, three ways.
This bundle contains the dataset, the questions, the graded answers, the request telemetry, and the
report. It does NOT contain the Carrier framework/code blocks — only the evaluation data.

## The experiment

- Model: Qwen3.8 Flash-Next (125B MoE, 4-bit) served locally on two MacBook Pro M5 Max.
- Dataset: `data/shipments.csv`, 7,700 synthetic shipment rows (~501,000 tokens), 12 columns.
- Questions: `data/questions.json`, 24 questions with the true answer to each, computed from all rows.
- Three arms, same model, same questions:
  - raw: the model alone, shown a 584-row sample, no tools.
  - carrieros: the model inside CarrierOS with tools, computing over the whole file.
  - carrieros-armed: the same agent with the Carrier framework resident in context on every turn.
- Grading is by code: correct, hallucination (fabricated value), wrong_type, no_answer, abstain.

## Headline result (24 single questions)

| arm             | correct | fabricated | wrong type | no answer | traps caught |
|-----------------|---------|------------|------------|-----------|--------------|
| raw             | 9/24    | 4          | 0          | 11        | 8/9          |
| carrieros       | 21/24   | 2          | 1          | 0         | 7/9          |
| carrieros-armed | 23/24   | 0          | 1          | 0         | 9/9          |

The armed arm fixed exactly the two trap questions the unarmed arm fabricated on (h01, t06),
both of which have no honest answer other than NOT_IN_DATA.

Caveat: one run, 24 questions; the armed/unarmed difference is two questions. Strong signal, not
yet a settled fact — repeat two or three times to confirm.

## Files

- `data/shipments.csv` — the dataset (headers: shipment_id, carrier, origin_state, dest_state,
  equipment, pickup_date, delivery_date, promised_days, weight_lb, miles, rate_usd, status).
- `data/questions.json` — id, question, expected (true answer), kind.
- `report/eval-report.html` — the visual side-by-side report (open in a browser).
- `report/eval-report.md` — the same results as markdown, with per-request speed stats.
- `raw/graded-answers.jsonl` — every graded answer (arm, question, answer, grade, wall time, turns, tools).
- `raw/per-question-comparison.json` — the 24 questions with all three arms' answers side by side.
- `raw/proxy-0.jsonl`, `raw/proxy-1.jsonl` — per-request telemetry: TTFT, prefill/decode tok/s,
  prompt tokens, cached tokens, from the tagging proxy.
