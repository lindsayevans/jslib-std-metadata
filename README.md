#A proposal: Standardised metadata properties in JavaScript libraries

##What?

A standard way for developers (be they regular, plugin or library devs) to access things like the version and name of a JavaScript library.

##Example

Yes, it's simplified. Focus on the metadata bits and pretend the rest is pure awesomeness.

	var jGrouseLib = (function(G){
	  // Metadata
	  G.type = 'library';
	  G.name = 'Grouse Library';
	  G.major_version = 1;
	  G.minor_version = 2;
	  G.patch_version = 3;
	  G.special_version = 'b4';
	  G.version = '1.2.3b4';
	  G.globals = ['jGrouseLib', 'G'];

	  // The rest of the library
	  // ...

	  return window.G = G;
	})(jGrouseLib || {});


##Why?
- Use cases:
 - plugin developers - checking dependencies
 - library developers - check if another library (or another copy of your own) is using a global you want to
 - regular developers - finding what library is behind $, _ etc.
- CommonJS is awesome
- SemVer is awesome


##Why not?

###Bloat
Minimal - above example is 167B extra

###Can't split version into separate bits
See code samples

###Some libraries (Prototype) don't conform to SemVer
They should change, or we should relax it a bit (strip invalid chars etc.)

###Library X uses some of those properties for other things
Fair enough, see .meta namespacing discussion.

##Details

###Properties:
- type, required, string
  - Must be 'library'
- name, required, string
  - The name of the library
- major_version, required, number
- minor_version, required, number
- patch_version, required, number
- special_version, required, string
- version, required, string
  - major\_version + '.' + minor\_version + '.' + patch\_version + special\_version
- globals, optional, array of strings
  - Names of the variables you're sticking in the global namespace (i.e. window) 

##How?
- [backwards compatibilitly]
- [version splitting & concatting functions]

##Up for discussion
- casing of property names (camelCase vs. UPPERCASE vs. under_score)
- namespacing to .meta (some props are used by common libs for other purposes, .meta is not, but not quite as intuitive)
- keeping properties static - should we? can we? (Object.watch)
- methods like noConflict - should we specify them?
- globals:
 - should we modify these if something like jQuery.noConflict() removes them?
 - should we specify which ones users can destroy? (through noConflict or similar)

##References
1. Common libraries: <http://code.google.com/apis/libraries/>
2. CommonJS packages metadata <http://wiki.commonjs.org/wiki/Packages/1.1>
3. Semantic Versioning: <http://semver.org/>
4. Cross-browser Object.watch(): <http://gist.github.com/384583>


##What some common libraries are currently doing

###jQuery:
- jQuery.version, string: '1.4.2'

###YUI3:
- YUI.version, string '3.2.0'

###YUI2:
- YAHOO.VERSION, string: '2.8.1'
- YAHOO.BUILD, string: '19'
- YAHOO.env.getVersion('yahoo'), object: {build: "19", builds: ["19"], mainClass:  { env=Object, util=Object, more…}, name:  "yahoo", version: "2.8.1", versions: ["2.8.1"]}

###Ext JS:
- Ext.version, string: '3.2.1'
- Ext.versionDetail, object: {major: 3, minor: 2, patch: 1}

###Prototype:
- Prototype.Version, string: '1.7_rc2'

###Raphael:
- Raphael.version, string: '1.5.2'

###MooTools:
- MooTools.version, string: '1.3dev'
- MooTools.build, string: ''


##TODO
- How about plugins? regular standalone modules?
- Splitting & concatting in diff langs/build systems (ruby, perl, python, make, ant, windows batch)


##Code samples

	function version_concat(mj, mi, p, s){
	  var mj = mj || 0, mi = mi || 0, p = p || 0, s = s || '';
	  return mj+'.'+mi+'.'+p+s;
	}

	function version_split(v)
	  // version needs to conform to SemVer
	  //v='10.20.30beta40r50';
	  //v='10.20.30b40';
	  //v='10.20.30';
	  //v='0.0.1';
	  //v='0.1';
	  //v='1';

	  var x = v.split(/\.+/g),
	    ver = {major: x[0], minor: x[1], patch: x[2], special: x[3]};

	  if(ver.patch && ver.patch.match(/(\d+)(\w*)/g)){
	    ver.patch = RegExp.$1;
	    ver.special = RegExp.$2;
	  }
	  return ver;
	}

