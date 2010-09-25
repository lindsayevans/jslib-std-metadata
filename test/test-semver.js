	function version_concat(mj, mi, p, s){
		return (mj || 0) + '.' + (mi || 0) + '.' + (p || 0) + (s || '');
	}

	function version_split(v){

		var
			x = v.split(/\.+/g),
			ver = {major: 0, minor: 0, patch: 0, special: 0}
		;

		ver.major = ~~x[0] || 0;
		ver.minor = ~~x[1] || 0;
		ver.patch = x[2] || "0";

		if(ver.patch && ver.patch.match(/(\d+)(\w*)/g)){
			ver.patch = RegExp.$1;
			ver.special = RegExp.$2;
		}

		ver.patch = ~~ver.patch;

		return ver;

	}

test('version_concat', function(){
	equals(version_concat(1), '1.0.0', '1.0.0');
	equals(version_concat(1,2), '1.2.0', '1.2.0');
	equals(version_concat(1,2,3), '1.2.3', '1.2.3');
	equals(version_concat(1,2,3,4), '1.2.34', '1.2.34');
	equals(version_concat(1,2,3,'.4'), '1.2.3.4', '1.2.3.4');
	equals(version_concat(1,2,3,'r4'), '1.2.3r4', '1.2.3r4');
	equals(version_concat(), '0.0.0', '0.0.0');
});

test('version_split', function(){
	same(version_split('10.20.30beta40r50'), {major: 10, minor: 20, patch: 30, special: 'beta40r50'}, '10.20.30beta40r50');
	same(version_split('10.20.30b40'), {major: 10, minor: 20, patch: 30, special: 'b40'}, '10.20.30b40');
	same(version_split('10.20.30'), {major: 10, minor: 20, patch: 30, special: ''}, '10.20.30');
	same(version_split('0.0.1'), {major: 0, minor: 0, patch: 1, special: ''}, '0.0.1');
	same(version_split('0.1'), {major: 0, minor: 1, patch: 0, special: ''}, '0.1');
	same(version_split('1'), {major: 1, minor: 0, patch: 0, special: ''}, '1');
});


