import React from 'react';
import Header from '../view/Header';
import Footer from '../view/Footer';
import Main from '../view/Main';


const MainPage : React.FC<{}> = ()=>{
    return (
        <React.Fragment>
            <Header/>
            <Main>
                Shit
            </Main>
            <Footer/>
        </React.Fragment>
    );
}

export default MainPage;