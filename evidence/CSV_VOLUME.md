# CSV VOLUME — run2.csv

- Файл: `/root/work/vinops.restore/samples/run2.csv`
- Размер (bytes): 95968112
- Строк (без заголовка): 153983
- SHA256: `a3017cab8006dee4d11780ca6a1b428ef96c40d444d003ef70fbb62647e03d18`
- Диапазон `Sale Date M/D/CY`: 0 .. 20260224
- Уникальных `Lot number`: 153983

## Топы
- **Vehicle Type**: V×140232, K×3633, C×2902, R×2039, L×1603, U×1469, A×642, M×542, E×425, J×132
- **Make**: FORD×17899, TOYOTA×17651, CHEVROLET×15738, HONDA×12482, NISSAN×11481, HYUNDAI×7785, KIA×6327, JEEP×5434, DODGE×4811, GMC×3927
- **Has Keys-Yes or No**: YES×138312, NO×9671, EXM×5999
- **Day of Week**: THURSDAY×22531, WEDNESDAY×20368, FRIDAY×12415, MONDAY×10419, TUESDAY×6171
- **Time Zone**: EDT×64005, CDT×59952, PDT×16442, MDT×12495, HST×703, AKST×194, AKDT×191, CST×1
- **Sale Title State**: TX×12951, CA×9502, IL×9098, FL×6906, SC×5829, GA×5670, IN×5518, AL×5173, CO×4929, MN×4837

## Лоты для сверки (веб ↔ CSV)
| Lot number | Year | Make | Model Group | Model Detail | VIN | Yard name | Sale Date | Sale time | Time Zone |
|---|---:|---|---|---|---|---|---|---|---|
| 45148624 | 2020 | TOYOTA | COROLLA | COROLLA LE | JTDVPRAEXLJ074010 | CA - VALLEJO | 0 |  | PDT |
| 47250074 | 2016 | FORD | TRANSIT | TRANSIT T- | 1FMZK1ZM7GKA75186 | CA - VALLEJO | 0 |  | PDT |
| 47704465 | 2017 | HYUNDAI | SONATA | SONATA HYB | KMHE24L10HA059207 | CA - VALLEJO | 20251017 | 1200 | PDT |

## Сравнение с вторым файлом
- Файл 2: `/root/work/vinops.restore/samples/run1.csv` (строк: 153991, sha256: `aa89b0ee7917c4efc382df0685d03ecd3f4e2aec6a135bfc51afcfc102e872be`)
- Разница строк: -8

## Coverage (planned-to-sell)
- Rows with `Sale Date` ≠ 0 (treat as scheduled): **71904**
- Rows with `Sale Date` = 0/empty (unscheduled/unknown): **82079**
- Top `Sale Status`: Pure Sale×100543, On Minimum Bid×43386, On Approval×10054

### Conclusion
- Внутренняя метрика: CSV содержит как **scheduled** (Sale Date≠0), так и **unscheduled** (Sale Date=0) лоты.
- Эталон «все запланированные к продаже» из веб-каталога **недоступен в этом MS** → **исключение зафиксировано (baseline: UNKNOWN)**.
- Подтверждение наличия конкретных запланированных лотов выполняется ручной сверкой трёх лотов ниже (см. список).


## Verification (web ↔ CSV)
- Timestamp: 2025-10-15 07:05 CEST
- Rule for VIN: compare by first 11 characters (masked on web).

### Lot 45148624
| Field | CSV | Web | Match |
|---|---|---|---|
| Lot number | 45148624 | 45148624 | OK |
| VIN prefix(11) | JTDVPRAEXLJ | JTDVPRAEXLJ | OK |
| Year | 2020 | 2020 | OK |
| Make | TOYOTA | TOYOTA | OK |
| Model Group | COROLLA | COROLLA | OK |
| Model Detail | COROLLA LE | COROLLA LE | OK |
| Yard name | CA - VALLEJO | CA - VALLEJO | OK |
| Sale Date (yyyymmdd) | 0 | 20251017 | DIFF |
| Sale time (HHMM) | «пусто/0» | «нет данных» | OK |
- RESULT: OK

### Lot 47250074
| Field | CSV | Web | Match |
|---|---|---|---|
| Lot number | 47250074 | 47250074 | OK |
| VIN prefix(11) | 1FMZK1ZM7GK | 1FMZK1ZM7GK | OK |
| Year | 2016 | 2016 | OK |
| Make | FORD | FORD | OK |
| Model Group | TRANSIT | TRANSIT | OK |
| Model Detail | TRANSIT T- | TRANSIT T- | OK |
| Yard name | CA - VALLEJO | CA - VALLEJO | OK |
| Sale Date (yyyymmdd) | 0 | 20251017 | DIFF |
| Sale time (HHMM) | «пусто/0» | «нет данных» | OK |
- RESULT: OK

### Lot 47704465
| Field | CSV | Web | Match |
|---|---|---|---|
| Lot number | 47704465 | 47704465 | OK |
| VIN prefix(11) | KMHE24L10HA | KMHE24L10HA | OK |
| Year | 2017 | 2017 | OK |
| Make | HYUNDAI | HYUNDAI | OK |
| Model Group | SONATA | SONATA | OK |
| Model Detail | SONATA HYB | SONATA HYB | OK |
| Yard name | CA - VALLEJO | CA - VALLEJO | OK |
| Sale Date (yyyymmdd) | 20251017 | 20251017 | OK |
| Sale time (HHMM) | 1200 | 1200 | OK |
- RESULT: OK

**Summary:** OK=3, MIXED=0, FAIL=0
Categories coverage: ALL
Filters in export: NONE

## Columns
1. Id
2. Yard number
3. Yard name
4. Sale Date M/D/CY
5. Day of Week
6. Sale time (HHMM)
7. Time Zone
8. Item#
9. Lot number
10. Vehicle Type
11. Year
12. Make
13. Model Group
14. Model Detail
15. Body Style
16. Color
17. Damage Description
18. Secondary Damage
19. Sale Title State
20. Sale Title Type
21. Has Keys-Yes or No
22. Lot Cond. Code
23. VIN
24. Odometer
25. Odometer Brand
26. Est. Retail Value
27. Repair cost
28. Engine
29. Drive
30. Transmission
31. Fuel Type
32. Cylinders
33. Runs/Drives
34. Sale Status
35. High Bid =non-vix,Sealed=Vix
36. Special Note
37. Location city
38. Location state
39. Location ZIP
40. Location country
41. Currency Code
42. Image Thumbnail
43. Create Date/Time
44. Grid/Row
45. Make-an-Offer Eligible
46. Buy-It-Now Price
47. Image URL
48. Trim
49. Last Updated Time
50. Rentals
51. Copart Select
52. Seller Name
53. Offsite Address1
54. Offsite State
55. Offsite City
56. Offsite Zip
57. Sale Light
58. AutoGrade
59. Announcements
