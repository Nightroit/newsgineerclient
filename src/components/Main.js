import request from '../util/axios'
import react, { useEffect, useState } from 'react'; 
import NavBar from './Post/NavBar';
import { connect } from 'react-redux';
import * as actions from '../actions/index'

import Posts from './Post/Posts';
import CreatePost from '../components/Draft/CreatePost'
import ShortLister from './Sidebar/ShortLister'
import Profile from './Profile/Profile'
import './Main.css'

function postSortComp(a, b) {
    if(a.upVotes.length > b.upVotes.length) return true; 
    return false; 
}

function Main({type, filterPost, page, token, filter, auth, logout}) {
    const [feed, setFeed] = useState({});
    const [isLoading, setIsloading] = useState(true); 
    const [pageNo, setPageNo] = useState(0);

    function navigatePlus() {
        let val = pageNo + 14
        setPageNo(val)
    }
    
    function navigateMinus() {
        let val = pageNo - 14
        setPageNo(val)
          
    }
    function requestFeed() {
        request("feed", {token: localStorage.getItem('token'), pageNo}, function(data, err) { 
            if(data) {
                data.data.sort((a, b) => (a.upVotes.length > b.upVotes.length) ? -1 :  1); 
                setFeed(data);
            }
        })
    }
    useEffect(() => {
        if(filter != "") {
            if(filter == "All") {
                requestFeed(); 
            } else {
                request("categoryFilter",  {category: filter, token: localStorage.getItem('token')}, function(data, err) {
                if(data) {
                    setFeed(data);  
                }})
            }
        }
    }, [filter])

    useEffect(() => {
        if(Object.keys(feed).length != 0) {
            setIsloading(false)
        }
    }, [feed])
    
    useEffect(() => { 
        requestFeed(); 
    }, [pageNo])
    

    if(isLoading) {
        return(
            <div>
                Loading...
            </div>
        )
    }

    return (
        
        <div className = "main_head">
            <NavBar type = {type} auth = {auth} logout = {logout}/>

            <main>
                <div className = "main_sidebar">
                    <ShortLister filterPost = {filterPost} setFeed = {setFeed}/>
                </div>
                <div className = "main_post" >
                    {(page == "post") ? <CreatePost/> : ""}
                    {(page == "news") ? <Posts feed = {feed} auth = {auth}/> : ""}
                    {(page == "profile") ? <Profile token = {token} auth = {auth}/> : ""}
                    <span className = "main_navigate_span">
                    {(pageNo > 0 ) ? <a target = "_blank" onClick = {navigateMinus} className = "main_navigate">Back</a> : ''}
                    &nbsp;&nbsp;
                       { (feed.data.length == 14 && page == "news")? <a target = "_blank" onClick = {navigatePlus} className = "main_navigate">Next</a> : "" } 
                    
                    </span>
                </div>
            </main>
        </div>
    )
}

const mapDispatchToProps = {
    type: actions.type,
    filterPost: actions.filterPost, 
    logout: actions.logout
  }
  
  const mapStateToProps = (store) => {
    return {
        page: store.pageReducer, 
        filter: store.postReducer, 
        auth: store.authReducer,
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);
