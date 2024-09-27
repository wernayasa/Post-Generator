// Konversi JSON ke XML
document.getElementById("convert-button").addEventListener("click", function () {
  const inputJson = document.getElementById("output-json").value;

  try {
    const jsonData = JSON.parse(inputJson);
    const englishTitle = jsonData.data.Media.title.english;
    const genres = jsonData.data.Media.genres;
    const genreCategories = genres.map(genre => `<category scheme='http://www.blogger.com/atom/ns#' term='${genre}'/>`).join('');

    const xmlTemplate = `<?xml version='1.0' encoding='utf-8'?>
      <feed xmlns='http://www.w3.org/2005/Atom' xmlns:openSearch='http://a9.com/-/spec/opensearchrss/1.0/' xmlns:gd='http://schemas.google.com/g/2005' xmlns:thr='http://purl.org/syndication/thread/1.0'>
        <id>tag:blogger.com,1999:blog-8199026139722699732.archive</id>
        <updated>2024-09-04T04:16:36.858-07:00</updated>
        <title type='text'>MyBerkas</title>
        <link rel='self' type='application/atom+xml' href='https://www.blogger.com/feeds/8199026139722699732/archive'/>
        <author><name>Tulang Punggung</name></author>
        <generator version='7.00' uri='https://www.blogger.com'>Blogger</generator>
        
        <entry>
          <id>tag:blogger.com,1999:blog-8199026139722699732.post-1726797376610309691</id>
          <published>2024-08-29T18:45:00.000-07:00</published>
          <updated>2024-08-29T18:50:18.515-07:00</updated>
          <category scheme='http://schemas.google.com/g/2005#kind' term='http://schemas.google.com/blogger/2008/kind#post'/>
          ${genreCategories}
          <title type='text'>${englishTitle}</title>
          <content type='html'></content>
          <link rel='replies' type='application/atom+xml' href='https://folderku-sa.blogspot.com/feeds/1726797376610309691/comments/default' title='Post Comments'/>
          <link rel='replies' type='text/html' href='https://folderku-sa.blogspot.com/2024/08/oshi-no-ko-2nd-season.html#comment-form' title='0 Comments'/>
          <link rel='edit' type='application/atom+xml' href='https://www.blogger.com/feeds/8199026139722699732/posts/default/1726797376610309691'/>
          <link rel='self' type='application/atom+xml' href='https://www.blogger.com/feeds/8199026139722699732/posts/default/1726797376610309691'/>
          <link rel='alternate' type='text/html' href='https://folderku-sa.blogspot.com/2024/08/oshi-no-ko-2nd-season.html' title='"Oshi no Ko" 2nd Season'/>
          <author>
            <name>Tulang Punggung</name>
            <uri>https://www.blogger.com/profile/00337368438897436583</uri>
            <email>noreply@blogger.com</email>
            <gd:image rel='http://schemas.google.com/g/2005#thumbnail' width='24' height='32' src='//blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCith-_tHaABD8VAE8TNnbgErYqRGBBhF83Pga1UqWDYSzXjYq0lOSCvwju5qSbjrA-rgroAa6i0pACDUmw8MXFhCeik_fBgBPQLb4uuLBZj5Iwu6XThYL6ZQaZjpfXqfN5UjV4pEyYN4nCSIGGp_uKEPNYIm3wfwJeGvcVZTysb-2g6w/s220/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg'/>
          </author>
          <thr:total>0</thr:total>
        </entry>
      </feed>`;

    document.getElementById("output-xml").value = xmlTemplate;
  } catch (error) {
    alert("Error parsing JSON. Please check the format.");
  }
});

// Download XML
document.getElementById("download-xml").addEventListener("click", function () {
  const xmlContent = document.getElementById("output-xml").value;

  // Buat blob dari konten XML
  const blob = new Blob([xmlContent], { type: 'application/xml' });

  // Buat link download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "output.xml";  // Nama file yang akan diunduh
  link.click();

  // Membersihkan object URL setelah selesai
  URL.revokeObjectURL(link.href);
});
