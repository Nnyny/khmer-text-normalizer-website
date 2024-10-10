// Clear button 
document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('inputkh').value = '';
    document.getElementById('input-grid').innerHTML = '';
    addCharElements('-','empty');
});

// Copy text button 
document.getElementById('copy-btn').addEventListener('click', function() {
    var outputkh = document.getElementById('outputkh');
    outputkh.select(); 
    document.execCommand('copy');
});

// File input and load file content into textarea button
document.getElementById('load-file-btn').addEventListener('click', function() {
    var fileInput = document.getElementById('file-input');
    fileInput.click(); 
});

document.getElementById('file-input').addEventListener('change', function() {
    var file = this.files[0]; 

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function(event) {
            document.getElementById('inputkh').value = event.target.result;
        };

        reader.readAsText(file); 
    } else {
        alert('No file selected.');
    }
});

// Download as .txt button
document.getElementById('download-btn').addEventListener('click', function() {
    var outputkh = document.getElementById('outputkh');
    var text = outputkh.value; 

    if (text) {
        var blob = new Blob([text], { type: 'text/plain' }); 
        var url = URL.createObjectURL(blob); 

        var a = document.createElement('a'); 
        a.href = url; 
        a.download = 'output.txt'; 
        a.click(); 

        URL.revokeObjectURL(url); 
    } else {
        alert('No content to download.');
    }
});

//Example button
document.addEventListener('DOMContentLoaded', () => {
    const textBox = document.getElementById('inputkh');
    const exampleButton = document.getElementById('example-btn');
    const normalizeButton = document.getElementById('normalize-btn');
    const word = 'ភាសាខែ្មរ';
    let index = 0;
    let typingInterval;

    function typeWord() {
        if (index < word.length) {
            textBox.value += word.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval); 
            normalizeButton.style.display = 'block'; 
            normalizeButton.click(); 
        }
    }

    exampleButton.addEventListener('click', () => {
        textBox.value = '';
        index = 0; 
        typingInterval = setInterval(typeWord, 200); 
    });

    normalizeButton.addEventListener('click', () => {});
});


//Dropdown menu toggle 
function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.getElementById('dropdownContent');
    
    if (!dropdown.contains(event.target) && dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    }
};


// Highlight the different in input and output grids
function compareGrids() {
    const inputChildren = document.getElementById('input-grid').childNodes;
    const outputChildren = document.getElementById('output-grid').childNodes;
    const maxLength = Math.max(inputChildren.length, outputChildren.length);

    // Highlight differences
    for (let i = 0; i < maxLength; i++) {
        const inputChar = inputChildren[i] ? inputChildren[i].querySelector('.char-char').textContent : '';
        const outputChar = outputChildren[i] ? outputChildren[i].querySelector('.char-char').textContent : '';

        if (inputChar !== outputChar) {
            if (inputChildren[i]) {
                inputChildren[i].classList.add('difference');
            }
            if (outputChildren[i]) {
                outputChildren[i].classList.add('difference');
            }
        }
    }
}