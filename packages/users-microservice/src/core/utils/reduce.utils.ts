import * as fs from 'fs';
import { AnagramCount } from 'zefir-common';
const { pipeline } = require('stream/promises');
const es = require('event-stream');
const reduce = require('stream-reduce');

export async function reduceWords(fileSource): Promise<AnagramCount[]> {
  const anagrams = {};
  const start = Date.now();

  await pipeline(
    fs.createReadStream(fileSource),
    es.split(),
    reduce((acc, word) => {
      if (word !== '') {
        const key = word.split('').sort().join('');
        if (!anagrams[key]) {
          anagrams[key] = 1;
        } else {
          anagrams[key] += 1;
        }
      }
      return anagrams;
    }, {}),
  );

  const anagramsMap = Object.keys(anagrams).map(
    (key) => new AnagramCount(key, +anagrams[key]),
  );

  console.log(
    `Anagrams count for file ${fileSource} ended in ${
      (Date.now() - start) / 1000
    } seconds`,
  );
  return anagramsMap;
}
