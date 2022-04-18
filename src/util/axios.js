import axios from 'axios'

export default function(type, data, callback) {
  
    if(type == "post") {

        axios.post('https://newsgineer.herokuapp.com/api/post', {content: data.content}, {
            headers: {
                'Authorization': `${data.token}` 
              }
        }).then((data) => {
            callback(data, null); 
        }).catch((err) => {
            callback(null, err); 
        })
   
    } else if(type == "deletePost") {
        axios.post('https://newsgineer.herokuapp.com/api/deletePost', {postId: data.postId}, {
            headers: {
                'Authorization': `${data.token}` 
              }
        }).then((data) => {
            callback(data, null); 
        }).catch((err) => {
            callback(null, err); 
        })
    }
    else if(type == "timeFilter") {
        axios.post('https://newsgineer.herokuapp.com/api/', {last: data}, {
            headers: {
                'Authorization': `${data.token}` 
              }
        }).then((data) => {
            callback(data, null); 
        }).catch((err) => {
            callback(null, err); 
        })

    } else if(type == "profile") {
        axios.post("https://newsgineer.herokuapp.com/api/profile", {username: data.username}, {
            headers: {
                'Authorization': `${data.token}` 
              }
        }).then(data => {
            callback(data, null); 
        }).catch(err => {
            callback(null, err); 
        })
    }
    else if(type == "like") {
        axios.post('https://newsgineer.herokuapp.com/api/like', {postId: data.postId, username: data.username}, {
            headers: {
                'Authorization': `${data.token}` 
              }
        }).then((data) => {
            callback(data, null); 
        }).catch((err) => {
            callback(null, err); 
        })
    }
    else if(type == "feed") {
        axios.post('https://newsgineer.herokuapp.com/api/', {skip: data.pageNo}, { headers: {"Authorization" : `${data.token}`} })
            .then((data) => {
                callback(data, null) 
            });

    }
    else if(type == "categoryFilter") {
   
        axios.post('https://newsgineer.herokuapp.com/api/', {category: data.category}, {
            headers: {
                'Authorization': `${data.token}` 
              }
        }).then((data) => {
            callback(data, null); 
        }).catch((err) => {
            callback(null, err); 
        })
    } 
    else if(type == "login") {
 
        axios.post('https://newsgineer.herokuapp.com/api/users/login', {
            username: data.username, 
            password: data.password
        })
        .then(data => {
            callback(data, null);
        })
        .catch(err => {

            callback(null, err);
        })
    } 
    else {
        axios.post('https://newsgineer.herokuapp.com/api/users/register', {
            name: data.username,
            email: data.email, 
            password: data.password, 
            password2: data.confirmPassword
        })
        .then(res => {
            if(res.data.alreadyExists) {
                callback(null, "Username already exists")
            } else  callback(res, null);
        })
        .catch(err => {
            callback(null, err);
        })
    }
}