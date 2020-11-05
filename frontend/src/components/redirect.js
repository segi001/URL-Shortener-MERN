import React from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';

var API_URL = process.env.REACT_APP_API_URL;
var REACT_URL = process.env.REACT_APP_URL;;

const URLRedirect = ({match}) =>{ 

    function redirect() {
        if (match.params.token != undefined) {
            $.ajax({
                async : false,
                url : API_URL+match.params.token,
                method : 'get',
                success : function(res) {
                    if (res.status==404) {
                        alert("False URL token. Please shorten your URL and use that token");
                        window.location.href=REACT_URL;
                    } else {
                        window.location.replace(res.url);
                    }
                },
                error : function() {
                    alert("False URL token. Please shorten your URL and use that token");
                    window.location.href=REACT_URL;
                }
            })
        }
    }

    return (
        <div>
            {redirect()}
        </div>
    )
}

export default URLRedirect;