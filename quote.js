(function() {

	var validquotechars = ['>'];


	var quoteline = function(line, maxlength, qc) {
		if (line.length > maxlength) {
			var lastspace = line.lastIndexOf(' ', maxlength);
			if (lastspace != -1) {
				line = line.substr(0, lastspace) + ' \n' + quoteline(line.substr(lastspace + 1), maxlength, qc);
			}
		}

		//this must be after the code before, because this inserts a space in the string
		return qc + ' ' + line;
	};


	var quote = function(text, length, quotechar) {
		if (typeof(quotechar) === 'undefined') {
			quotechar = '>';
		}
		if (typeof(length) === 'undefined') {
			length = 75;
		}

		var quoted = text.split('\n').map(function(v, i) {
			//if this is already quoted text, return it as is
			if (validquotechars.indexOf(v.charAt(0)) > -1) {
				return v;
			}

			return quoteline(v, length, quotechar);
		}).join('\n');

		return quoted;
	};

	if (typeof(window) === 'undefined') {
		module.exports = quote;
	} else {
		window.quote = quote;
	}

})();
