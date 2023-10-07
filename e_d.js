(function (Scratch) {
  'use strict';
  // Unicode Encoding extension v1.0 by Diax170
  const makeLabel = (text) => ({
    blockType: 'label',
    text: text
  });
  
  class E_d {
    getInfo() {
      return {
        id: 'edbydiax170',
        name: 'Unicode Encoding',
        color1: '#30a0ff',
        blocks: [
		  makeLabel('Encoding'),
          {
            opcode: 'encode',
            blockType: Scratch.BlockType.REPORTER,
            text: 'encode [DATA]',
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'text'
              }
            }
          },
          {
            opcode: 'decode',
            blockType: Scratch.BlockType.REPORTER,
            text: 'decode [ENCODED]',
            arguments: {
              ENCODED: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3116310131203116 // encoded "text"
              }
            }
          },
		  makeLabel('JSON operators'),
		  {
		    opcode: 'eta',
			blockType: Scratch.BlockType.REPORTER,
			text: 'encoded [ENCODED] to array',
			arguments: {
			  ENCODED: {
				type: Scratch.ArgumentType.NUMBER,
				defaultValue: 3116310131203116 // encoded "text"
			  }
			}
		  },
		  {
		    opcode: 'ate',
			blockType: Scratch.BlockType.REPORTER,
			text: 'array [ARRAY] to encoded',
			arguments: {
			  ARRAY: {
				type: Scratch.ArgumentType.STRING,
				defaultValue: '[116,101,120,116]' // encoded "text"
			  }
			}
		  },
		  makeLabel('Unicode'),
		  {
            opcode: 'uniof',
            blockType: Scratch.BlockType.REPORTER,
            text: 'unicode of [CHAR]',
            arguments: {
              CHAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'A'
              }
            }
          },
		   {
            opcode: 'unias',
            blockType: Scratch.BlockType.REPORTER,
            text: 'unicode [UNI] as char',
            arguments: {
              UNI: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 65
              }
            }
          },
          {
            opcode: 'isout',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is unicode [UNI] valid?',
            arguments: {
              UNI: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '65'
              }
            }
          },
		  {
            opcode: 'newlinechar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'newline char (\\n)',
			disableMonitor: true
          }
        ]
      };
    }

    encode(args) {
      return this.ate({ARRAY : Array.from(args.DATA)}, true);
    }

    decode(args) {
      return this.eta({ENCODED : args.ENCODED}, true).join('');
    }
	
	eta(args, decode=false) {
	  const toDecode = String(args.ENCODED);
      let decoded = [];
      let i = 0;
      while (i < toDecode.length) {
        const numDigits = Number(toDecode[i]);
		i++;
        let charCode = '';
        for (let j = 0; j < numDigits; j++) {
          charCode += toDecode[i];
          i++;
        }
		charCode = Number(charCode)
		decoded.push(decode ? String.fromCharCode(charCode || 0) : charCode);
      }
	  return decode ? decoded : JSON.stringify(decoded);
	}
	
	ate(args, encode=false) {
	  const toEncode = encode ? args.ARRAY : JSON.parse(args.ARRAY);
      let encoded = '';
      for (let i = 0; i < toEncode.length; i++) {
        const char = (encode ? toEncode[i].charCodeAt(0) /* get Unicode of character */ : toEncode[i]).toString();
        encoded += char.length + char;
      }
	  return encoded;
	}
	
	uniof(args) {
	  return args.CHAR.charCodeAt(0);
	}
	
	unias(args) {
	  return String.fromCharCode(args.UNI || 0);
	}
	
	isout(args) {
      const uni = args.UNI;
      return uni == String.fromCharCode(Number(uni) || 0).charCodeAt(0);
    }
	
	newlinechar() {
	  return '\n';
	}
  }

  Scratch.extensions.register(new E_d());
})(Scratch);
