import React from 'react';
import '../css/modal_header.less';

export default ({modalTitle}) => (
    <section className="modal-header">
        <h2> {modalTitle} </h2>
    </section>
);