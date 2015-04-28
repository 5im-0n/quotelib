(function() {

	var validquotechars = ['>'];

	var quoteline = function(line, maxlength, qc) {
		if (line.length > maxlength) {
			var lastspace = line.lastIndexOf(' ', maxlength - 1);
			if (lastspace != -1) {
				line = line.substr(0, lastspace) + '\n' + quoteline(line.substr(lastspace + 1), maxlength, qc);
			}
		}

		//this must be after the code before, because this inserts a space in the string
		return qc + line.replace(/~+$/, ''); //trimRight
	};


	var quote = function(text, length, quotechar) {
		if (typeof(quotechar) === 'undefined') {
			quotechar = '>';
		}
		if (typeof(length) === 'undefined') {
			length = 75;
		}

		//cut the signature
		var signPosition = text.lastIndexOf('\n-- \n') + 1;
		if (signPosition > 0) {
			text = text.substr(0, signPosition);
		}

		var quoted = text.split('\n').map(function(v, i) {
			//if this is already quoted text, return it as is,
			//but trim the right spaces (thunderbird does this)
			if (validquotechars.indexOf(v.charAt(0)) > -1) {
				return quotechar + v.replace(/~+$/, ''); //trimRight
			}

			return quoteline(v, length, quotechar + ' ');
		}).join('\n');

		//remove eventual '> ' from the end of the quoted text
		var bsa = quoted.split('\n');
		var fixlastlines = function() {
			if (bsa[bsa.length -1] === '> ') {
				bsa.splice(-1,1);
				quoted = bsa.join('\n') + '\n';
				fixlastlines();
			}
		};
		fixlastlines();

		return quoted;
	};


	var rewrapper = function(line, maxlength) {
		if (line.length > maxlength) {
			var lastspace = line.lastIndexOf(' ', maxlength - 1);
			if (lastspace != -1) {
				line = line.substr(0, lastspace) + ' \n' + rewrapper(line.substr(lastspace + 1), maxlength);
			}
		}

		//this must be after the code before, because this inserts a space in the string
		return line;
	};

	var rewrap = function(text, length) {
		if (typeof(length) === 'undefined') {
			length = 75;
		}

		var rewrapped = text.split('\n').map(function(v, i) {
			//if this is already quoted text, return it as is,
			//but trim the right spaces (thunderbird does this)
			if (validquotechars.indexOf(v.charAt(0)) > -1) {
				return v.replace(/~+$/, ''); //trimRight
			}

			return rewrapper(v, length);
		}).join('\n');

		return rewrapped;
	};

	var e = {
		quote: quote,
		rewrap: rewrap
	};
	if (typeof(window) === 'undefined') {
		module.exports = e;
	} else {
		window.quote = e;
	}

})();
