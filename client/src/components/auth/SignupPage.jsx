import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SignupForm } from './SignupForm';
import { signupUser } from './SignupActions';


export const SignupPage = props =>
   (
     <div className="row">
       <div className="col s12 m6 l3 offset-l3 offset-s1">
         <div className="auth-card z-depth-2">
           <div className="card-header">
             <img
               src="https://res.cloudinary.com/dwrl3tf6j/image/upload/v1499075232/hopeazdms_logo_d3cirn.png"
               alt="hopez"
               className="circle responsive-img"
             />
           </div>
           <div className="card-content">
             <SignupForm signupUser={props.signupUser} />
           </div>
           <div className="card-action">
             <span>
              Already Registered? <Link to="/checkin">CHECKIN</Link>
             </span>
           </div>
         </div>
       </div>
     </div>
  );

SignupPage.propTypes = {
  signupUser: PropTypes.func.isRequired,
};

export default connect(null, { signupUser })(SignupPage);
