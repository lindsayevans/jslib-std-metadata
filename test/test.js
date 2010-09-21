module('Library compatibility - .meta & friends');
test(name, function(){
	equals(g.m, undefined, '.m');
	equals(g.meta, undefined, '.meta');
	equals(g.metadata, undefined, '.metadata');
});

module('Library compatibility - straight on the object');
test(name, function(){
	equals(g.type, undefined, '.type');
	equals(g.name, undefined, '.name');
	equals(g.major_version, undefined, '.major_version');
	equals(g.minor_version, undefined, '.minor_version');
	equals(g.patch_version, undefined, '.patch_version');
	equals(g.special_version, undefined, '.special_version');
	equals(g.version, undefined, '.version');
	equals(g.globals, undefined, '.globals');
});


