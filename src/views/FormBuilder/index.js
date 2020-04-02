/**
  * <ReactFormBuilder />
*/

import React from 'react';
import { DragDropContext } from 'react-dnd';

import HTML5Backend from 'react-dnd-html5-backend';
import Preview from './preview';
import Toolbar from './toolbar';
import ReactFormGenerator from './form';
import store from './stores/store';

class ReactFormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      data: [],
      editElement: null,
    };
    const update = this._onChange.bind(this);
    store.subscribe(state => update(state.data));
  }

  editModeOn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.editMode) {
      this.setState({ editMode: !this.state.editMode, editElement: null });
    } else {
      this.setState({ editMode: !this.state.editMode, editElement: data });
    }
  }
  _onChange(data) {
    this.setState({
      data,
    });
    //this.props.handleFormHandleChange(data);
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  }

  render() {
    const toolbarProps = {};
    if (this.props.toolbarItems) { toolbarProps.items = this.props.toolbarItems; }
    return (
       <div>
         {/* <div>
           <p>
             It is easy to implement a sortable interface with React DnD. Just make
             the same component both a drag source and a drop target, and reorder
             the data in the <code>hover</code> handler.
           </p>
           <Container />
         </div> */}
         <div className="react-form-builder template-builder-layout clearfix">
          <div className="row">
            <div className="col-md-12">
               <div className="template-builder-tollbar ">
                  <Toolbar {...toolbarProps} />
               </div>
            </div>
            <div className="col-md-6">
               <div className="full-width-template-layout">
                 <Preview files={this.props.files}
                     manualEditModeOff={this.manualEditModeOff.bind(this)}
                     showCorrectColumn={this.props.showCorrectColumn}
                     parent={this}
                     data={this.props.data}
                     onLoad={this.props.onLoad}
                     onPost={this.props.onPost}
                     editModeOn={this.editModeOn}
                     editMode={this.state.editMode}
                     variables={this.props.variables}
                     editElement={this.state.editElement} />
                 
               </div>
            </div>
             <div className="col-md-6">
               <h3>Template Preview</h3>
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
             </div>
            
          </div> 
         </div>
       </div>
    );
  }
}

const FormBuilders = {};
const FormBuilder = DragDropContext(HTML5Backend)(ReactFormBuilder);

FormBuilders.ReactFormBuilder = FormBuilder;
FormBuilders.ReactFormGenerator = ReactFormGenerator;
FormBuilders.ElementStore = store;

export default FormBuilders;

export { FormBuilder as ReactFormBuilder, ReactFormGenerator, store as ElementStore };
