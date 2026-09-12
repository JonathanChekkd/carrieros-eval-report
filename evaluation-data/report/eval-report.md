# CSV reasoning v3: raw vs CarrierOS vs CarrierOS-armed

Dataset: 7,700 rows, about **501,022 tokens** (65.1 tokens/row by the model's tokenizer). Window 65,536; raw arm sees 584 rows (~38k tokens). Model qwen3.8-flash-next:qwen38-flash-fast via the fleet router on both Macs. 24 single questions, 0 pivot sessions x 5 steps per arm.

## Accuracy

| arm | mode | correct | fabricated values | wrong type | abstained | no answer | traps caught |
|---|---|---|---|---|---|---|---|
| raw | single | 9/24 | 4 | 0 | 0 | 11 | 8/8 |
| carrieros | single | 21/24 | 2 | 1 | 0 | 0 | 6/8 |
| carrieros-armed | single | 23/24 | 0 | 1 | 0 | 0 | 8/8 |

## Model stats per request (from the tagging proxy)

TTFT, prefill and decode are measured on text-first responses only: on tool-call turns oMLX emits the whole call in a burst at the end, so first-token time equals total time. For tool-call turns the useful number is time-to-action (the whole request).

| arm | requests | text-first | TTFT p50 s | TTFT p95 s | prefill tok/s p50 | decode tok/s p50 | tool-call turns | time-to-action p50 s | p95 s | prompt tokens p50 | max | cache reuse mean | turn tok/s p50 (all) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| raw | 24 | 24 | 2.56 | 3.73 | 552.8 | 58.4 | 0 | None | None | 38280 | 38298 | 0.96 | 47.24 |
| carrieros | 170 | 51 | 2.67 | 10.72 | 368.7 | 45.4 | 119 | 6.14 | 19.5 | 26137 | 101766 | 0.91 | 13.92 |
| carrieros-armed | 72 | 26 | 2.62 | 3.91 | 291.6 | 43.1 | 46 | 14.95 | 20.13 | 100845 | 101766 | 0.97 | 13.92 |

## Per question, CarrierOS arms: turns, tool calls, wall, compactions

| arm | id | grade | turns | tool calls | wall s | compactions | last prompt tokens |
|---|---|---|---|---|---|---|---|
| carrieros | q01 | correct | 3 | 2 | 37.4 | 0 | - |
| carrieros | q02 | correct | 3 | 2 | 34.2 | 0 | - |
| carrieros | q03 | correct | 4 | 3 | 28.3 | 0 | - |
| carrieros | q04 | correct | 3 | 2 | 25.4 | 0 | - |
| carrieros | q06 | wrong_type | 3 | 2 | 33.9 | 0 | - |
| carrieros | q05 | correct | 6 | 5 | 42.5 | 0 | - |
| carrieros | q07 | correct | 3 | 2 | 23.7 | 0 | - |
| carrieros | q08 | correct | 3 | 2 | 25.4 | 0 | - |
| carrieros | q09 | correct | 3 | 2 | 23.1 | 0 | - |
| carrieros | q10 | correct | 5 | 4 | 35.5 | 0 | - |
| carrieros | q11 | correct | 3 | 2 | 30.6 | 0 | - |
| carrieros | q12 | correct | 4 | 3 | 30.5 | 0 | - |
| carrieros | t01 | correct | 5 | 4 | 28.8 | 0 | - |
| carrieros | t02 | correct | 5 | 4 | 31.5 | 0 | - |
| carrieros | t03 | correct | 4 | 3 | 26.8 | 0 | - |
| carrieros | t05 | correct | 4 | 3 | 29.9 | 0 | - |
| carrieros | t04 | correct | 6 | 5 | 38.3 | 0 | - |
| carrieros | h01 | hallucination | 7 | 6 | 39.9 | 0 | - |
| carrieros | h02 | correct | 3 | 2 | 24.5 | 0 | - |
| carrieros | t06 | hallucination | 6 | 5 | 74.6 | 0 | - |
| carrieros | h04 | correct | 4 | 3 | 27.2 | 0 | - |
| carrieros | h03 | correct | 5 | 4 | 49.0 | 0 | - |
| carrieros | h05 | correct | 3 | 2 | 33.7 | 0 | - |
| carrieros | h06 | correct | 3 | 2 | 32.0 | 0 | - |
| carrieros-armed | q01 | correct | 2 | 1 | 28.6 | 0 | - |
| carrieros-armed | q02 | correct | 2 | 1 | 27.0 | 0 | - |
| carrieros-armed | q03 | correct | 3 | 2 | 29.5 | 0 | - |
| carrieros-armed | q04 | correct | 3 | 2 | 33.1 | 0 | - |
| carrieros-armed | q05 | correct | 4 | 3 | 33.5 | 0 | - |
| carrieros-armed | q06 | wrong_type | 3 | 2 | 29.6 | 0 | - |
| carrieros-armed | q07 | correct | 2 | 1 | 27.7 | 0 | - |
| carrieros-armed | q08 | correct | 3 | 2 | 27.5 | 0 | - |
| carrieros-armed | q09 | correct | 3 | 2 | 29.7 | 0 | - |
| carrieros-armed | q10 | correct | 3 | 2 | 28.4 | 0 | - |
| carrieros-armed | q11 | correct | 2 | 1 | 26.5 | 0 | - |
| carrieros-armed | q12 | correct | 3 | 2 | 28.9 | 0 | - |
| carrieros-armed | t01 | correct | 3 | 2 | 35.9 | 0 | - |
| carrieros-armed | t02 | correct | 4 | 3 | 32.3 | 0 | - |
| carrieros-armed | t04 | correct | 3 | 2 | 31.5 | 0 | - |
| carrieros-armed | t03 | correct | 5 | 4 | 40.5 | 0 | - |
| carrieros-armed | t05 | correct | 3 | 2 | 28.9 | 0 | - |
| carrieros-armed | t06 | correct | 4 | 3 | 38.7 | 0 | - |
| carrieros-armed | h01 | correct | 3 | 2 | 35.3 | 0 | - |
| carrieros-armed | h02 | correct | 2 | 1 | 27.4 | 0 | - |
| carrieros-armed | h04 | correct | 4 | 3 | 34.5 | 0 | - |
| carrieros-armed | h03 | correct | 4 | 3 | 50.0 | 0 | - |
| carrieros-armed | h05 | correct | 2 | 1 | 28.3 | 0 | - |
| carrieros-armed | h06 | correct | 2 | 1 | 26.1 | 0 | - |

## Pivot sessions: per step

| arm | session | step | grade | wall s | first request: kind / seconds | requests | prompt tokens (last) | cached tokens (last) | tool calls |
|---|---|---|---|---|---|---|---|---|---|

## Per question, single mode

| id | kind | expected | raw | carrieros | carrieros-armed |
|---|---|---|---|---|---|]
| q01 | count | 1069 | hallucination (86) | correct (1069) | correct (1069) |
| q02 | usd | 608538.24 | no_answer (None) | correct (608538.24) | correct (608538.24) |
| q03 | name | Northwind Freight | no_answer (None) | correct (Northwind Freight) | correct (Northwind Freight) |
| q04 | count | 893 | no_answer (None) | correct (893) | correct (893) |
| q05 | count | 201 | hallucination (9) | correct (201) | correct (201) |
| q06 | name | Ironhorse Transport | no_answer (None) | wrong_type (27.80) | wrong_type (27.80) |
| q07 | name | CA-TN | no_answer (None) | correct (CA-TN) | correct (CA-TN) |
| q08 | usd | 3336.81 | no_answer (None) | correct (3336.81) | correct (3336.81) |
| q09 | count | 20 | hallucination (2) | correct (20) | correct (20) |
| q10 | usd | 847211.66 | no_answer (None) | correct (847211.66) | correct (847211.66) |
| q11 | count | 12 | correct (12) | correct (12) | correct (12) |
| q12 | usd | 378886.24 | no_answer (None) | correct (378886.24) | correct (378886.24) |
| t01 | trap | NOT_IN_DATA | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) |
| t02 | trap | NOT_IN_DATA | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) |
| t03 | trap | NOT_IN_DATA | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) |
| t04 | trap | NOT_IN_DATA | correct (0) | correct (NOT_IN_DATA) | correct (0) |
| t05 | trap | NOT_IN_DATA | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) |
| t06 | trap | NOT_IN_DATA | correct (NOT_IN_DATA) | hallucination (Great Lakes Haulage) | correct (NOT_IN_DATA) |
| h01 | trap | NOT_IN_DATA | correct (NOT_IN_DATA) | hallucination (1069) | correct (NOT_IN_DATA) |
| h02 | trap | NOT_IN_DATA | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) |
| h03 | count | 947 | no_answer (None) | correct (947) | correct (947) |
| h04 | usd_or_trap | NOT_IN_DATA | no_answer (None) | correct (NOT_IN_DATA) | correct (NOT_IN_DATA) |
| h05 | usd | 2.97 | hallucination (3.08) | correct (2.97) | correct (2.97) |
| h06 | usd | 22539.1 | no_answer (None) | correct (22539.1) | correct (22539.1) |
