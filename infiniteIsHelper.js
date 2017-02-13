(function() {
	
	var conditionalHelper = function() {
		var len = arguments.length - 1,
			options = arguments[len],
			argumentsArray = [];

		function isSpecial(value) {
        	var specialArray = ['==' , '===', '!=', '!==', '>', '<', '>=', '<=', '&&', '||', 'not', '(', ')', undefined, null];
        	for (var y = 0; y < specialArray.length; y++) {
        		if (value === specialArray[y]) {
        			// debugger;
        			return true;
        		} 
        	}
    	}

		for (var i = 0; i < len; i++) {
			// debugger;
			var currentItem = arguments[i];
			// debugger;
			if ((len === 2) && !isSpecial(arguments[1])) { //accout for improper usage for helper in past
				argumentsArray = [arguments[0], "===", arguments[1]];
				i = len;
			} else if (isSpecial(arguments[i])) { //check if argument is a speical character or undefined/null
				// debugger;
				if (arguments[i] === 'not') {
					currentItem = '!=';
				} else if (arguments[i] === undefined || arguments[i] === null){
					currentItem = false;
				} else {
					currentItem = arguments[i];
				}
			} else if (!isNaN(arguments[i])) { //check if argument is a number
				// debugger;
				currentItem = arguments[i];
			} else if (arguments[i] === 'in') {
				// debugger;
				argumentsArray.pop(); //remove the last array item because it's part of this equation
				var previousItem = arguments[i-1],
					inOperator = arguments[i],
					nextItemArray = arguments[i+1];
				if (nextItemArray !== undefined || nextItemArray !== null) {
					for (var x = 0; x < nextItemArray.length; x++) { //iterate through array
						if (previousItem === nextItemArray[x]) {
							return currentItem = true;
						} else {
							currentItem = false;
						}
					}
					i++; //skips next item in arguments array
				} else {
					currentItem = false;
				}	
			} else {
				currentItem = '"'+arguments[i]+'"';
				// debugger;
			}
			argumentsArray.push(currentItem);
			// debugger;
		}
		// debugger;

		if (eval(conditionalHelperargumentsArray.join(' '))) {
			return options.fn(this);
		} else {
			return options.inverse(this);	
		}
		
	};

	Handlebars.registerHelper('is', conditionalHelper);

}());


//NOTE
// Add Object check 'in'
// 	check if array or object
// 	iterate through object
// Add MATH Operators