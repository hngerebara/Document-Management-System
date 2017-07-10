// import React, { Component, PropTypes } from 'react';
// import moment from 'moment';

// class UsersProfileForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstName: this.props.user.firstName,
//       lastName: this.props.user.lastName,
//       email: this.props.user.email,
//       password: ''  
//     }
//   }


//   render() {
    
//     return (
//       <div className="row">
//         <div className="col s12 editProfile-body">
//           <div className="row">
//             <div className="col m10  offset-m1 s12  ">
//               <div className="card form z-depth-0">
//                 <div className="card-content login-content">
//                   <form
//                     id="signupForm"
//                     onSubmit={(e) => { e.preventDefault(); }}
//                   >
//                     <div className="row">
//                       <div className="input-field col s12 m6">
//                         <i className="material-icons prefix">account_box</i>
//                         <input
//                           id="first_name"
//                           type="text"
//                           name="firstName"
//                           value={this.state.firstName}
//                           onChange={this.handleChange}
//                         />
//                         <label
//                           htmlFor="first_name"
//                           className="active"
//                         >First Name</label>
//                       </div>
//                       <div className="input-field col s12 m6">
//                         <i className="material-icons prefix">account_box</i>
//                         <input
//                           id="last_name"
//                           type="text"
//                           name="lastName"
//                           value={this.state.lastName}
//                           onChange={this.handleChange}
//                         />
//                         <label
//                           htmlFor="last_name"
//                           className="active"
//                         >Last Name</label>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="input-field col s12">
//                         <i className="material-icons prefix">email</i>
//                         <input
//                           id="email"
//                           type="email"
//                           name="email"
//                           value={this.state.email}
//                           onChange={this.handleChange}
//                         />
//                         { this.state.showError &&
//                         <div className="custom-error">
//                           {this.state.errorMsg}
//                         </div>
//                     }
//                         <label htmlFor="email" className="active">Email</label>

//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="input-field col s12">
//                         <i className="material-icons prefix">lock_outline</i>
//                         <input
//                           id="password"
//                           type="password"
//                           name="password"
//                           placeholder="Leave Blank if you don't want to edit"
//                           value={this.state.password}
//                           onChange={this.handleChange}
//                         />
//                         <label
//                           htmlFor="password"
//                           className="active"
//                         >Password</label>
//                       </div>
//                     </div>
//                     <div className="row">

//                       <button
//                         className={`btn waves-effect 
//                         waves-light col s4 offset-s1 z-depth-4 save-btn`}
//                         type="submit"
//                       >Save<i className="material-icons left">save</i>
//                       </button>
//                     </div>

//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   };

// UsersProfileForm.propTypes = {
// //   document: PropTypes.object.isRequired,
// //   user: PropTypes.object.isRequired,
// //   deleteDocument: PropTypes.func.isRequired,
// //   viewDocument: PropTypes.func.isRequired
// };


// export default UsersProfileForm;
