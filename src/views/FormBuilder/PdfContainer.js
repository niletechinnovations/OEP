import React from 'react';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
      <section className="pdf-toolbar">
        <button onClick={createPdf} className=" btn btn-ye"><i className="fa fa-download"></i> Export PDF</button>
         <button className="btn-re pull-right">Mail</button>
</section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}