#!/usr/bin/env bash
set +e +u
F="$1"
CAN=$(grep -io 'rel="canonical"' "$F" | wc -l | tr -d '[:space:]')
HRL=$(grep -iEo 'rel="alternate"[^>]*hreflang=' "$F" | wc -l | tr -d '[:space:]')
LDJ=$(grep -i 'application/ld+json' "$F" | wc -l | tr -d '[:space:]')
GFT=$(grep -iE 'fonts\.(gstatic|googleapis)\.com' "$F" | wc -l | tr -d '[:space:]')
echo "canonical=$CAN hreflang=$HRL ld+json=$LDJ gfonts=$GFT"
