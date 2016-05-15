import React from 'react';
import '../css/modal_menu';

export default ({closeDialog, setUserView, setListView, count}) => (
    <ul className="modal-menu">
        <li onClick={closeDialog} role="button" className="icon close">x</li>
        <li onClick={setUserView} role="button" className="icon add"></li>
        <li onClick={setListView} role="button" className="icon list">
            <span className="total-users"> {count} </span>
        </li>
    </ul>
);