(function() {
  const charGrid = document.getElementById('character-grid');
  const ta1 = document.getElementById('ta1');

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
      if (ta1.value.length == 0) {
          addCharElements('-', 'empty');
      } else {
          for (var i = 0; i < ta1.value.length; i++) {
              var code = ta1.value.charCodeAt(i);
              var text = ta1.value.charAt(i);
              var slice = 4;
              if (code >= 0xD800 && code < 0xDC00) {
                  if (i < ta1.value.length) {
                      var code2 = ta1.value.charCodeAt(i + 1);
                      if (code2 >= 0xDC00 && code < 0xE000) {
                          code = (code - 0xD800) * 0x400 + (code2 - 0xDC00) + 0x10000;
                          text += ta1.value.charAt(i + 1);
                          slice = 6;
                          i++;
                      }
                  }
              }
              addCharElements(text, ('000000' + (code).toString(16)).slice(-slice));
          }
      }
      updateLogCursor();
  }

  function updateLogCursor() {
      var i, selStart, selLength, selDirection;
      selStart = ta1.selectionStart;
      selLength = ta1.selectionEnd - ta1.selectionStart;
      selDirection = ta1.selectionDirection;

      // Adjust for surrogate pairs if necessary
      selLength = calculateLengthByCodepoint(ta1.value, selStart, selLength);
      selStart = calculateLengthByCodepoint(ta1.value, 0, selStart);

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
              charGrid.childNodes[x].scrollIntoView();
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

  ta1.addEventListener('input', logContent);  // Update on input events
  ta1.addEventListener('click', updateLogCursor);
  ta1.addEventListener('keydown', updateLogCursor);

  logContent();  // Initial content load
})();
