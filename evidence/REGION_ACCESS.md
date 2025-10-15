# REGION ACCESS — MS-CSV-04
- Timestamp: 2025-10-15 07:45 CEST
- CSV_URL: https://inventory.copart.io/FTPLSTDM/salesdata.cgi?authKey=YPYU91EI

## Exits (IP/CC)
- ru_direct: IP=185.200.243.100, CC=RU
- eu_pl_socks5: IP=154.215.12.44, CC=PL
- us_socks5: IP=166.88.76.82, CC=US

## Status codes
| Target | RU-direct | EU-PL (socks5) | US (socks5) |
|---|---:|---:|---:|
| root | 403 | 403 | 403 |
| download | 403 | 302 | 302 |
| csvurl | 200 | 200 | 200 |

## Raw headers (paths)
- ru_direct: /root/work/vinops.restore/evidence/MS-CSV-04/ru_direct_root.hdr, ru_direct_download.hdr, ru_direct_csvurl.hdr
- eu_pl_socks5: /root/work/vinops.restore/evidence/MS-CSV-04/eu_pl_socks5_root.hdr, eu_pl_socks5_download.hdr, eu_pl_socks5_csvurl.hdr
- us_socks5: /root/work/vinops.restore/evidence/MS-CSV-04/us_socks5_root.hdr, us_socks5_download.hdr, us_socks5_csvurl.hdr

CSV verdict: NOT NEEDED (RU-direct csvurl=200)
Site verdict: NEEDED (RU-direct forbidden; proxy allows access)
