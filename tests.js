var quote = require('./quote.js');

var test = function(name, what, ref, c) {
	process.stdout.write(name);

	if (typeof(c) !== 'boolean') {
		c = true;
	}

	if (typeof(what) === 'function') {
		what = what();
	}
	if (typeof(ref) === 'function') {
		ref = ref();
	}

	if ((what === ref) === c) {
		process.stdout.write(' ✓');
	} else {
		process.stdout.write(' ⛝\n');
		process.stdout.write('    ----> expected | ' + ref + '\n');
		process.stdout.write('    ----> got      | ' + what + '\n');
	}
	process.stdout.write('\n');
};


test('simple short text',
	quote('simple short text'),
	'> simple short text'
);

test('an already quoted line',
	quote('> simple short text'),
	'> simple short text'
);

test('a line longer than 75 chars with no spaces',
	quote('12345678901234567890123456789012345678901234567890123456789012345678901234567890'),
	'> 12345678901234567890123456789012345678901234567890123456789012345678901234567890'
);

test('a line longer than 75 chars with spaces',
	quote('1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890', 75),
	'> 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 \n> 1234567890 1234567890'
);

test('three lines with a hard break',
	quote('1234567890\n1234567890\n1234567890'),
	'> 1234567890\n> 1234567890\n> 1234567890'
);

test('three lines, one long line, two with a hard break in between',
	quote('1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890\n' +
		'1234567890 1234567890 1234567890 1234567890\n' +
		'1234567890 1234567890 1234567890 1234567890\n'),
	'> 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 \n' +
	'> 1234567890 1234567890\n' +
	'> 1234567890 1234567890 1234567890 1234567890\n' +
	'> 1234567890 1234567890 1234567890 1234567890\n' +
	'> '
);
