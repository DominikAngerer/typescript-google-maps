let global: any = window;
if (typeof global.console !== 'undefined' && typeof global.console.log !== 'undefined') {
	global.console.log('Crafted and created by Dominik Angerer. Visit www.dominikangerer.com');
} else {
	global.console = {};
	global.console.log = global.console.error = function() {};
}
