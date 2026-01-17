import {useEffect} from 'react';

import type {homePropsI} from './types';
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/search-icon.svg';

import "../../Styles/home.css";

const Home = (props: homePropsI) => {
    const {title} = props;

    useEffect(()=>{
        if (title) {
            document.title = title;
        } else {
            document.title = "Home";
        }
    },[title])

    return <div className="page-container">
        <div className="page-content">
            <div className="logo-container">
                <img alt="logo" src={logo}/>
            </div>
            <div className="title-container">
                <h1>DIAGNOSTIC WEBSITE</h1>
            </div>
            <div className="tool-container">
                <div className="input-container">
                    <input type="text" placeholder='introdu link-ul website-ului tau'/>
                    <button>
                        START DIAGNOSTIC
                        <img alt="search icon" src={searchIcon}/>
                    </button>
                </div>
                <div className="agreement-input-container">
                    <input type="checkbox"/>
                    <a href="/termeni-si-conditii">Sunt de acord cu Termeni și condițiile</a>
                </div>
            </div>
        </div>
    </div>;
}

export {Home};