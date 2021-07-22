import React, {useEffect, useRef, useState} from 'react';
import {Modal} from "react-bootstrap";
import toastr from 'toastr';

const ModalExport = ({type, data, show, handleClose}) => {

    const textarea = useRef(null)
    const [text, setText] = useState('')

    useEffect(() => {
        if (type === 'json') {
            toJson(data)
        }
        if (type === 'php') {
            toPHP(data)
        }
        if (type === 'sql') {
            toSQL(data)
        }
    }, [type])

    const closeModal = (data) => {
        setText('')
        handleClose()
    }

    const toJson = (data) => {
        let obj = JSON.parse(data);
        let pretty = JSON.stringify(obj, undefined, 4);
        setText(pretty)
    }

    const toPHP = (data) => {
        let obj = JSON.parse(data);
        let pretty = JSON.stringify(obj, undefined, 4);
        let php = pretty.replaceAll('{', '[')
        php = php.replaceAll('}', ']')
        php = php.replaceAll(':', '=>')
        setText(php)
    }

    const toSQL = (data) => {
        let obj = JSON.parse(data);
        console.log(data);
        let _querys = '';
        obj.map(item => {
            _querys = `${_querys}INSERT INTO permissions (id, name, public_name, public_group, public_description, guard_name, created_at, updated_at) VALUES (${item.id},${item.name},${item.public_name} ,${item.public_group} ,${item.public_description} ,${item.guard_name} ,${item.created_at} ,${item.updated_at});`;
            _querys = _querys + '\r\n';
        })
        console.log(_querys);
        setText(_querys)
    }

    const copyToClipboard = (e) => {
        textarea.current.select();
        document.execCommand('copy');
        toastr.info('Copiado al clipboard');
    };

    return (
        <Modal show={show} onHide={closeModal} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Exportar</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="col-row">
                    <div className="col-12 pb-3">
                        <button className="btn btn-info btn-sm" onClick={copyToClipboard}>
                            <i className="far fa-copy"/> Copiar al Clipboard
                        </button>
                    </div>
                    <div className="col-12">
                        <textarea
                            ref={textarea}
                            className="form-control"
                            style={{height: '80vh'}}
                            value={text}/>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    );
};

export default ModalExport
