import { useForm } from 'react-hook-form';
import { apiSearch, apiDownloadFile } from '../api/Api';

function searchHandler(data) {
  let searchResults = apiSearch(data["filename"], data["author"], data["datefrom"], data["dateto"]);
  localStorage.setItem("searchresult", JSON.stringify(searchResults));
  window.location.href = "/search";
}

function downloadFile(fileId) {
  apiDownloadFile(fileId);
}

function Search(props) {
  const {
    register,
    handleSubmit
  } = useForm();

  let searchResults = JSON.parse(localStorage.getItem("searchresult"));
  return (
    <table style={{'tableLayout': 'fixed', 'width': '100%', 'height': '100%'}}>
      <tbody>
        <tr style={{"height": "66%"}}>
          <td style={{"width": "30%"}}>
          <form onSubmit={handleSubmit(searchHandler)}>
              <div>
                  <label>Название файла</label>
                  <input {...register('filename')} />
              </div>
              <div>
                  <label>Автор</label>
                  <input {...register('author')} />
              </div>
              <div>
                  <label>Дата (от)</label>
                  <input type="date" {...register('datefrom')} />
              </div>
              <div>
                  <label>Дата (по)</label>
                  <input type="date" {...register('dateto')} />
              </div>
              <button>Search</button>
            </form>
          </td>
          <td style={{"width": "60%"}}>
            {searchResults.map(elem => (
              <div key={elem.id}>
                <p>Название файла: {elem.filename}. Author: {elem.author}.</p>
                <button onClick={() => downloadFile(elem.id)}>Скачать</button>
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Search;
