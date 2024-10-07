(function() {
  const charGrid = document.getElementById('input-grid');
  const inputkh = document.getElementById('inputkh');

  function removeChildNodes(node) {
      while (node.lastChild) {
          node.removeChild(node.lastChild);
      }
  }

  function addCharElements(text, code) {
      var ebox = document.createElement('div'), 
          echar = document.createElement('div'), 
          ecode = document.createElement('div');
      echar.textContent = text;
      echar.className = 'char-char keymanweb-font';
      ecode.textContent = code;
      ecode.className = 'char-code';
      ebox.appendChild(echar);
      ebox.appendChild(ecode);
      charGrid.appendChild(ebox);
  }

  function logContent() {
      removeChildNodes(charGrid);
      if (inputkh.value.length == 0) {
          addCharElements('-', 'empty');
      } else {
          for (var i = 0; i < inputkh.value.length; i++) {
              var code = inputkh.value.charCodeAt(i);
              var text = inputkh.value.charAt(i);
              var slice = 4;
              if (code >= 0xD800 && code < 0xDC00) {
                  if (i < inputkh.value.length) {
                      var code2 = inputkh.value.charCodeAt(i + 1);
                      if (code2 >= 0xDC00 && code < 0xE000) {
                          code = (code - 0xD800) * 0x400 + (code2 - 0xDC00) + 0x10000;
                          text += inputkh.value.charAt(i + 1);
                          slice = 6;
                          i++;
                      }
                  }
              }
              addCharElements(text, ('000000' + (code).toString(16)).slice(-slice));
          }
      }
      updateLogCursor();
      checkCharacterCount()
  }

    // Check character count after logging content
    function checkCharacterCount() {
        const charCount = charGrid.childNodes.length;
        if (charCount >= 17) {
            charGrid.classList.add("hidden");
        } else {
            charGrid.classList.remove("hidden");
        }
    }


  function updateLogCursor() {
      var i, selStart, selLength, selDirection;
      selStart = inputkh.selectionStart;
      selLength = inputkh.selectionEnd - inputkh.selectionStart;
      selDirection = inputkh.selectionDirection;

      selLength = calculateLengthByCodepoint(inputkh.value, selStart, selLength);
      selStart = calculateLengthByCodepoint(inputkh.value, 0, selStart);

      for (i = 0; i < charGrid.childNodes.length; i++) {
          charGrid.childNodes[i].className = '';
      }

      var x = selDirection == 'backward' ? selStart - 1 : selStart + selLength - 1;
      if (x < 0) {
          charGrid.className = 'cursor';
      } else {
          charGrid.className = '';
          if (x >= 0 && x < charGrid.childNodes.length) {
              charGrid.childNodes[x].className = 'cursor';
          }
          if (isTouchDevice() || charGrid.scrollHeight > charGrid.clientHeight) {
            //   charGrid.childNodes[x].scrollIntoView();
              document.body.scrollTop = 0;
          }
      }

      for (i = selStart; i < selStart + selLength; i++) {
          charGrid.childNodes[i].className += ' cursor-selected';
      }
  }

  function calculateLengthByCodepoint(text, base, x) {
      var stop = base + x;
      while (base < stop - 1) {
          if (text.charCodeAt(base) >= 0xD800 && text.charCodeAt(base) < 0xDC00 &&
              text.charCodeAt(base + 1) >= 0xDC00 && text.charCodeAt(base + 1) < 0xE000) {
              x--;
          }
          base++;
      }
      return x;
  }

  function isTouchDevice() {
      return ('ontouchstart' in window || navigator.maxTouchPoints);
  }

  inputkh.addEventListener('input', logContent); 
  inputkh.addEventListener('click', updateLogCursor);
  inputkh.addEventListener('keydown', updateLogCursor);

  logContent();
  window.setInterval(logContent, 100);
})();