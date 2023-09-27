
// Reddit Wrangler
// Script
( function() {

	var name = 'Reddit Wrangler';
	var words = 5;
	var beats = 0;
	var ads = 0;
	var old = '';
	var title = '';

	// Heartbeat
	setInterval( function() {

		beats++;
		//console.log( name + ': Heartbeat ' + beats + '...' );

		// Look for promoted posts
		var find = contains( 'span', 'promoted' );
		
		if ( ! find.length ) 
			return;

		find.forEach( function( item ) {
			
			var ancestor = findAncestor( item, 'div[data-testid]' );
			var heading = ancestor.querySelector( 'h3' );
			title = truncate( heading.innerText, words );

			// Remove ad post
			ancestor.remove();

			// Count and report unique ads blocked
			if ( title !== old ) {
				ads++;

				console.log( name + ': "' + title + '..." blocked!' );
				console.log( name + ': Ads blocked: ' + ads );

				old = title;
			}

			return;
		});

	}, 1000 );

	// Truncate
	function truncate( str, number ) { 
		return str.split( ' ' ).splice( 0, number ).join( ' ' );
	}

	// Contains
	function contains( selector, text ) { 
		var elements = document.querySelectorAll( selector );
		return [].filter.call( elements, function ( element ) {
			return RegExp( text ).test( element.textContent );
		});
	}

	// Find Ancestor
	function findAncestor( el, sel ) {
		if ( typeof el == 'undefined' || el === false || el == null || ! sel || sel == '' ) 
			return false;

		while (	( el = el.parentElement ) && ! ( el.matches || el.matchesSelector ).call( el, sel ) );
			return el;

		return false;
	}

} )();