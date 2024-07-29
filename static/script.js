// Clear button 
document.getElementById('clear-button').addEventListener('click', function() {
    document.getElementById('ta1').value = '';
    document.getElementById('character-grid').innerHTML = '';
});

// Copy text button 
document.getElementById('copy-button').addEventListener('click', function() {
    var ta2 = document.getElementById('ta2');
    ta2.select(); 
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
            document.getElementById('ta1').value = event.target.result;
        };

        reader.readAsText(file); 
    } else {
        alert('No file selected.');
    }
});

// Download as .txt button
document.getElementById('download-button').addEventListener('click', function() {
    var ta2 = document.getElementById('ta2');
    var text = ta2.value; 

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


// Drop down menu
document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    dropdownBtn.addEventListener('click', function() {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbtn')) {
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            }
        }
    });
});