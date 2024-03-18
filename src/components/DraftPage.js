import './Draft_Page.css';
import React from 'react';
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
const DraftPage = ({ List_items, GetCity, DeleteCity }) => {
    // Navigate to Home after select the city
    const NavigateTo = useNavigate();
    function GotoHome() {
        setTimeout(() => {
            NavigateTo('/')
        }, 200);
    }
    return (
        <div className='Draft-Page' id='DraftPage'>
            <div className="Draft-Container">
                <div className="Draft-Page-Header">
                    <Link to={'/'}>
                        <FaArrowLeft className='Back-Home-Btn' />
                    </Link>
                    <h1 className='DP-Heading'>Your Drafts</h1>
                </div>
                <div className="Draft-Box-Container">
                    {
                        List_items.map((Each, index) =>
                        (
                            <div key={index} className='EachCity-Box'>
                                <div onClick={() => { GetCity(Each.Name); GotoHome() }}>
                                    <h1>{Each.Name}</h1>
                                </div>
                                <div key={index} className="trash-div" onClick={() => DeleteCity(index)}>
                                    <FaTrash onClick={() => DeleteCity(index)}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DraftPage