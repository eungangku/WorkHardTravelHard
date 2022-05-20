import { GoogleSpreadsheet } from "google-spreadsheet";

export async function getTodosFromSpreadsheet() {
  const doc = new GoogleSpreadsheet("1Q0qLlqU-pELpxbpDBxwJe0a7S7sfq7E7ELqIvL-PX-w");

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    // env var values are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    client_email: "eungangku@get-apply-ratio.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSH0+z4jN7DwPz\n/MZ8NikXqqb0YUivWh4Bd1qKdehrucEHlLheZE/SXHMkTdLuxoRs46OVSAgPBeKO\nf2VTpx9qFaj9Z4mlWIoEuXzb5wzyl9Xhb0qMx1+qdw/qdCejSGBSpAZHnakOlBDS\nrJTqTSNhmbGkYL5r4b4dS5BYYdw6v4Hm8ZWeploIzImttaWrRaWPsVfdrDobiwmh\no/OB/pyLKOtx0EkrUyDKRlM50pkc9rsdgJofASwmKyeQa35veuODhDI9yVFj/69W\nWyIpDvusZjlnfR6jBirsIzkMBYuAd0ENR2x4e9Sz0q4yGDYWRsez7EbitTbchRrF\nBDzpxnOLAgMBAAECggEADcxgeGTJ5mWlQpWsy0SfXhltU/JuggXeg4Duedi8g+pc\nl1ysia1V+aVlR25Z7Cuu4aF1bGlgPsWYKUtPxDXUj5ilW+3lCkocGRTIUkkKk0tR\n6ncvRlqlZrGA5+uOuqqLqKzN3awTr3QSn/JQIE1Rzquhd3DzSmNc0o4KKW5u9NUa\n13qTijp7SOxYK4+I8F+4cHd1BZlEE5+nNw+QZXsJslykLj6Vr7yo7mqqKX2xdu8a\nrxC8sxg1S4txaYm53r9j5S3G6yFERAxl/fQhVUDZAY79BeN/wZQd+W97XicsUiuO\n3HDlu3OJCMDy7ulaiaAfVn68oElArZB8DXm787w2wQKBgQDMg5C7t/ZqrNj+xhR1\nHIjoj0LqrR1jz0W9+TMPF7sbSbXuqIPX2Yz30OOGR/JtiNAlXFLieHYlSfz3siYr\n7C2XI9MBSo+1sX2dPKiujGvz0sSG51kVj5GnM9cuStIVADuVPywSQ/JedeclNcmi\nB9UutCDoMR+WinNeCkJH4RlauwKBgQC26IuqBW9efiKLUogLzQHQNx8UikhV3HvH\n+XVayezV/3hl0bSh7MWNpFOi/kqbS8OuWLZRQ1ZruG/yYq1sanxDcVrs6C+7oe8q\nMDkAzjadFOU80c2YZ9/dJN0e2Jd+YzoOegiexoirbTAwHBd5YFIswqcIJDNiNdZS\n8dab0NNFcQKBgB9korbuCjldxwF0zncbpjhspUz4veYwTvhWZGwQrHwH2JGF9JcR\nof34ZrSaHrCJq8nQXji9XQVkUhyDkDB11Jm6ug0csOqnEC0uvoXssDWBSQGcSaRx\noV4VKxbEDXOD0aGbTNyQ6YduecjQdN8WbLb6l4KM59hn8EWjNYFrIEU5AoGBAJy2\ne8ttorEMU16ZlNS/jnkucSOxIy7lnOyGcKUb8x6bJzXdye0ep1inXb1+MMAD1yHP\nAk536libCtda8om8ZsGGIshuW09g/EBiVsS46hQGLi7A921IOocIKahfHNV+AOUc\na7xWEA0InUvrFbW58E5HbMNN+PSBeiNQ73ZLImkRAoGAGiqfqqjDRUUkmqUwgkyi\nFhgZ0m0G7xqyCOfjCmkGEG4JO3dR8jZjWPbQSx8dZwhEfrXQie8XonYdPIsUY575\nXZyk6CliNEP0sWAZblOjuB7UC2QHUo2DOCiTZWD8+eFezBaysf5kSbrLc7FHc2zO\nZ/7T/uKL2cDRWjBTmVa02Xw=\n-----END PRIVATE KEY-----\n",
  });

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const rows = await sheet.getRows();

  console.log(rows[0].username); // username
  console.log(JSON.parse(rows[0].data)); // todos stringified object

  return JSON.parse(rows[0].data);
}

