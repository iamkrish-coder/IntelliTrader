import React, { Component } from 'react';

import CkEditorBlog from './CkEditorBlog';

class CkEditor extends Component {
    render() {
        return (
            <>                
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Form CkEditor</h4>
                            </div>
                            <div className="card-body custom-ekeditor">
                               <CkEditorBlog />
                            </div>
                        </div>
                    </div>        
                </div>        
            </>
        );
    }
}

export default CkEditor;