var quote = require('./quote.js').quote;
var rewrap = require('./quote.js').rewrap;


//my awesome test framework
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
		process.stdout.write('    ----> expected | ' + ref.replace(/ /g, '·') + '\n');
		process.stdout.write('    ----> got      | ' + what.replace(/ /g, '·') + '\n');
	}
	process.stdout.write('\n');
};



//quote tests
test('simple short text',
	quote('simple short text'),
	'> simple short text'
);

test('an already quoted line',
	quote('> simple short text'),
	'>> simple short text'
);

test('a line longer than 75 chars with no spaces',
	quote('12345678901234567890123456789012345678901234567890123456789012345678901234567890'),
	'> 12345678901234567890123456789012345678901234567890123456789012345678901234567890'
);

test('a line longer than 75 chars with spaces',
	quote('1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890', 75),
	'> 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890\n> 1234567890 1234567890'
);

test('three lines with a hard break',
	quote('1234567890\n1234567890\n1234567890'),
	'> 1234567890\n> 1234567890\n> 1234567890'
);

test('three lines, one long line, two with a hard break in between',
	quote('1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890\n' +
		'1234567890 1234567890 1234567890 1234567890\n' +
		'1234567890 1234567890 1234567890 1234567890\n'),
	'> 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890\n' +
	'> 1234567890 1234567890\n' +
	'> 1234567890 1234567890 1234567890 1234567890\n' +
	'> 1234567890 1234567890 1234567890 1234567890\n'
);

test('three lines, one long line with a soft breake, two with a hard break in between',
	quote('1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 \n1234567890 1234567890\n' +
		'1234567890 1234567890 1234567890 1234567890\n' +
		'1234567890 1234567890 1234567890 1234567890\n'),
	'> 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890\n' +
	'> 1234567890 1234567890\n' +
	'> 1234567890 1234567890 1234567890 1234567890\n' +
	'> 1234567890 1234567890 1234567890 1234567890\n'
);



var mail =
	"Il 15/04/15 12:39, Fabri / Joker197cinque ha scritto:\n" +
	"> minchius_maximus wrote on 15/04/2015 :\n" +
	">\n" +
	">> (finito il main e due dlc su tre)\n" +
	">\n" +
	"> Abbracciamocih.\n" +
	">\n" +
	"\n" +
	"sisi, avevo letto che anche tu ti eri fermato al secondo...\n" +
	"ma, dopo aver fatto i primi due mi ero dedicato ad un sano e buon PVP \n" +
	"nella covenant del drago... quante mazzate, ma divertente...\n" +
	"\n" +
	"sto scholar mi sta facendo calare l'hype...\n" +
	"\n" +
	"-- \n" +
	"minchius_maximus";

var correctly_quoted =
	"> Il 15/04/15 12:39, Fabri / Joker197cinque ha scritto:\n" +
	">> minchius_maximus wrote on 15/04/2015 :\n" +
	">>\n" +
	">>> (finito il main e due dlc su tre)\n" +
	">>\n" +
	">> Abbracciamocih.\n" +
	">>\n" +
	"> \n" +
	"> sisi, avevo letto che anche tu ti eri fermato al secondo...\n" +
	"> ma, dopo aver fatto i primi due mi ero dedicato ad un sano e buon PVP\n" +
	"> nella covenant del drago... quante mazzate, ma divertente...\n" +
	"> \n" +
	"> sto scholar mi sta facendo calare l'hype...\n";

test('a long real email with a signature',
	quote(mail),
	correctly_quoted
);




//rewrap tests
test('rewrap long text',
		rewrap('1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 ', 75, ''),
		'1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 \n1234567890 1234567890 '
	);

var mailrewrap =
	"Il 15/04/15 12:39, Fabri / Joker197cinque ha scritto:\n" +
	"> minchius_maximus wrote on 15/04/2015 :\n" +
	">\n" +
	">> (finito il main e due dlc su tre)\n" +
	">\n" +
	"> Abbracciamocih.\n" +
	">\n" +
	"\n" +
	"sisi, avevo letto che anche tu ti eri fermato al secondo...\n" +
	"ma, dopo aver fatto i primi due mi ero dedicato ad un sano e buon PVP nella covenant del drago... quante mazzate, ma divertente...\n" +
	"\n" +
	"sto scholar mi sta facendo calare l'hype...\n" +
	"\n" +
	"-- \n" +
	"minchius_maximus";

test('rewrap long text with something quoted before',
		rewrap(mailrewrap),
		mail
	);
