import React from 'react';
import AddressItem from './AddressItem';
import ModalHeader from '../../modal-header/js/ModalHeader';
import '../css/address-list';

export default ({users, modalTitle, setLoc, removeAddress}) => {

    let userMarkup = [];

    users.map((item) => {
        userMarkup.push(<AddressItem ra={removeAddress} setLocation={setLoc} user={item} key={userMarkup.length}/>);
    });

    return (
        <div className="list-view">
            <ModalHeader modalTitle={modalTitle}/>
            <ul className="users">
                {userMarkup}
            </ul>
        </div>
    );
}

