document.getElementById('laheta-nappula').addEventListener('click', function() {
    // Hae päivämäärä, otsikko ja sisältö
    var date = document.getElementById('blog-date').value;
    var title = document.getElementById('blog-title').value;
    var content = document.getElementById('blog-content').value;

    // Luo uusi blog entry -div
    var blogEntry = document.createElement('div');
    blogEntry.className = 'blog-entry';

    // Luo otsikko elementti ja lisää se blog entryyn
    var blogTitle = document.createElement('h3');
    blogTitle.textContent = title + ' ' + date;
    blogEntry.appendChild(blogTitle);

    // Luo sisältö elementti ja lisää se blog entryyn
    var blogContent = document.createElement('p');
    blogContent.textContent = content;
    blogEntry.appendChild(blogContent);

    // Lisää blog entry blog-containeriin
    document.getElementById('blog-container').appendChild(blogEntry);

    // Tyhjennä syötekentät napin klikkauksen jälkeen
    document.getElementById('blog-date').value = '';
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-content').value = '';
});
