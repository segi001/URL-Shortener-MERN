import React from 'react';
import {Form,
        Button,
        Alert,
        Image} from 'react-bootstrap';
import $ from 'jquery';
import SecureLS from 'secure-ls';

import 'bootstrap/dist/css/bootstrap.css';

require('dotenv').config();

var API_URL = process.env.REACT_APP_API_URL;
var REACT_URL = process.env.REACT_APP_URL;
var API_KEY = process.env.REACT_APP_API_KEY;
var ls = new SecureLS();

const Home = ({match}) => {

    var URLRef = React.createRef();
    var elementArray = [];

    function handleURLInput() {
        return URLRef.current.value;
    }

    function shortenURL(e,url) {
        e.preventDefault();
        var payload = {};
        payload['url'] = url;
        var stringPayload = JSON.stringify(payload);

        $.ajax({
            method : 'POST',
            async : false,
            url : API_URL+'?apiKey='+API_KEY,
            dataType : 'json',
            contentType : 'application/json',
            data : stringPayload,
            success : function(result) {
                ls.set('token',{data:result.token});
                console.log(ls.get('token'));
                window.location.reload();
            },
            error : function() {
                alert("Please enter valid URL");
            }
        });
    }

    if (ls.get('token').data != undefined) {
        elementArray.push(
            <Alert variant="primary" style={{margin : '0px 50px 50px 50px'}}>
                Your URL : {REACT_URL+ls.get('token').data}
                <Button style={{float:'right',position:'relative',bottom:'7px'}} onClick={(e)=>{window.location.reload()}} className="mr-auto d-block" >Click here to shorten another link!</Button>
            </Alert> 
        );
        setTimeout(ls.removeAll(),5000);
    } else {
        elementArray.push(
            <Alert variant='primary' style={{margin : '0px 50px 50px 50px'}}>
                Your shorten URL will appear here!
            </Alert>
        )
    }
    
    return (
        <div style={{backgroundColor:'#678aeb',height:'100vh'}}>
            <Image style={{width:'200px',position:'relative',top:'5vh'}} className="mx-auto d-block" src='https://img.talkandroid.com/uploads/2014/03/google_url_shortener_app_icon-450x450.png' />                
            <div className="mx-auto" style={{backgroundColor:'white',position:'relative',top:'15vh',width:'50vw',border:'10px #245af0 solid',borderRadius:'20px'}}>
                <Form style={{padding : '50px 50px 50px 50px'}}>
                <Form.Group controlId="formBasicURL">
                    <Form.Label>URL:</Form.Label>
                    <Form.Control onInput={handleURLInput} ref={URLRef} type="text" placeholder="Shorten your url!" />
                </Form.Group>

                <Button onClick={(e)=>{shortenURL(e,URLRef.current.value)}} variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
                {elementArray}
            </div>
        </div>
    )
}

export default Home;