/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		3:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"gen-func","1":"parse","2":"simple"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ({

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * simple facade for runtime and compiler
	 */
	
	'use strict';
	
	var XTemplateRuntime = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./runtime\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var util = XTemplateRuntime.util;
	var Compiler = __webpack_require__(161);
	var compile = Compiler.compile;
	
	/**
	 * xtemplate engine
	 *
	 *      @example
	 *      modulex.use('xtemplate', function(XTemplate){
	 *          document.writeln(new XTemplate('{{title}}').render({title:2}));
	 *      });
	 *
	 * @class XTemplate
	 * @extends XTemplate.Runtime
	 */
	function XTemplate(tpl_, config_) {
	  var tpl = tpl_;
	  var config = config_;
	  var tplType = typeof tpl;
	  if (tplType !== 'string' && tplType !== 'function') {
	    config = tpl;
	    tpl = undefined;
	  }
	  config = this.config = util.merge(XTemplate.globalConfig, config);
	  if (tplType === 'string') {
	    try {
	      tpl = this.compile(tpl, config.name);
	    } catch (err) {
	      this.compileError = err;
	    }
	  }
	  XTemplateRuntime.call(this, tpl, config);
	}
	
	function Noop() {}
	
	Noop.prototype = XTemplateRuntime.prototype;
	XTemplate.prototype = new Noop();
	XTemplate.prototype.constructor = XTemplate;
	
	XTemplate.prototype.compile = function (content, name) {
	  return compile(content, name, this.config);
	};
	
	XTemplate.prototype.render = function (data, option, callback_) {
	  var callback = callback_;
	  if (typeof option === 'function') {
	    callback = option;
	  }
	  var compileError = this.compileError;
	  if (compileError) {
	    if (callback) {
	      callback(compileError);
	    } else {
	      throw compileError;
	    }
	  } else {
	    return XTemplateRuntime.prototype.render.apply(this, arguments);
	  }
	};
	
	module.exports = util.mix(XTemplate, {
	  config: XTemplateRuntime.config,
	
	  compile: compile,
	
	  Compiler: Compiler,
	
	  Scope: XTemplateRuntime.Scope,
	
	  Runtime: XTemplateRuntime,
	
	  /**
	   * add command to all template
	   * @method
	   * @static
	   * @param {String} commandName
	   * @param {Function} fn
	   */
	  addCommand: XTemplateRuntime.addCommand,
	
	  /**
	   * remove command from all template by name
	   * @method
	   * @static
	   * @param {String} commandName
	   */
	  removeCommand: XTemplateRuntime.removeCommand
	});
	
	/*
	 It consists three modules:

	 -   xtemplate - Both compiler and runtime functionality.
	 -   xtemplate/compiler - Compiler string template to module functions.
	 -   xtemplate/runtime -  Runtime for string template( with xtemplate/compiler loaded)
	 or template functions.

	 xtemplate/compiler depends on xtemplate/runtime,
	 because compiler needs to know about runtime to generate corresponding codes.
	 */

/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * translate ast to js function code
	 */
	
	'use strict';
	
	var util = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./runtime\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).util;
	var compilerTools = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./compiler/tools\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var pushToArray = compilerTools.pushToArray;
	var wrapByDoubleQuote = compilerTools.wrapByDoubleQuote;
	// codeTemplates --------------------------- start
	var TMP_DECLARATION = ['var t;'];
	for (var i = 0; i < 10; i++) {
	  TMP_DECLARATION.push('var t' + i + ';');
	}
	var TOP_DECLARATION = TMP_DECLARATION.concat(['var tpl = this;\n  var root = tpl.root;\n  var buffer = tpl.buffer;\n  var scope = tpl.scope;\n  var runtime = tpl.runtime;\n  var name = tpl.name;\n  var pos = tpl.pos;\n  var data = scope.data;\n  var affix = scope.affix;\n  var nativeCommands = root.nativeCommands;\n  var utils = root.utils;']).join('\n');
	var CALL_NATIVE_COMMAND = '{lhs} = {name}Command.call(tpl, scope, {option}, buffer);';
	var CALL_CUSTOM_COMMAND = 'buffer = callCommandUtil(tpl, scope, {option}, buffer, {idParts});';
	var CALL_FUNCTION = '{lhs} = callFnUtil(tpl, scope, {option}, buffer, {idParts});';
	var CALL_DATA_FUNCTION = '{lhs} = callDataFnUtil([{params}], {idParts});';
	var CALL_FUNCTION_DEPTH = '{lhs} = callFnUtil(tpl, scope, {option}, buffer, {idParts}, {depth});';
	var ASSIGN_STATEMENT = 'var {lhs} = {value};';
	var SCOPE_RESOLVE_DEPTH = 'var {lhs} = scope.resolve({idParts},{depth});';
	var SCOPE_RESOLVE_LOOSE_DEPTH = 'var {lhs} = scope.resolveLoose({idParts},{depth});';
	var FUNC = 'function {functionName}({params}){\n  {body}\n}';
	var SOURCE_URL = '\n  //# sourceURL = {name}.js\n';
	var DECLARE_NATIVE_COMMANDS = 'var {name}Command = nativeCommands["{name}"];';
	var DECLARE_UTILS = 'var {name}Util = utils["{name}"];';
	var BUFFER_WRITE = 'buffer = buffer.write({value});';
	var BUFFER_APPEND = 'buffer.data += {value};';
	var BUFFER_WRITE_ESCAPED = 'buffer = buffer.writeEscaped({value});';
	var RETURN_BUFFER = 'return buffer;';
	// codeTemplates ---------------------------- end
	
	var XTemplateRuntime = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./runtime\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var parser = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./compiler/parser\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	parser.yy = __webpack_require__(162);
	var nativeCode = [];
	var substitute = util.substitute;
	var each = util.each;
	var nativeCommands = XTemplateRuntime.nativeCommands;
	var nativeUtils = XTemplateRuntime.utils;
	
	each(nativeUtils, function (v, name) {
	  nativeCode.push(substitute(DECLARE_UTILS, {
	    name: name
	  }));
	});
	
	each(nativeCommands, function (v, name) {
	  nativeCode.push(substitute(DECLARE_NATIVE_COMMANDS, {
	    name: name
	  }));
	});
	
	nativeCode = nativeCode.join('\n');
	
	var lastLine = 1;
	
	function markLine(pos, source) {
	  if (lastLine === pos.line) {
	    return;
	  }
	  lastLine = pos.line;
	  source.push('pos.line = ' + pos.line + ';');
	}
	
	function resetGlobal() {
	  lastLine = 1;
	}
	
	function getFunctionDeclare(functionName) {
	  return ['function ' + functionName + '(scope, buffer, undefined) {\n    var data = scope.data;\n    var affix = scope.affix;'];
	}
	
	function guid(self, str) {
	  return str + self.uuid++;
	}
	
	function opExpression(e) {
	  var source = [];
	  var type = e.opType;
	  var exp1 = undefined;
	  var exp2 = undefined;
	  var code1Source = undefined;
	  var code2Source = undefined;
	  var code1 = this[e.op1.type](e.op1);
	  var code2 = this[e.op2.type](e.op2);
	  var exp = guid(this, 'exp');
	  exp1 = code1.exp;
	  exp2 = code2.exp;
	  code1Source = code1.source;
	  code2Source = code2.source;
	  pushToArray(source, code1Source);
	  source.push('var ' + exp + ' = ' + exp1 + ';');
	  if (type === '&&' || type === '||') {
	    source.push('if(' + (type === '&&' ? '' : '!') + '(' + exp + ')){');
	    pushToArray(source, code2Source);
	    source.push(exp + ' = ' + exp2 + ';');
	    source.push('}');
	  } else {
	    pushToArray(source, code2Source);
	    source.push(exp + ' = (' + exp1 + ') ' + type + ' (' + exp2 + ');');
	  }
	  return {
	    exp: exp,
	    source: source
	  };
	}
	
	function genFunction(self, statements) {
	  var functionName = guid(self, 'func');
	  var source = getFunctionDeclare(functionName);
	  var statement = undefined;
	  for (var i = 0, len = statements.length; i < len; i++) {
	    statement = statements[i];
	    pushToArray(source, self[statement.type](statement).source);
	  }
	  source.push(RETURN_BUFFER);
	  source.push('}');
	  // avoid deep closure for performance
	  pushToArray(self.functionDeclares, source);
	  return functionName;
	}
	
	function genConditionFunction(self, condition) {
	  var functionName = guid(self, 'func');
	  var source = getFunctionDeclare(functionName);
	  var gen = self[condition.type](condition);
	  pushToArray(source, gen.source);
	  source.push('return ' + gen.exp + ';');
	  source.push('}');
	  pushToArray(self.functionDeclares, source);
	  return functionName;
	}
	
	function genTopFunction(self, statements) {
	  var catchError = self.config.catchError;
	  var source = [
	  // 'function run(tpl) {',
	  TOP_DECLARATION, nativeCode,
	  // decrease speed by 10%
	  // for performance
	  catchError ? 'try {' : ''];
	  var statement = undefined;
	  var i = undefined;
	  var len = undefined;
	  for (i = 0, len = statements.length; i < len; i++) {
	    statement = statements[i];
	    pushToArray(source, self[statement.type](statement, {
	      top: 1
	    }).source);
	  }
	  source.splice.apply(source, [2, 0].concat(self.functionDeclares).concat(''));
	  source.push(RETURN_BUFFER);
	  // source.push('}');
	  // source.push('function tryRun(tpl) {');
	  // source.push('try {');
	  // source.push('ret = run(this);');
	  if (catchError) {
	    source.push('} catch(e) {');
	    source.push('if(!e.xtpl){');
	    source.push('buffer.error(e);');
	    source.push('}else{ throw e; }');
	    source.push('}');
	  }
	  //    source.push('}');
	  //    source.push('return tryRun(this);');
	  return {
	    params: ['undefined'],
	    source: source.join('\n')
	  };
	}
	
	function genOptionFromFunction(self, func, escape, fn, elseIfs, inverse) {
	  var source = [];
	  var params = func.params;
	  var hash = func.hash;
	  var funcParams = [];
	  var isSetFunction = func.id.string === 'set';
	  if (params) {
	    each(params, function (param) {
	      var nextIdNameCode = self[param.type](param);
	      pushToArray(source, nextIdNameCode.source);
	      funcParams.push(nextIdNameCode.exp);
	    });
	  }
	  var funcHash = [];
	  if (hash) {
	    each(hash.value, function (h) {
	      var v = h[1];
	      var key = h[0];
	      var vCode = self[v.type](v);
	      pushToArray(source, vCode.source);
	      if (isSetFunction) {
	        // support  {{set(x.y.z=1)}}
	        // https://github.com/xtemplate/xtemplate/issues/54
	        var resolvedParts = compilerTools.convertIdPartsToRawAccessor(self, source, key.parts).resolvedParts;
	        funcHash.push({ key: resolvedParts, depth: key.depth, value: vCode.exp });
	      } else {
	        if (key.parts.length !== 1 || typeof key.parts[0] !== 'string') {
	          throw new Error('invalid hash parameter');
	        }
	        funcHash.push([wrapByDoubleQuote(key.string), vCode.exp]);
	      }
	    });
	  }
	  var exp = '';
	  // literal init array, do not use arr.push for performance
	  if (funcParams.length || funcHash.length || escape || fn || inverse || elseIfs) {
	    if (escape) {
	      exp += ',escape:1';
	    }
	    if (funcParams.length) {
	      exp += ',params:[' + funcParams.join(',') + ']';
	    }
	    if (funcHash.length) {
	      (function () {
	        var hashStr = [];
	        if (isSetFunction) {
	          util.each(funcHash, function (h) {
	            hashStr.push('{key:[' + h.key.join(',') + '],value:' + h.value + ', depth:' + h.depth + '}');
	          });
	          exp += ',hash: [' + hashStr.join(',') + ']';
	        } else {
	          util.each(funcHash, function (h) {
	            hashStr.push(h[0] + ':' + h[1]);
	          });
	          exp += ',hash: {' + hashStr.join(',') + '}';
	        }
	      })();
	    }
	    if (fn) {
	      exp += ',fn: ' + fn;
	    }
	    if (inverse) {
	      exp += ',inverse: ' + inverse;
	    }
	    if (elseIfs) {
	      exp += ',elseIfs: ' + elseIfs;
	    }
	    exp = '{' + exp.slice(1) + '}';
	  }
	  return {
	    exp: exp || '{}',
	    funcParams: funcParams,
	    source: source
	  };
	}
	
	function generateFunction(self, func, block, escape_) {
	  var escape = escape_;
	  var source = [];
	  markLine(func.pos, source);
	  var functionConfigCode = undefined;
	  var idName = undefined;
	  var id = func.id;
	  var idString = id.string;
	  if (idString in nativeCommands) {
	    escape = 0;
	  }
	  var idParts = id.parts;
	  var i = undefined;
	  if (idString === 'elseif') {
	    return {
	      exp: '',
	      source: []
	    };
	  }
	  if (block) {
	    var programNode = block.program;
	    var inverse = programNode.inverse;
	    var fnName = undefined;
	    var elseIfsName = undefined;
	    var inverseName = undefined;
	    var elseIfs = [];
	    var elseIf = undefined;
	    var functionValue = undefined;
	    var statement = undefined;
	    var statements = programNode.statements;
	    var thenStatements = [];
	    for (i = 0; i < statements.length; i++) {
	      statement = statements[i];
	      if (statement.type === 'expressionStatement' && (functionValue = statement.value) && (functionValue = functionValue.parts) && functionValue.length === 1 && (functionValue = functionValue[0]) && functionValue.type === 'function' && functionValue.id.string === 'elseif') {
	        if (elseIf) {
	          elseIfs.push(elseIf);
	        }
	        elseIf = {
	          condition: functionValue.params[0],
	          statements: []
	        };
	      } else if (elseIf) {
	        elseIf.statements.push(statement);
	      } else {
	        thenStatements.push(statement);
	      }
	    }
	    if (elseIf) {
	      elseIfs.push(elseIf);
	    }
	    // find elseIfs
	    fnName = genFunction(self, thenStatements);
	    if (inverse) {
	      inverseName = genFunction(self, inverse);
	    }
	    if (elseIfs.length) {
	      var elseIfsVariable = [];
	      for (i = 0; i < elseIfs.length; i++) {
	        var elseIfStatement = elseIfs[i];
	        var conditionName = genConditionFunction(self, elseIfStatement.condition);
	        elseIfsVariable.push('{test: ' + conditionName + ',fn : ' + genFunction(self, elseIfStatement.statements) + '}');
	      }
	      elseIfsName = '[' + elseIfsVariable.join(',') + ']';
	    }
	    functionConfigCode = genOptionFromFunction(self, func, escape, fnName, elseIfsName, inverseName);
	    pushToArray(source, functionConfigCode.source);
	  }
	
	  var isModule = self.config.isModule;
	
	  if (idString === 'include' || idString === 'parse' || idString === 'extend') {
	    if (!func.params || func.params.length > 2) {
	      throw new Error('include/parse/extend can only has at most two parameter!');
	    }
	  }
	
	  if (isModule) {
	    if (idString === 'include' || idString === 'parse') {
	      func.params[0] = { type: 'raw', value: 're' + 'quire("' + func.params[0].value + '")' };
	    }
	  }
	
	  if (!functionConfigCode) {
	    functionConfigCode = genOptionFromFunction(self, func, escape, null, null, null);
	    pushToArray(source, functionConfigCode.source);
	  }
	
	  if (!block) {
	    idName = guid(self, 'callRet');
	    source.push('var ' + idName);
	  }
	
	  if (idString in nativeCommands) {
	    if (idString === 'extend') {
	      source.push('runtime.extendTpl = ' + functionConfigCode.exp);
	      source.push('buffer = buffer.async(function(newBuffer){runtime.extendTplBuffer = newBuffer;});');
	      if (isModule) {
	        source.push('runtime.extendTplFn = re' + 'quire(' + functionConfigCode.exp + '.params[0])');
	      }
	    } else if (idString === 'include') {
	      source.push('buffer = root.' + (isModule ? 'includeModule' : 'include') + '(scope,' + functionConfigCode.exp + ',buffer,tpl);');
	    } else if (idString === 'parse') {
	      source.push('buffer = root.' + (isModule ? 'includeModule' : 'include') + '(new scope.constructor(),' + functionConfigCode.exp + ',buffer,tpl);');
	    } else {
	      source.push(substitute(CALL_NATIVE_COMMAND, {
	        lhs: block ? 'buffer' : idName,
	        name: idString,
	        option: functionConfigCode.exp
	      }));
	    }
	  } else if (block) {
	    source.push(substitute(CALL_CUSTOM_COMMAND, {
	      option: functionConfigCode.exp,
	      idParts: compilerTools.convertIdPartsToRawAccessor(self, source, idParts).arr
	    }));
	  } else {
	    var resolveParts = compilerTools.convertIdPartsToRawAccessor(self, source, idParts);
	    // {{x.y().q.z()}}
	    // do not need scope resolution, call data function directly
	    if (resolveParts.funcRet) {
	      source.push(substitute(CALL_DATA_FUNCTION, {
	        lhs: idName,
	        params: functionConfigCode.funcParams.join(','),
	        idParts: resolveParts.arr,
	        depth: id.depth
	      }));
	    } else {
	      source.push(substitute(id.depth ? CALL_FUNCTION_DEPTH : CALL_FUNCTION, {
	        lhs: idName,
	        option: functionConfigCode.exp,
	        idParts: resolveParts.arr,
	        depth: id.depth
	      }));
	    }
	  }
	
	  return {
	    exp: idName,
	    source: source
	  };
	}
	
	function AstToJSProcessor(config) {
	  this.functionDeclares = [];
	  this.config = config;
	  this.uuid = 0;
	}
	
	AstToJSProcessor.prototype = {
	  constructor: AstToJSProcessor,
	
	  raw: function raw(_raw) {
	    return {
	      exp: _raw.value
	    };
	  },
	
	  arrayExpression: function arrayExpression(e) {
	    var list = e.list;
	    var len = list.length;
	    var r = undefined;
	    var source = [];
	    var exp = [];
	    for (var i = 0; i < len; i++) {
	      r = this[list[i].type](list[i]);
	      pushToArray(source, r.source);
	      exp.push(r.exp);
	    }
	    return {
	      exp: '[ ' + exp.join(',') + ' ]',
	      source: source
	    };
	  },
	
	  objectExpression: function objectExpression(e) {
	    var obj = e.obj;
	    var len = obj.length;
	    var r = undefined;
	    var source = [];
	    var exp = [];
	    for (var i = 0; i < len; i++) {
	      var item = obj[i];
	      r = this[item[1].type](item[1]);
	      pushToArray(source, r.source);
	      exp.push(wrapByDoubleQuote(item[0]) + ': ' + r.exp);
	    }
	    return {
	      exp: '{ ' + exp.join(',') + ' }',
	      source: source
	    };
	  },
	
	  conditionalOrExpression: opExpression,
	
	  conditionalAndExpression: opExpression,
	
	  relationalExpression: opExpression,
	
	  equalityExpression: opExpression,
	
	  additiveExpression: opExpression,
	
	  multiplicativeExpression: opExpression,
	
	  unaryExpression: function unaryExpression(e) {
	    var code = this[e.value.type](e.value);
	    return {
	      exp: e.unaryType + '(' + code.exp + ')',
	      source: code.source
	    };
	  },
	
	  string: function string(e) {
	    // same as contentNode.value
	    return {
	      exp: compilerTools.wrapBySingleQuote(compilerTools.escapeString(e.value, 1)),
	      source: []
	    };
	  },
	
	  number: function number(e) {
	    return {
	      exp: e.value,
	      source: []
	    };
	  },
	
	  id: function id(idNode) {
	    var source = [];
	    var self = this;
	    var loose = !self.config.strict;
	    markLine(idNode.pos, source);
	    if (compilerTools.isGlobalId(idNode)) {
	      return {
	        exp: idNode.string,
	        source: source
	      };
	    }
	    var depth = idNode.depth;
	    var idParts = idNode.parts;
	    var idName = guid(self, 'id');
	    if (depth) {
	      source.push(substitute(loose ? SCOPE_RESOLVE_LOOSE_DEPTH : SCOPE_RESOLVE_DEPTH, {
	        lhs: idName,
	        idParts: compilerTools.convertIdPartsToRawAccessor(self, source, idParts).arr,
	        depth: depth
	      }));
	      return {
	        exp: idName,
	        source: source
	      };
	    }
	    var part0 = idParts[0];
	    var remain = undefined;
	    var remainParts = undefined;
	    if (part0 === 'this') {
	      remainParts = idParts.slice(1);
	      source.push(substitute(ASSIGN_STATEMENT, {
	        lhs: idName,
	        value: remainParts.length ? compilerTools.chainedVariableRead(self, source, remainParts, undefined, undefined, loose) : 'data'
	      }));
	      return {
	        exp: idName,
	        source: source
	      };
	    } else if (part0 === 'root') {
	      remainParts = idParts.slice(1);
	      remain = remainParts.join('.');
	      if (remain) {
	        remain = '.' + remain;
	      }
	      source.push(substitute(ASSIGN_STATEMENT, {
	        lhs: idName,
	        value: remain ? compilerTools.chainedVariableRead(self, source, remainParts, true, undefined, loose) : 'scope.root.data',
	        idParts: remain
	      }));
	      return {
	        exp: idName,
	        source: source
	      };
	    }
	    // {{x.y().z}}
	    if (idParts[0].type === 'function') {
	      var resolvedParts = compilerTools.convertIdPartsToRawAccessor(self, source, idParts).resolvedParts;
	      for (var i = 1; i < resolvedParts.length; i++) {
	        resolvedParts[i] = '[' + resolvedParts[i] + ']';
	      }
	      var value = undefined;
	      if (loose) {
	        value = compilerTools.genStackJudge(resolvedParts.slice(1), resolvedParts[0]);
	      } else {
	        value = resolvedParts[0];
	        for (var ri = 1; ri < resolvedParts.length; ri++) {
	          value += resolvedParts[ri];
	        }
	      }
	      source.push(substitute(ASSIGN_STATEMENT, {
	        lhs: idName,
	        value: value
	      }));
	    } else {
	      source.push(substitute(ASSIGN_STATEMENT, {
	        lhs: idName,
	        value: compilerTools.chainedVariableRead(self, source, idParts, false, true, loose)
	      }));
	    }
	    return {
	      exp: idName,
	      source: source
	    };
	  },
	
	  'function': function _function(func, escape) {
	    return generateFunction(this, func, false, escape);
	  },
	
	  blockStatement: function blockStatement(block) {
	    return generateFunction(this, block.func, block);
	  },
	
	  expressionStatement: function expressionStatement(_expressionStatement) {
	    var source = [];
	    var escape = _expressionStatement.escape;
	    var code = undefined;
	    var expression = _expressionStatement.value;
	    var type = expression.type;
	    var expressionOrVariable = undefined;
	    code = this[type](expression, escape);
	    pushToArray(source, code.source);
	    expressionOrVariable = code.exp;
	    source.push(substitute(escape ? BUFFER_WRITE_ESCAPED : BUFFER_WRITE, {
	      value: expressionOrVariable
	    }));
	    return {
	      exp: '',
	      source: source
	    };
	  },
	
	  contentStatement: function contentStatement(_contentStatement) {
	    return {
	      exp: '',
	      source: [substitute(BUFFER_APPEND, {
	        value: compilerTools.wrapBySingleQuote(compilerTools.escapeString(_contentStatement.value, 0))
	      })]
	    };
	  }
	};
	
	var anonymousCount = 0;
	
	/**
	 * compiler for xtemplate
	 * @class XTemplate.Compiler
	 * @singleton
	 */
	var compiler = {
	  /**
	   * get ast of template
	   * @param {String} [name] xtemplate name
	   * @param {String} tplContent
	   * @return {Object}
	   */
	  parse: function parse(tplContent, name) {
	    if (tplContent) {
	      var ret = undefined;
	      try {
	        ret = parser.parse(tplContent, name);
	      } catch (err) {
	        var e = undefined;
	        if (err instanceof Error) {
	          e = err;
	        } else {
	          e = new Error(err);
	        }
	        var errorStr = 'XTemplate error ';
	        try {
	          e.stack = errorStr + e.stack;
	          e.message = errorStr + e.message;
	        } catch (e2) {
	          // empty
	        }
	        throw e;
	      }
	      return ret;
	    }
	    return {
	      statements: []
	    };
	  },
	
	  compileToStr: function compileToStr(param) {
	    var func = compiler.compileToJson(param);
	    return substitute(FUNC, {
	      functionName: param.functionName || '',
	      params: func.params.join(','),
	      body: func.source
	    });
	  },
	  /**
	   * get template function json format
	   * @param {String} [param.name] xtemplate name
	   * @param {String} param.content
	   * @param {Boolean} [param.isModule] whether generated function is used in module
	   * @param {Boolean} [param.catchError] whether to try catch generated function to provide good error message
	   * @param {Boolean} [param.strict] whether to generate strict function
	   * @return {Object}
	   */
	  compileToJson: function compileToJson(param) {
	    resetGlobal();
	    var name = param.name = param.name || 'xtemplate' + ++anonymousCount;
	    var content = param.content;
	    var root = compiler.parse(content, name);
	    return genTopFunction(new AstToJSProcessor(param), root.statements);
	  },
	  /**
	   * get template function
	   * @param {String} tplContent
	   * @param {String} name template file name
	   * @param {Object} config
	   * @return {Function}
	   */
	  compile: function compile(tplContent, name, config) {
	    var code = compiler.compileToJson(util.merge(config, {
	      content: tplContent,
	      name: name
	    }));
	    var source = code.source;
	    source += substitute(SOURCE_URL, {
	      name: name
	    });
	    var args = code.params.concat(source);
	    // eval is not ok for eval("(function(){})") ie
	    return Function.apply(null, args);
	  }
	};
	
	module.exports = compiler;
	
	/*
	 todo:
	 need oop, new Source().this()
	 */

/***/ },