export async function saveTodosFromSpreadsheet(todos) {
  const doc = new GoogleSpreadsheet("1Q0qLlqU-pELpxbpDBxwJe0a7S7sfq7E7ELqIvL-PX-w");

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    // env var values are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    client_email: "eungangku@get-apply-ratio.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSH0+z4jN7DwPz\n/MZ8NikXqqb0YUivWh4Bd1qKdehrucEHlLheZE/SXHMkTdLuxoRs46OVSAgPBeKO\nf2VTpx9qFaj9Z4mlWIoEuXzb5wzyl9Xhb0qMx1+qdw/qdCejSGBSpAZHnakOlBDS\nrJTqTSNhmbGkYL5r4b4dS5BYYdw6v4Hm8ZWeploIzImttaWrRaWPsVfdrDobiwmh\no/OB/pyLKOtx0EkrUyDKRlM50pkc9rsdgJofASwmKyeQa35veuODhDI9yVFj/69W\nWyIpDvusZjlnfR6jBirsIzkMBYuAd0ENR2x4e9Sz0q4yGDYWRsez7EbitTbchRrF\nBDzpxnOLAgMBAAECggEADcxgeGTJ5mWlQpWsy0SfXhltU/JuggXeg4Duedi8g+pc\nl1ysia1V+aVlR25Z7Cuu4aF1bGlgPsWYKUtPxDXUj5ilW+3lCkocGRTIUkkKk0tR\n6ncvRlqlZrGA5+uOuqqLqKzN3awTr3QSn/JQIE1Rzquhd3DzSmNc0o4KKW5u9NUa\n13qTijp7SOxYK4+I8F+4cHd1BZlEE5+nNw+QZXsJslykLj6Vr7yo7mqqKX2xdu8a\nrxC8sxg1S4txaYm53r9j5S3G6yFERAxl/fQhVUDZAY79BeN/wZQd+W97XicsUiuO\n3HDlu3OJCMDy7ulaiaAfVn68oElArZB8DXm787w2wQKBgQDMg5C7t/ZqrNj+xhR1\nHIjoj0LqrR1jz0W9+TMPF7sbSbXuqIPX2Yz30OOGR/JtiNAlXFLieHYlSfz3siYr\n7C2XI9MBSo+1sX2dPKiujGvz0sSG51kVj5GnM9cuStIVADuVPywSQ/JedeclNcmi\nB9UutCDoMR+WinNeCkJH4RlauwKBgQC26IuqBW9efiKLUogLzQHQNx8UikhV3HvH\n+XVayezV/3hl0bSh7MWNpFOi/kqbS8OuWLZRQ1ZruG/yYq1sanxDcVrs6C+7oe8q\nMDkAzjadFOU80c2YZ9/dJN0e2Jd+YzoOegiexoirbTAwHBd5YFIswqcIJDNiNdZS\n8dab0NNFcQKBgB9korbuCjldxwF0zncbpjhspUz4veYwTvhWZGwQrHwH2JGF9JcR\nof34ZrSaHrCJq8nQXji9XQVkUhyDkDB11Jm6ug0csOqnEC0uvoXssDWBSQGcSaRx\noV4VKxbEDXOD0aGbTNyQ6YduecjQdN8WbLb6l4KM59hn8EWjNYFrIEU5AoGBAJy2\ne8ttorEMU16ZlNS/jnkucSOxIy7lnOyGcKUb8x6bJzXdye0ep1inXb1+MMAD1yHP\nAk536libCtda8om8ZsGGIshuW09g/EBiVsS46hQGLi7A921IOocIKahfHNV+AOUc\na7xWEA0InUvrFbW58E5HbMNN+PSBeiNQ73ZLImkRAoGAGiqfqqjDRUUkmqUwgkyi\nFhgZ0m0G7xqyCOfjCmkGEG4JO3dR8jZjWPbQSx8dZwhEfrXQie8XonYdPIsUY575\nXZyk6CliNEP0sWAZblOjuB7UC2QHUo2DOCiTZWD8+eFezBaysf5kSbrLc7FHc2zO\nZ/7T/uKL2cDRWjBTmVa02Xw=\n-----END PRIVATE KEY-----\n",
  });

  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const rows = await sheet.getRows();

  rows[0].data = JSON.stringify(todos);
  await rows[0].save(); // save changes
}

// getData();
