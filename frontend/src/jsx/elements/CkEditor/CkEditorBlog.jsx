import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';




const CkEditorBlog = () => {
    return (
        <>
            <CKEditor
                editor={ ClassicEditor }            
                onReady={ editor => {                    
                    
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    
                } }
                onBlur={ ( event, editor ) => {
                    
                } }
                onFocus={ ( event, editor ) => {
                    
                } }
            /> 
        </>
    );
};

export default CkEditorBlog;