/***/ 162:
/***/ function(module, exports) {

	/**
	 * Ast node class for xtemplate
	 */
	
	'use strict';
	
	var ast = {};
	
	function sameArray(a1, a2) {
	  var l1 = a1.length;
	  var l2 = a2.length;
	  if (l1 !== l2) {
	    return 0;
	  }
	  for (var i = 0; i < l1; i++) {
	    if (a1[i] !== a2[i]) {
	      return 0;
	    }
	  }
	  return 1;
	}
	
	ast.ProgramNode = function (pos, statements, inverse) {
	  var self = this;
	  self.pos = pos;
	  self.statements = statements;
	  self.inverse = inverse;
	};
	
	ast.ProgramNode.prototype.type = 'program';
	
	ast.BlockStatement = function (pos, func, program, close, escape) {
	  var closeParts = close.parts;
	  var self = this;
	  var e = undefined;
	  // no close tag
	  if (!sameArray(func.id.parts, closeParts)) {
	    e = 'in file: ' + pos.filename + ' syntax error at line ' + pos.line + ', col ' + pos.col + ':\n' + 'expect {{/' + func.id.parts + '}} not {{/' + closeParts + '}}';
	    throw new Error(e);
	  }
	  self.escape = escape;
	  self.pos = pos;
	  self.func = func;
	  self.program = program;
	};
	
	ast.BlockStatement.prototype.type = 'blockStatement';
	
	ast.ExpressionStatement = function (pos, expression, escape) {
	  var self = this;
	  self.pos = pos;
	  self.value = expression;
	  self.escape = escape;
	};
	
	ast.ExpressionStatement.prototype.type = 'expressionStatement';
	
	ast.ContentStatement = function (pos, value) {
	  var self = this;
	  self.pos = pos;
	  self.value = value || '';
	};
	
	ast.ContentStatement.prototype.type = 'contentStatement';
	
	ast.UnaryExpression = function (unaryType, v) {
	  this.value = v;
	  this.unaryType = unaryType;
	};
	
	ast.Function = function (pos, id, params, hash) {
	  var self = this;
	  self.pos = pos;
	  self.id = id;
	  self.params = params;
	  self.hash = hash;
	};
	
	ast.Function.prototype.type = 'function';
	
	ast.UnaryExpression.prototype.type = 'unaryExpression';
	
	ast.MultiplicativeExpression = function (op1, opType, op2) {
	  var self = this;
	  self.op1 = op1;
	  self.opType = opType;
	  self.op2 = op2;
	};
	
	ast.MultiplicativeExpression.prototype.type = 'multiplicativeExpression';
	
	ast.AdditiveExpression = function (op1, opType, op2) {
	  var self = this;
	  self.op1 = op1;
	  self.opType = opType;
	  self.op2 = op2;
	};
	
	ast.AdditiveExpression.prototype.type = 'additiveExpression';
	
	ast.RelationalExpression = function (op1, opType, op2) {
	  var self = this;
	  self.op1 = op1;
	  self.opType = opType;
	  self.op2 = op2;
	};
	
	ast.RelationalExpression.prototype.type = 'relationalExpression';
	
	ast.EqualityExpression = function (op1, opType, op2) {
	  var self = this;
	  self.op1 = op1;
	  self.opType = opType;
	  self.op2 = op2;
	};
	
	ast.EqualityExpression.prototype.type = 'equalityExpression';
	
	ast.ConditionalAndExpression = function (op1, op2) {
	  var self = this;
	  self.op1 = op1;
	  self.op2 = op2;
	  self.opType = '&&';
	};
	
	ast.ConditionalAndExpression.prototype.type = 'conditionalAndExpression';
	
	ast.ConditionalOrExpression = function (op1, op2) {
	  var self = this;
	  self.op1 = op1;
	  self.op2 = op2;
	  self.opType = '||';
	};
	
	ast.ConditionalOrExpression.prototype.type = 'conditionalOrExpression';
	
	ast.String = function (pos, value) {
	  var self = this;
	  self.pos = pos;
	  self.value = value;
	};
	
	ast.String.prototype.type = 'string';
	
	ast.Number = function (pos, value) {
	  var self = this;
	  self.pos = pos;
	  self.value = value;
	};
	
	ast.Number.prototype.type = 'number';
	
	ast.Hash = function (pos, value) {
	  var self = this;
	  self.pos = pos;
	  self.value = value;
	};
	
	ast.Hash.prototype.type = 'hash';
	
	ast.ArrayExpression = function (list) {
	  this.list = list;
	};
	
	ast.ArrayExpression.prototype.type = 'arrayExpression';
	
	ast.ObjectExpression = function (obj) {
	  this.obj = obj;
	};
	
	ast.ObjectExpression.prototype.type = 'objectExpression';
	
	ast.Id = function (pos, raw) {
	  var self = this;
	  var parts = [];
	  var depth = 0;
	  self.pos = pos;
	  for (var i = 0, l = raw.length; i < l; i++) {
	    var p = raw[i];
	    if (p === '..') {
	      depth++;
	    } else {
	      parts.push(p);
	    }
	  }
	  self.parts = parts;
	  self.string = parts.join('.');
	  self.depth = depth;
	};
	
	ast.Id.prototype.type = 'id';
	
	module.exports = ast;

/***/ }

/******/ });
//# sourceMappingURL=common.js.map