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
      callback(data);
    })
  });
}

function apiUploadFile(username, fileName, originalName, fileText) {
  getAccessToken(localStorage.getItem("refresh_token"), (data) => {
    fetch('http://127.0.0.1:8000/api/upload_file/', {
      headers: {
          'Authorization': `Bearer ${data["access"]}`
      },
      method: 'POST',
      body: JSON.stringify({"fileName": fileName, "username": username, "originalName": originalName, "fileText": fileText})
    })
    .then(res => res.json())
    .then(data => {
      alert("File uploaded")
      window.location.href = "/account";
    })
  });
}

function apiRegister(username, password, fullname, email, date_of_birth) {
  fetch('http://127.0.0.1:8000/api/register/', {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    method: 'POST',
    body: JSON.stringify({"username": username, "password": password, "first_name": fullname, "last_name": date_of_birth, "email": email})
  })
  .then(res => {
    if (res.ok) {
        return res.json();
    } else {
        alert("Something wrong (probably email)")
        return;
    }
  })
  .then(data => {
    if (!data) return;
    console.log(data);
    alert("User registered")
    window.location.href = "/login";
  })
}

function apiDownloadFile(fileId) {
  fetch('http://127.0.0.1:8000/api/get_file/', {
    headers: {
    },
    method: 'POST',
    body: JSON.stringify({"id": fileId})
  })
  .then(res => res.json())
  .then(data => {
    let fileContent = data["content"];
    let fileName = data["original_name"];
    let fileExtension = data["extension"];
  
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
  })
}

function apiDeleteFile(fileId) {
  getAccessToken(localStorage.getItem("refresh_token"), (data) => {
    fetch('http://127.0.0.1:8000/api/delete_file/', {
      headers: {
          'Authorization': `Bearer ${data["access"]}`
      },
      method: 'POST',
      body: JSON.stringify({"id": fileId})
    })
    .then(res => res.json())
    .then(data => {
      window.location.href = "/account";
    })
  });
}

function apiSearch(fileName, author, dateFrom, dateTo, callback) {
  //getAccessToken(localStorage.getItem("refresh_token"), (data) => {
    fetch('http://158.160.14.47:8000/api/search/', {
      headers: {
      },
      method: 'POST',
      body: JSON.stringify({"fileName": fileName,
                            "author": author,
                            "dateFrom": dateFrom,
                            "dateTo": dateTo})
    })
    .then(res => res.json())
    .then(data => {
      callback(data);
    })
  //});
}

module.exports = { apiLogin, apiGetUserData, apiGetUserFiles, apiUploadFile, apiRegister, apiDownloadFile, apiDeleteFile, apiSearch };
