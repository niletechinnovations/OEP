import React from 'react';
import store from './stores/store';
import ReactFormGenerator from './form';
import Doc from './DocService';
import PdfContainer from './PdfContainer';
// const answers = {
//   'dropdown_38716F53-51AA-4A53-9A9B-367603D82548': 'd2',
//   'checkboxes_8D6BDC45-76A3-4157-9D62-94B6B24BB833': [
//     'checkboxes_option_8657F4A6-AA5A-41E2-A44A-3E4F43BFC4A6',
//     'checkboxes_option_1D674F07-9E9F-4143-9D9C-D002B29BA9E4',
//   ],
//   'radio_buttons_F79ACC6B-7EBA-429E-870C-124F4F0DA90B': [
//     'radiobuttons_option_553B2710-AD7C-46B4-9F47-B2BD5942E0C7',
//   ],
//   'rating_3B3491B3-71AC-4A68-AB8C-A2B5009346CB': 4,
// };

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };

    const update = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    store.subscribe(state => update(state.data));
  }

  showPreview() {
    this.setState({
      previewVisible: true,
    });
    return false;
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    this.setState({
      data,
    });
    this.props.handleFormHandleChange(data);
  }

  // eslint-disable-next-line no-unused-vars
  _onSubmit(data) {
   
    return false;
    
  }
  createPdf = (html) => Doc.createPdf(html, this.props.fileName);
  render() {   

    var modalClass = 'modal formBuilderPreview';
    if(this.state.previewVisible) {
      modalClass += ' show';
    }

    return (
        <div className="templatePreview1">
          <button className="btn btn-bl pull-right" style={{ marginRight: '10px'}}  onClick={this.showPreview.bind(this)}>Preview Form</button>       

          { this.state.previewVisible &&
            <div className={modalClass}>
              <div className="modal-dialog preview-template">
                <div className="modal-content">
                  <div className="modal-header">                    
                    <h4 className="modal-title">Preview Template </h4>
                    <button className=" btn-re pull-right" data-dismiss="modal" onClick={this.closePreview.bind(this)}>&times;</button>
                  </div>
                  <div className="form-builder-body form-builder-preview">

                    <PdfContainer createPdf={this.createPdf} templateType = "template">                    
                        <ReactFormGenerator
                          download_path=""
                          back_action="/"
                          back_name="Back"
                          answer_data={{}}
                          action_name="Save"
                          form_action="/"
                          form_method="POST"
                          hide_actions= "true"
                          variables={this.props.variables}
                          data={this.state.data} />                    
                    </PdfContainer>
                  </div>
                  
                </div>
              </div>
            </div>
        }                
        </div>
    );
  }
}
