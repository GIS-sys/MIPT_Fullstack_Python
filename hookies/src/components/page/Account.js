import { useForm } from 'react-hook-form';
import { apiGetUserFiles, apiUploadFile, apiDownloadFile, apiDeleteFile } from '../api/Api';

async function addFileHandler(data) {
  let originalName = data.file.item(0).name;
  const fileText = await data.file.item(0).text();
  apiUploadFile(localStorage.getItem("username"), data.filename, originalName, fileText);
}

function signOut() {
  localStorage.setItem("is_authorized", "");
  window.location.href = "/";
}

function downloadFile(fileId) {
  apiDownloadFile(fileId);
}

function deleteFile(fileId) {
  apiDeleteFile(fileId);
}

function Account(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  apiGetUserFiles((data) => {
    let last = localStorage.getItem("myfiles");
    localStorage.setItem("myfiles", JSON.stringify(data));
    if (last != localStorage.getItem("myfiles")) window.location.href = "/account";
  });
  console.log(localStorage.getItem("myfiles")[1]);
  let files = JSON.parse(localStorage.getItem("myfiles"));
  if (!files) {
    files = []
  }
  return (
    <table style={{'tableLayout': 'fixed', 'width': '100%', 'height': '100%'}}>
      <tbody>
        <tr style={{"height": "66%"}}>
          <td style={{"width": "30%"}}>
            <div><p>Логин: {localStorage.getItem("username")}</p></div>
            <div><p>Email: {localStorage.getItem("email")}</p></div>
            <div><p>Полное имя: {localStorage.getItem("fullname")}</p></div>
            <div><p>Дата рождения: {localStorage.getItem("date_of_birth")}</p></div>
            <button onClick={signOut}>Выйти из аккаунта</button>
          </td>
          <td rowSpan="2" style={{"width": "60%"}}>
            {files.map(elem => (
              <div key={elem.id}>
                <p>{elem.filename}</p>
                <button onClick={() => downloadFile(elem.id)}>Скачать</button>
                <button onClick={() => deleteFile(elem.id)}>Удалить</button>
              </div>
            ))}
          </td>
        </tr>
        <tr style={{"height": "33%"}}>
          <td style={{"width": "30%"}}>
            <form onSubmit={handleSubmit(addFileHandler)}>
              <div>
                  <label>Название файла</label>
                  <input {...register('filename', { required: true })} />
                  {errors.filename && <p>Filename is required.</p>}
              </div>
              <div>
                  <label>Файл</label>
                  <input type='file' {...register('file', { required: true })} />
                  {errors.file && <p>File is required.</p>}
              </div>
              <button>Загрузить файл</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Account;
