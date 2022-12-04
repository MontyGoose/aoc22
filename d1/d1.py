import io
import functools

with io.open('sample.txt', 'r', encoding='utf-8') as f:
  data = f.read().splitlines()

functools.reduce(function(pv, ))