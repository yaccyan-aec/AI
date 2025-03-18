document.addEventListener('DOMContentLoaded', function() {
    // Initialize the editor using Quill
    var quill = new Quill('#editor', {
        modules: {
            toolbar: '#toolbar'
        },
        theme: 'snow'
    });

    // Image upload using file input element
    document.getElementById('image-upload-btn').addEventListener('click', function() {
        document.getElementById('image-upload-input').click();
    });

    document.getElementById('image-upload-input').addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Drag and drop functionality for image upload
    var dragDropArea = document.getElementById('drag-drop-area');
    dragDropArea.addEventListener('dragover', function(event) {
        event.preventDefault();
        dragDropArea.classList.add('drag-over');
    });

    dragDropArea.addEventListener('dragleave', function(event) {
        event.preventDefault();
        dragDropArea.classList.remove('drag-over');
    });

    dragDropArea.addEventListener('drop', function(event) {
        event.preventDefault();
        dragDropArea.classList.remove('drag-over');
        var file = event.dataTransfer.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Text formatting options using toolbar buttons
    document.getElementById('bold-btn').addEventListener('click', function() {
        quill.format('bold', true);
    });

    document.getElementById('italic-btn').addEventListener('click', function() {
        quill.format('italic', true);
    });

    document.getElementById('underline-btn').addEventListener('click', function() {
        quill.format('underline', true);
    });

    document.getElementById('font-size-btn').addEventListener('click', function() {
        var size = prompt('Enter font size (e.g., 12px, 16px):');
        quill.format('size', size);
    });

    document.getElementById('font-color-btn').addEventListener('click', function() {
        var color = prompt('Enter font color (e.g., #ff0000, red):');
        quill.format('color', color);
    });

    // Network link insertion using toolbar button and dialog box
    document.getElementById('link-btn').addEventListener('click', function() {
        var url = prompt('Enter the URL:');
        var text = prompt('Enter the display text:');
        var range = quill.getSelection();
        quill.insertText(range.index, text, { link: url });
    });

    // HTML file saving functionality
    document.getElementById('save-btn').addEventListener('click', function() {
        var htmlContent = quill.root.innerHTML;
        var blob = new Blob([htmlContent], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'editor-content.html';
        a.click();
        URL.revokeObjectURL(url);
    });
});
