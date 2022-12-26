import { useForm } from 'react-hook-form';
import { apiSearch, apiDownloadFile } from '../api/Api';

function searchHandler(data) {
  apiSearch(data["filename"], data["author"], data["datefrom"], data["dateto"], (data => {
    localStorage.setItem("searchresult", JSON.stringify(data));
    window.location.href = "/search";
  }));
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
  if (!searchResults) {
    searchResults = []
  }
  let todate = new Date();
  console.log(todate);
  return (
    <table style={{'tableLayout': 'fixed', 'width': '100%', 'height': '100%'}}>
      <tbody>
        <tr style={{"height": "66%"}}>
          <td style={{"width": "30%"}}>
          <form onSubmit={handleSubmit(searchHandler)}>
              <div>
                  <label style={{"text-align": "left"}}>Название файла</label>
                  <br></br>
                  <input {...register('filename')} />
              </div>
              <p></p>
              <div>
                  <label>Автор</label>
                  <br></br>
                  <input {...register('author')} />
              </div>
              <p></p>
              <div>
                  <label>Дата (от)</label>
                  <br></br>
                  <input type="date" value="1900-01-01" {...register('datefrom')} />
              </div>
              <p></p>
              <div>
                  <label>Дата (по)</label>
                  <br></br>
                  <input type="date" value={{todate}} {...register('dateto')} />
              </div>
              <p></p>
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
