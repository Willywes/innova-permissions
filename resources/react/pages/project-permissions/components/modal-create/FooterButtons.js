import React from 'react';
import ReactDOM from 'react-dom';

const FooterButtons = ({section, setSection, handleClose, store, sending}) =>{
    return (
        <div className="row">
            <div className="col-12">
                <hr/>
            </div>
            <div className="col-6">
                {
                    section == 'init' ?
                        <button onClick={handleClose} className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-times"/> Cancelar
                        </button>
                        :
                        <button onClick={() => setSection('init')} className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-arrow-left"/> Atrás
                        </button>

                }
            </div>
            <div className="col-6 text-right">
                {
                    section != 'init' ?
                        <button className="btn btn-primary btn-sm" onClick={store} disabled={sending}>
                            <i className="fa fa-save"/> Guardar
                        </button>
                        :
                        null

                }
            </div>
        </div>
    );
};

export default FooterButtons

if (document.getElementById('Buttons')) {
    ReactDOM.render(<FooterButtons/>, document.getElementById('Buttons'));
}
