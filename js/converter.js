// Fungsi untuk mendapatkan tanggal saat ini dalam format ISO dengan timezone offset
function getCurrentDateTime() {
  const now = new Date();

  // Ambil komponen-komponen dari waktu
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Format milidetik dan zona waktu
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  // Offset zona waktu dalam format ±HH:MM
  const timezoneOffsetMinutes = now.getTimezoneOffset();
  const offsetHours = String(Math.abs(Math.floor(timezoneOffsetMinutes / 60))).padStart(2, '0');
  const offsetMinutes = String(Math.abs(timezoneOffsetMinutes % 60)).padStart(2, '0');
  const timezoneOffset = (timezoneOffsetMinutes > 0 ? '-' : '+') + offsetHours + ':' + offsetMinutes;

  // Gabungkan semua bagian untuk membentuk tanggal dalam format yang diinginkan
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffset}`;

  return {
    published: formattedDateTime, // Output sesuai format
    updated: formattedDateTime
  };
}


  // Fungsi untuk melakukan escaping karakter HTML
  function escapeHtml(html) {
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Konversi JSON ke XML
  document.getElementById("convert-button").addEventListener("click", function () {
    const inputJson = document.getElementById("output-json").value;

    try {
      const jsonData = JSON.parse(inputJson);
      const englishTitle = jsonData.data.Media.title.english;
      const genres = jsonData.data.Media.genres;
      let description = jsonData.data.Media.description || 'No description available';
      const coverImageExtraLarge = jsonData.data.Media.coverImage.extraLarge || 'https://default-url-to-image.jpg';

      // Escape HTML tags in description
      description = escapeHtml(description);

      const genreCategories = genres.map(genre => `<category scheme='http://www.blogger.com/atom/ns#' term='${genre}'/>`).join('');

      // Mendapatkan tanggal saat ini
      const currentDateTime = getCurrentDateTime();

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
            <published>${currentDateTime.published}</published>
            <updated>${currentDateTime.updated}</updated>
            <category scheme='http://schemas.google.com/g/2005#kind' term='http://schemas.google.com/blogger/2008/kind#post'/>
            ${genreCategories}
            <title type='text'>${englishTitle}</title>
            <content type='html'>
            
&lt;!--[ Synopsis ]--&gt;
&lt;div id="synopsis"&gt;
&lt;p&gt;
${description}
&lt;/p&gt;

&lt;/div&gt;

&lt;span&gt;&lt;!--more--&gt;&lt;/span&gt;

&lt;!--[ Thumbnail ]--&gt;
&lt;div class="separator" style="clear: both;"&gt;&lt;a href="${coverImageExtraLarge}" style="display: block; padding: 1em 0; text-align: center; "&gt;&lt;img alt="" border="0" height="200" data-original-height="600" data-original-width="424" src="${coverImageExtraLarge}" /&gt;&lt;/a&gt;&lt;/div&gt;

            </content>
          </entry>
        </feed>`;

      document.getElementById("output-xml").value = xmlTemplate;

      // Enable the "Add Entry" button after successful conversion
      document.getElementById("add-entry").disabled = false;

    } catch (error) {
      alert("Error parsing JSON. Please check the format.");
    }
  });

  // Fungsi untuk menambahkan <entry> baru ke XML
  document.getElementById("add-entry").addEventListener("click", function () {
    const outputXml = document.getElementById("output-xml").value;
    const inputJson = document.getElementById("output-json").value;

    try {
      const jsonData = JSON.parse(inputJson);
      const englishTitle = jsonData.data.Media.title.english;
      const genres = jsonData.data.Media.genres;
      let description = jsonData.data.Media.description || 'No description available';
      const coverImageExtraLarge = jsonData.data.Media.coverImage.extraLarge || 'https://default-url-to-image.jpg';

      description = escapeHtml(description);
      const genreCategories = genres.map(genre => `<category scheme='http://www.blogger.com/atom/ns#' term='${genre}'/>`).join('');

      const newEntry = `<entry>
            <id>tag:blogger.com,1999:blog-8199026139722699732.post-1726797376610309691</id>
            <published>${getCurrentDateTime().published}</published>
            <updated>${getCurrentDateTime().updated}</updated>
            <category scheme='http://schemas.google.com/g/2005#kind' term='http://schemas.google.com/blogger/2008/kind#post'/>
            ${genreCategories}
            <title type='text'>${englishTitle}</title>
            <content type='html'>
            
&lt;!--[ Synopsis ]--&gt;
&lt;div id="synopsis"&gt;
&lt;p&gt;
${description}
&lt;/p&gt;

&lt;/div&gt;

&lt;span&gt;&lt;!--more--&gt;&lt;/span&gt;

&lt;!--[ Thumbnail ]--&gt;
&lt;div class="separator" style="clear: both;"&gt;&lt;a href="${coverImageExtraLarge}" style="display: block; padding: 1em 0; text-align: center; "&gt;&lt;img alt="" border="0" height="200" data-original-height="600" data-original-width="424" src="${coverImageExtraLarge}" /&gt;&lt;/a&gt;&lt;/div&gt;

            </content>
          </entry>`;

      // Menambahkan <entry> baru ke akhir XML
      const updatedXml = outputXml.replace('</feed>', `${newEntry}\n</feed>`);
      document.getElementById("output-xml").value = updatedXml;

    } catch (error) {
      alert("Error parsing JSON for new entry.");
    }
  });

