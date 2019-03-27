let state = {
    fields: []
}

const headers = {
  'api-key': apiKey,
  'Content-Type': 'application/json',
};
const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
//const corsAnywhere = '';
const baseUrl = azureSearchUrl;
//=====

const indexes = document.querySelector ('#getIndexes');
const update = document.querySelector ('#updateIndexes');
const tableBody = document.querySelector ('#tableBody');
const inputName = document.querySelector ('#name');
const inputType = document.querySelector ('#type');

indexes.addEventListener ('click', getIndexes);
update.addEventListener ('click', updateIndexes);

function getIndexes () {
  const getIndexesUrl = `${corsAnywhere}${baseUrl}/indexes/hotels?api-version=2017-11-11`;

  axios ({
    method: 'get',
    url: getIndexesUrl,
    headers,
  })
    .then (res => {
      let tbody = '';
      let tBodyHtml = '';
      console.log (res.data);
      state.fields = res.data.fields

      res.data.fields.forEach (field => {
        tBodyHtml += `
        <tr>
            <td>${field.name}</td>
            <td>${field.type}</td>
            <td>${field.facetable}</td>
            <td>${field.filterable}</td>
            <td>${field.indexAnalyzer}</td>
            <td>${field.key}</td>
            <td>${field.retrievable}</td>
            <td>${field.searchAnalyzer}</td>
            <td>${field.searchable}</td>
            <td>${field.sortable}</td>
            <td>${field.synonymMaps.length === 0 ? 'None' : field.synonymMaps.map (s => `<ul><li>${s}</li></ul>`)}</td>
            <td>${field.analyzer}</td>
        </tr>`;
      });
      tableBody.insertAdjacentHTML ('beforeend', tBodyHtml);
      console.log('state = ', state);
    })
    .catch (err => console.log (err));
}

function updateIndexes () {
  const updateIndexeUrl = `${corsAnywhere}${baseUrl}/indexes/hotels?api-version=2017-11-11`;
  if (!inputName.value || !inputType.value) throw new Error('Both input fields need to be filled out!');

  const data = {
      name: 'hotels',
      fields: [
        ...state.fields,
        {
           name: inputName.value,
           type: inputType.value,
        }
      ]
  };

  if (state.fields.length > 0) {
     axios ({
    method: 'put',
    url: updateIndexeUrl,
    headers,
    data,
  })
    .then (res => {
        debugger
      console.log (res);
    })
    .catch (err => console.log (err)); 
  } else {
      throw new Error('First populate all the indexes by clicking on Get Indexes button');
  }
  
}

