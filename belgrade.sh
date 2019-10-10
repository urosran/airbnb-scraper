#!/bin/sh

# classic for loop synthax {START..END..INCREMENT}

# loop over prices from 0 to 100 in increments of 2
for price_max in {2..100..2}; do
   price_min = $price_max - 2
   node link_parsing.js -price_min $price_min -price_max $price_max -city "belgrade" -checkin "2020-01-20" -checkout "2020-01-26"
done
