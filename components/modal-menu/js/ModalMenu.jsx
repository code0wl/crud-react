import React from 'react';
import '../css/modal_menu';

export default ({setUserView, setListView, count}) => (
    <ul className="modal-menu">
        <li onClick={setUserView} role="button" className="icon add"></li>
        <li onClick={setListView} role="button" className="icon list">
            <span className="total-users"> {count} </span>
        </li>
    </ul>
);
