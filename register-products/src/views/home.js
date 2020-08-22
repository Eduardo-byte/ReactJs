import React from 'react'

function Home() { 
    return(
        <div className="jumbotron">
            <h1 className="display-3">Welcome to my first ReactJs App!</h1>
            <p className="lead">This is a Product Register, use the Navbar to access all pages.</p>
            <hr className="my-4" />
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="/#/regist-products" role="button">Regist</a>
            </p>
        </div>
    )
 }

 export default Home