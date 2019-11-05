import React from 'react';
const loader = () => {
    return (
        <div className="loaderSection">
             <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
        </div>
    );
}

export default loader;