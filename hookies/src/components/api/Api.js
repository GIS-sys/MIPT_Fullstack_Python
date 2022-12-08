function getAccessToken(refreshToken, callback) {
  fetch('http://127.0.0.1:8000/auth_api/refresh',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({"refresh": refreshToken})
})
.then(res => res.json())
.then(data => callback(data))
}

function apiLogin(username, password) {
  fetch('http://127.0.0.1:8000/auth_api/token',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({"username": username, "password": password })
  })
  .then(res => res.json())
  .then(data => {
    if (data["detail"]) {
      alert("Wrong username or password");
      return;
    }
    localStorage.setItem("refresh_token", data["refresh"]);
    localStorage.setItem("is_authorized", "authorized");
    localStorage.setItem("username", username);
    apiGetUserData((data) => {
      console.log("userdata" + data);
      localStorage.setItem("email", data["email"]);
      localStorage.setItem("fullname", data["fullname"]);
      localStorage.setItem("date_of_birth", data["date_of_birth"]);
      window.location.href = "/account";
    });
  })
}

function apiGetUserData(callback) {
  //return {"email": "api_user_email", "fullname": "api_user_fullname", "date_of_birth": "api_user_date_of_birth"};
  getAccessToken(localStorage.getItem("refresh_token"), (data) => {
    fetch('http://127.0.0.1:8000/api/userinfo/', {
      headers: {
          'Authorization': `Bearer ${data["access"]}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log("getuserdata" + data);
      callback(data);
    })
  });
}


function apiGetUserFiles(callback) {
  getAccessToken(localStorage.getItem("refresh_token"), (data) => {
    fetch('http://127.0.0.1:8000/api/userfiles/', {
      headers: {
          'Authorization': `Bearer ${data["access"]}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log("getuserdata" + data);
      callback(data);
    })
  });
}

function apiUploadFile(username, fileName, originalName, fileText) {
  alert("Загружаем файл " + originalName + " (также известен как " + fileName + ") для юзера " + username + " с текстом:\n" + fileText);
}

function apiRegister(username, password, fullname, email, date_of_birth) {
  return 1;
}

function apiDownloadFile(fileId) {
  let fileContent = "contentfromsite" + fileId;
  let fileName = "filename.fromsite";
  let fileExtension = ".txt";

  const file = new File([fileContent], fileName + fileExtension, {
    type: 'text/plain',
  })
  const link = document.createElement('a');
  const url = URL.createObjectURL(file);
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

function apiDeleteFile(fileId) {
  getAccessToken(localStorage.getItem("refresh_token"), (data) => {
    fetch('http://127.0.0.1:8000/api/delete_file/', {
      headers: {
          'Authorization': `Bearer ${data["access"]}`
      },
      method: 'POST',
      body: JSON.stringify({"file": fileId})
    })
    .then(res => res.json())
    .then(data => {
      alert("File deleted")
      window.location.href = "/account";
    })
  });
}

function apiSearch(fileName, author, dateFrom, dateTo) {
  return [
    {"id": "1", "filename": "просто_приставка_вначале_" + fileName, "author": author},
    {"id": "2", "filename": fileName, "author": "просто_приставка_вначале_" + author}
  ];
}

module.exports = { apiLogin, apiGetUserData, apiGetUserFiles, apiUploadFile, apiRegister, apiDownloadFile, apiDeleteFile, apiSearch };
