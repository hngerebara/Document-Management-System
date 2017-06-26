import React from 'react';

const Footer = () => (
  <div>
    <footer className='dms-footer'>
    <div id="footer text-center">
          <div className="container text-muted">
            What is this app
            {' '}
            <a data-toggle="modal" data-target="#about" href="#about">about</a>
            ? -
            {' '}
            <a href="" target="_blank">
              Contact
            </a>
          </div>
        </div>

        <div
          className="modal fade"
          id="about"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  That is what it's all about!
                </h4>
              </div>
              <div className="modal-body text-center">
                <div className="1">
                  <h1> Hopeaz DMS </h1>
                  <h3>It's awesome, really!</h3>
                  <div className="panel-body">
                    <p>
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.
                    </p>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <h4 className='footer-text'>2017 @Hope Ngerebara 
      </h4>
    </footer>
  </div>
);

export default Footer