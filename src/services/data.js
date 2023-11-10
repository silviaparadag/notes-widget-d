// import data from '../../api/db.json';

// https://silviaparadag.github.io/api-sp/notes-widget/notes-api.json

/* 
.then((data) => {
      const apiNotes = data.notes.map((cleanApiNotes) => cleanApiNotes);
      console.log(apiNotes);
      return apiNotes;
    })
    
    */
const getNotesFromApi = () => {
  return fetch(
    'https://silviaparadag.github.io/api-sp/notes-widget/notes-api.json'
  ).then((response) => response.json());
};

export default getNotesFromApi;
