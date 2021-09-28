import { Readable, Transform } from 'stream';
const fs = require('fs');
import { wordList } from './words.utils';

export function fibonacci(num, cache) {
  cache = cache || [];

  if (cache[num]) return cache[num];
  if (num <= 2) {
    return 1;
  }
  cache[num] = fibonacci(num - 2, cache) + fibonacci(num - 1, cache);
  return cache[num];
}

export function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function writeAnagramsFile(nbWords, filename, callback) {
  const words = randomWords({ exactly: nbWords, maxLength: 10, minLength: 10 });
  console.log(`Creating anagrams for ${words}`);

  function* buildAnagrams(input) {
    function swap(chars, i, j) {
      const tmp = chars[i];
      chars[i] = chars[j];
      chars[j] = tmp;
    }

    const counter = [],
      chars = input.split(''),
      length = chars.length;
    let i;

    for (i = 0; i < length; i++) {
      counter[i] = 0;
    }

    yield input;
    i = 0;
    while (i < length) {
      if (counter[i] < i) {
        swap(chars, i % 2 === 1 ? counter[i] : 0, i);
        counter[i]++;
        i = 0;
        yield chars.join('');
      } else {
        counter[i] = 0;
        i++;
      }
    }
  }

  function* generate(words) {
    for (const word of words) {
      yield* buildAnagrams(word);
    }
  }

  class AddEOL extends Transform {
    _transform(chunk, enc, done) {
      this.push(`${chunk.toString()}\n`);
      done();
    }
  }

  const start = Date.now();

  const writeStream = fs.createWriteStream(filename);
  const genStream = Readable.from(generate(words));
  genStream
    .pipe(new AddEOL())
    .pipe(writeStream)
    .on('finish', () => {
      console.log(
        `Finished writing to file ${filename} in ${
          Date.now() - start
        } miliseconds`,
      );
      callback();
    });
}

function randomWords(options) {
  function word() {
    if (options && options.maxLength > 1 && options.minLength > 1) {
      return generateWordWithMinAndMaxLength();
    } else {
      return generateRandomWord();
    }
  }

  function generateWordWithMinAndMaxLength() {
    let rightSize = false;
    let wordUsed;
    while (!rightSize) {
      wordUsed = generateRandomWord();
      if (
        wordUsed.length <= options.maxLength &&
        wordUsed.length >= options.minLength
      ) {
        rightSize = true;
      }
    }
    return wordUsed;
  }

  function generateRandomWord() {
    return wordList[randInt(wordList.length)];
  }

  function randInt(lessThan) {
    return Math.floor(Math.random() * lessThan);
  }

  // No arguments = generate one word
  if (typeof options === 'undefined') {
    return word();
  }

  // Just a number = return that many words
  if (typeof options === 'number') {
    options = { exactly: options };
  }

  // options supported: exactly, min, max, join
  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }

  // not a number = one word par string
  if (typeof options.wordsPerString !== 'number') {
    options.wordsPerString = 1;
  }

  //not a function = returns the raw word
  if (typeof options.formatter !== 'function') {
    options.formatter = (word) => word;
  }

  //not a string = separator is a space
  if (typeof options.separator !== 'string') {
    options.separator = ' ';
  }

  const total = options.min + randInt(options.max + 1 - options.min);
  const results = [];
  let token = '';
  let relativeIndex = 0;

  for (let i = 0; i < total * options.wordsPerString; i++) {
    if (relativeIndex === options.wordsPerString - 1) {
      token += options.formatter(word(), relativeIndex);
    } else {
      token += options.formatter(word(), relativeIndex) + options.separator;
    }
    relativeIndex++;
    if ((i + 1) % options.wordsPerString === 0) {
      results.push(token);
      token = '';
      relativeIndex = 0;
    }
  }

  return typeof options.join === 'string'
    ? results.join(options.join)
    : results;
}
