import React from 'react';
import '../css/address-list.less';

export default ({user, setLocation, ra}) => (
    <li className={user.type} onClick={setLocation}>
        <div className='grid-row'>
            <div className="col-3-12--sm">
                <img src={user.picture}/>
            </div>
            <div className="col-8-12--sm">
                <p>{user.name.first}, {user.name.last}</p>
                <p className="user-address">{user.address}</p>
                <small>{user.position.lat}</small>
                <small>{user.position.lon}</small>
            </div>
            <div onClick={ra} className="col-1-12--sm">
                <p id={user.id} class="remove-address"> X </p>
            </div>
        </div>
    </li>
);