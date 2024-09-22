document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('refreshButton');
    const iframe = document.getElementById('myIframe');

    button.addEventListener('click', function() {
        iframe.src = iframe.src;
    });
});