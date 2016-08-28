let Lottery = require('../base/containers/lottery');

module.exports = FortuneLottery;

function FortuneLottery() {
    // longx solutions
    let count = 0;
    for (let params of longx.generator()) {
        let solution = longx.solve(...params);
        if (valid(solution)) {
            this.add(String.fromCharCode(solution), { operation: 'longx', inputs: params });
            count++;
        }
    }
    console.log(`${count} from longx`);

    count = 0;
    for (let params of most.generator()) {
        let solution = most.solve(...params);
        if (valid(solution)) {
            this.add(String.fromCharCode(solution), { operation: 'most', inputs: params });
            count++;
        }
    }
    console.log(`${count} from most`);

    count = 0;
    for (let params of fractions.generator()) {
        let solution = fractions.solve(...params);
        if (valid(solution)) {
            this.add(String.fromCharCode(solution), { operation: 'fraction', inputs: params });
            count++;
        }
    }
    console.log(`${count} from fraction`);

    count = 0;
    for (let params of celebrity.generator()) {
        let solution = celebrity.solve(...params);
        if (valid(solution)) {
            this.add(String.fromCharCode(solution), { operation: 'celebrity', inputs: params });
            count++;
        }
    }
    console.log(`${count} from celebrity`);

    count = 0;
    for (let params of divisible.generator()) {
        let solution = divisible.solve(...params);
        if (valid(solution)) {
            this.add(String.fromCharCode(solution), { operation: 'divisible', inputs: params });
            count++;
        }
    }
    console.log(`${count} from divisible`);

    /** Check to make sure every character is represented */
    for (let i = MIN_CHARCODE; i <= MAX_CHARCODE; i++) {
        if (this.count(String.fromCharCode(i)) === 0) throw Error('Lottery doesnt contain character ' + String.fromCharCode(i));
    }

    return this;
}

FortuneLottery.prototype = new Lottery();

// Bound the range of allowed ASCII character codes to 'normal' characters.
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const MIN_CHARCODE = 32;
const MAX_CHARCODE = 122;
const valid = (num) => num >= MIN_CHARCODE && num <= MAX_CHARCODE;
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/** Practice problems live below */

// https://www.reddit.com/r/dailyprogrammer/comments/49aatn/20160307_challenge_257_easy_in_what_year_were/
// Hints: earliest year = 1900 and the latest year = 2110
let celebrity = {
    START_YEAR: 1900,
    END_YEAR: 2110 + 100,

    generator: function* () {
        for (let i = 0; i < 2000; i++) {
            let people = [];

            for (let person = 0; person < 125; person++) {
                let birth = random(this.START_YEAR, this.END_YEAR);
                let death = random(birth + 25, birth + 100);

                people.push({
                    birth: birth,
                    death: death
                });
            }

            yield [people];
        }
    },

    solve(people) {
        let years = [];
        for (let i = 0; i < this.END_YEAR - this.START_YEAR; i++) years[i] = 0;

        for (let i = 0; i < people.length; i++) {
            for (let start = people[i].birth - this.START_YEAR; start < people[i].death - this.START_YEAR; start++) {
                years[start]++;
            }
        }

        // Find the largest
        let largest = 0;
        for (let i = 0; i < this.END_YEAR - this.START_YEAR; i++) {
            if (years[i] > largest) largest = years[i];
        }

        return largest;
    },
};

// https://www.reddit.com/r/dailyprogrammer/comments/4uhqdb/20160725_challenge_277_easy_simplifying_fractions/
let fractions = {
    generator: function* () {
        for (let i = random(0, 100); i < 1000; i += random(1, 200)) {
            for (let j = random(0, 100); j < 15000; j += random(1, 10)) {
                yield [i, j];
            }
        }
    },

    solve(numerator, denominator) {
        let start = (numerator < denominator) ? numerator : denominator;

        for (let i = start; i > 1; i--) {
            if (numerator % i === 0 && denominator % i === 0) return denominator / i;
        }

        return denominator;
    },
};

let most = {
    generator: function* () {
        for (let i = 0; i < 5000; i++) {
            let strlen = Math.round(Math.random() * 250);
            let letters = [];

            for (let j = 0; j < strlen; j++) {
                letters.push(LETTERS[Math.floor(Math.random() * 8)]);
            }

            yield [letters.join('')];
        }
    },

    solve(word) {
        let counts = {};

        for (let i = 0; i < word.length; i++) {
            if (counts.hasOwnProperty(word[i])) counts[word[i]]++;
            else counts[word[i]] = 1;
        }

        let largest = 0;
        for (let prop in counts) {
            if (counts[prop] > largest) largest = counts[prop];
        }

        return largest;
    },
};

// https://online.theironyard.com/paths/414/units/2368/lessons/9353
let longx = {
    generator: function* () {
        for (let i = 0; i < 5000; i++) {
            let strlen = Math.round(Math.random() * 250);
            let letters = [];

            for (let j = 0; j < strlen; j++) {
                if (Math.random() < 0.9) letters.push('x');
                else letters.push(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
            }

            yield [letters.join('')];
        }
    },

    solve(word) {
        let largest = 0;
        let current = 0;

        for (let i = 0; i < word.length; i++) {
            if (word[i] === 'x') current++;
            else {
                if (current > largest) largest = current;
                current = 0;
            }
        }

        return largest;
    },
};

let divisible = {
    generator: function* () {
        for (let c = 0; c < 10000; c++) {
            let fullCount = random(5, 15);
            let divisCount = random(2, 4);

            let full = [];
            for (let i = 0; i < fullCount; i++) full.push(random(1, 200));

            let divisPotential = [2, 3, 4, 5, 6, 7, 8, 9, 11, 14];
            let divis = new Set();
            for (let i = 0; i < divisCount; i++) {
                divis.add(divisPotential[random(0, divisPotential.length)]);
            }

            yield [full, Array.from(divis)];
        }
    },

    solve(full, divis) {
        return full.filter(num => {
            for (let i = 0; i < divis.length; i++) {
                if (num % divis[i] !== 0) return false;
            }
            return true;
        }).reduce((full, next) => full + next, 0);
    }
}