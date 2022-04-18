import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import request from '../../util/axios'
import ProfilePosts from './ProfilePosts'

import './Profile.css'
function Profile({token, auth}) {
    const username = useSelector(state => state.authReducer.username);

    const [feed, selectPosts] = useState({}); 

    useEffect(() => {
        console.log(token); 
        request("profile", {username, token}, function(data, err) {
            if(data) {
                console.log(data); 
                selectPosts(data); 
            } else {
                console.log("Something went wrong at profile component"); 
                console.log(err); 
            }
        })
    }, [1])

    if(Object.keys(feed).length == 0) {
        return (
            <div className = "profileLoading">
                <h3>Loading...</h3>
            </div>
        )
    }
    return (
        <div>
            <div className = "profilePosts">
                <div className = "profileMessage">
                    <h2>Hey! <h3 className = "profileUsername">{"@" + auth.username}</h3></h2>
                    {(Object.keys(feed.data.posts).length == 0) ? <h3>You have no posts </h3>: <h3>Your posts so far!</h3>}
                </div>
                <ProfilePosts posts = {feed.data.posts} token = {token}/>
            </div>
        </div>
    )
}

export default Profile; 