document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'g') {
        event.preventDefault();
        window.location.href = '/blog/';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'o') {
        event.preventDefault();
        window.location.href = 'https://github.com/kennynahh';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        window.location.href = 'https://linkedin.com/in/kennyulna';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'y') {
        event.preventDefault();
        window.open('https://kennyna.com/assets/Kenny-Resume.pdf', '_blank');
    }
});
