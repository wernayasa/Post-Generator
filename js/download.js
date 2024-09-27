
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
  