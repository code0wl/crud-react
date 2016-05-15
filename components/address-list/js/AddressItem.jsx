import React from 'react';
import '../css/address-list.less';

export default ({user, setLocation, ra, ef}) => (
    <li className={user.type} onClick={setLocation}>
        <div className='grid-row'>
            <div className="col-3-12--sm">
                <img src={user.picture}/>
            </div>
            <div className="col-8-12--sm">
                <p>{user.name.first}, {user.name.last}</p>
                <p data-coors={[user.position.lon, user.position.lat]} className="user-address">{user.address}</p>
            </div>
            <div className="col-1-12--sm">
                <ul className="meta-data">
                    <li onClick={ra} id={user.id} className="remove-address"> X </li>
                    <li onClick={ef} id={user.id} className="edit-address"> ✎ </li>
                </ul>
            </div>
        </div>
    </li>
);