function qwe() {
  fetch('http://127.0.0.1:8000/auth_api/token',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: '{"username": "admin", "password": "admin" }'
})
.then(res => res.json())
.then(data => console.log(data))
}

function Home(props) {
  return (
    <table style={{'tableLayout': 'fixed', 'width': '100%', 'height': '100%'}}>
      <tbody>
        <tr>
          <td style={{"width": "30%"}}>
            <b>Добро пожаловать на наш сайт!</b>
          </td>
          <td colSpan="2" style={{"width": "60%"}}>
            <p>Данный сайт представляет собой открытое хранилище данных для сохранения информации в облаке и пересылке файлов друг другу.</p>
            <p>Искать и скачивать могут все.</p>
            <p>Загружать - только авторизованные пользователи</p>
          </td>
        </tr>
        <tr>
          <td colSpan="2" style={{"width": "60%"}}>
            <p>Сделано для курса МФТИ по фулл-стек разработке</p>
            <p>Разработано с использованием Django, PSQL и React</p>
          </td>
          <td style={{"width": "30%"}}>
            <p>Егоров Гордей Андреевич</p>
            <p>студент 3 курса МФТИ</p>
            <button onClick={qwe}></button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Home;
