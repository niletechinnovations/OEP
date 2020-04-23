/**
  * <ReactFormBuilder />
*/

import React from 'react';
import { DragDropContext } from 'react-dnd';
import DemoBar from './demobar';
import HTML5Backend from 'react-dnd-html5-backend';
import Preview from './preview';
import Toolbar from './toolbar';
import ReactFormGenerator from './form';
import store from './stores/store';
import ID from './UUID';

class ReactFormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.IDRef = ID;
    this.state = {
      editMode: false,
      data: [],
      editElement: null,
    };
    const update = this._onChange.bind(this);
    store.subscribe(state => update(state.data));    
    this.copyModeOn = this.copyModeOn.bind(this);
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

  copyModeOn(data, e) {
    let dataItem = {};
    for (var key in data) {      
      if(key.toLowerCase() === "options"){
        let optionsItem = [];             
        for(let options of data[key]) {
          let optionsKeyItem = {}
          for (var optionKey in options) {
            optionsKeyItem[optionKey] = options[optionKey];
          }
          optionsKeyItem.key = "radiobuttons_option_"+this.IDRef.uuid();
          optionsItem.push(optionsKeyItem);
        }        
        dataItem[key] = optionsItem;
      }
      else
        dataItem[key] = data[key];
    }
    
    //dataItem = data;
    
    dataItem.id = this.IDRef.uuid();
    debugger;
    store.dispatch('create', dataItem);
    if (this.state.editMode) {
      this.setState({ editMode: !this.state.editMode, editElement: null });
    } else {
      this.setState({ editMode: !this.state.editMode, editElement: dataItem });
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
          <div className="template-input-card">
            <h2>Form Builder Area</h2>
            <div className="row">
              <div className="col-md-12">
                 <div className="template-builder-tollbar ">
                    <Toolbar {...toolbarProps} />
                 </div>
              </div>
            </div>
          </div>

          <div className="template-builder-preview-drop">
            <div className="row">
              <div className="col-md-8">
               <div className="full-width-template-layout">
                  <Preview files={this.props.files}
                   manualEditModeOff={this.manualEditModeOff.bind(this)}
                   showCorrectColumn={this.props.showCorrectColumn}
                   parent={this}
                   data={this.props.data}
                   onLoad={this.props.onLoad}
                   onPost={this.props.onPost}
                   editModeOn={this.editModeOn}
                   copyModeOn={this.copyModeOn}
                   editMode={this.state.editMode}
                   variables={this.props.variables}
                   editElement={this.state.editElement} />
               </div>
              </div>

              <div className="col-md-4">
                <div className="template-preview-card">
                  <h3>Template Preview <DemoBar handleFormHandleChange = {this.props.handleUpdatedFormHandleChange} fileName = {this.props.template_name} ></DemoBar></h3>
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
