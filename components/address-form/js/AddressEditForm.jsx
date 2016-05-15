import React, {Component} from 'react';
import ModalHeader from '../../modal-header/js/ModalHeader';
import '../css/address-form';

export default class AddressEditForm extends Component {

    constructor(props){
        super();
    }

    render() {

        return (
            <div className="edit-view">
                <ModalHeader modalTitle={this.props.modalTitle}/>
                <section className="address-form">
                    <form id="edit-address" onSubmit={this.props.submit} autocomplete='off'>
                        <div className="grid-row">
                            <div className="col-5-12--sm">
                                <label>
                                    <input type="text" id="user-firstname" placeholder="Firstname" required/>
                                </label>
                            </div>
                            <div className="col-1-12--sm"></div>
                            <div className="col-6-12--sm">
                                <label>
                                    <input type="text"  id="user-lastname" placeholder="Surname" required/>
                                </label>
                            </div>
                        </div>

                        <div className="input-group-select">
                            <label>
                                <select id="user-type">
                                    <option> Business</option>
                                    <option> Home</option>
                                </select>
                            </label>
                        </div>

                        <label>
                            <input type="text" id="user-address" placeholder="Address"/>
                        </label>

                        <div className="input-group">
                            <div className="grid-row align-right">
                                <div class="col-5-12--sm">
                                    <button className="btn btn-primary">Edit Address</button>
                                </div>
                                <div class="col-5-12--sm">
                                    <button onClick={this.props.cancel} className="btn btn-default">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>

        );
    }
}