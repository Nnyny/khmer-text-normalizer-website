// Clear button 
document.getElementById('clear-button').addEventListener('click', function() {
    document.getElementById('inputkh').value = '';
    document.getElementById('input-grid').innerHTML = '';
    addCharElements('-','empty');
});

// Copy text button 
document.getElementById('copy-button').addEventListener('click', function() {
    var outputkh = document.getElementById('outputkh');
    outputkh.select(); 
    document.execCommand('copy');
});

// File input and load file content into textarea button
document.getElementById('load-file-button').addEventListener('click', function() {
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
document.getElementById('download-button').addEventListener('click', function() {
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