import React, {Component} from "react";
import ModalHeader from "../../modal-header/js/ModalHeader";
import "../css/address-form";

export default class AddressEditForm extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="edit-user-view">
                <ModalHeader modalTitle={this.props.modalTitle}/>
            </div>
        );
    }
}