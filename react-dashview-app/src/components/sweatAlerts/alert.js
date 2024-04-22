import Swal from 'sweetalert2'
import activationRequest from '../../ApiServices/activationRequest';

import './toast.css'
import 'animate.css';

// varies toaster, modles, and input request "Aknowledgements for user"
// refer to sweet alert doc's @ ====> https://sweetalert2.github.io/

const onSendActivationSuccess = (email) =>{
  Swal.fire(`New Link sent to: ${email}`);
}

const Email = Swal.mixin({
  showConfirmButton:false,
})

const Toast = Swal.mixin({
    toast: true,
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
  })

  

const Comfirmation = Swal.mixin({
  icon: "success",
  });
  
const notActive = () => {
  (async () => {
    const { value: email } = await Swal.fire({
      title: "Account has not been activated!",
      input: "email",
      icon: 'info',
      inputLabel: "Enter Account email for activation Link.",
      inputPlaceholder: "Enter your email address",
      confirmButtonText:"SUBMIT",
      confirmButtonColor:'red',
      showCancelButton: true
    });
    if (email) {
      let user_email = {email:email}
      activationRequest.sendActivation(user_email)
      .then(onSendActivationSuccess(email))
      .catch(error=>console.log({'Error':error}));
    }
  })()
}

const ComfirmPWReset = async () => {
  return await Swal.mixin({
    title: "Input Your Username.",
    input: "text",
    inputLabel: "Username",
    inputPlaceholder:"Enter Your Username",
    allowOutsideClick: () => {
      const popup = Swal.getPopup()
      popup.classList.remove('swal2-show')
      setTimeout(() => {
        popup.classList.add('animate__animated', 'animate__headShake')
      })
      setTimeout(() => {
        popup.classList.remove('animate__animated', 'animate__headShake')
      }, 500)
      return false
    },
  })
};

const newActivation = Swal.mixin({
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
});

const RequestTempPW = async () => {
  return await Swal.mixin({
    title: "Input email address",
    input: "email",
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address",
  });
};

const Alerts = { 
  Comfirmation
  ,Email
  ,notActive
  ,newActivation
  ,RequestTempPW
  ,Toast
  ,ComfirmPWReset
};

export default Alerts