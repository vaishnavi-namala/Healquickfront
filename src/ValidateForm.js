import { validateName, validateEmail, validateMobile, validatePassword, validateConfirmPassword } from "./ValidateData";

export const validateForm = (formName, formData) => {
 let errors = {};

  switch (formName) {
    case "contact":
        errors.contact_nameERR=validateName(formData.contact_name);
        errors.contact_mobileNoERR=validateMobile(formData.contact_mobileNo);
        errors.contact_MailidERR=validateEmail(formData.contact_Mailid);
        errors.contact_AddressERR=formData.contact_Address ? "" : "Address is required";
        break;

    case "quick":
      errors.patient_NameERR=validateName(formData.patient_Name);
      errors.patient_mobileNoERR=validateMobile(formData.patient_mobileNo);
      errors.patient_mailIdERR=validateEmail(formData.patient_mailId);
      break;

    case "BookAppointment":
      errors.TreatNameERR = formData.treatName ? "" : "Treatment Name is required";
      errors.LocationERR = formData.location ? "" : "Location is required";
      errors.doctor_nameERR= validateName(formData.doctorName);
      errors.patientNameERR = validateName(formData.patientName)
      errors.patient_mobileNoERR =validateMobile(formData.patient_mobileNo)
      errors.patient_MailidERR = validateEmail(formData.patient_mail);
      break;

    case "doctor":
      errors.TreatmentERR=formData.treatName ? "" : "Treatment Name is required";
      errors.LocationERR=formData.location ? "" : "Location is required";
      errors.doctor_nameERR = validateName(formData.doctorName);
      errors.doctor_qualERR=formData.d_qual ? "" : "Qualification is required"; 
      errors.doctor_numERR = validateMobile(formData.d_num);
      errors.doctor_mailERR = validateEmail(formData.d_email);
      errors.doctor_ExpERR =formData.d_experince ? "" : "Experience is required"; 
      errors.doctor_skillERR = formData.d_skills ? "" : "Skills required";
      errors.doctor_descriptionERR=formData.Description ? "" : "Drescription is required";
      break;
    case "location":
      errors.TreatmentERR=formData.treatName ? "" : "Treatment is required";
      errors.LocationERR=formData.location ? "" : "Location is required";
      break;
    
    case "treatment":
      errors.TreatmentERR=formData.treatName ? "" : "Treatment is required";
      errors.ImageERR=formData.image ? "" : "Image is required";
      errors.treat_descriptionERR=formData.description ? "" : "Description is required";
      break;

    case "offer":
      errors.offer_DescriptionERR=formData.offerDescription ? "" : "Description is required";
      errors.offer_TitleERR=formData.OfferTitle? "" : "Title is required";
      break;

    case "admin":
      errors.mailerr = validateEmail(formData.email)
      errors.passworderr = validatePassword(formData.password);
      break;

    case "createAccount":
      errors.firstnameERR= validateName(formData.fname);
      errors.lastnameERR = validateName(formData.lname);
      errors.emailError= validateEmail(formData.email);
      errors.mobileError= validateMobile(formData.mobile);
      errors.passwordERR = validatePassword(formData.password);
      errors.cpasswordERR = validateConfirmPassword(formData.password, formData.cpassword);
      break;

    case "blog":
      errors.blog_imageERR=formData.blog_image? "" : "image is required";
      errors.blog_titleERR= formData.blog_title ? "" : "Blog Title is required";
      errors.blog_descriptionERR = formData.blog_description ? "" : "Description is required";
      break;

    case "resetpassword":
      errors.passworderr=validatePassword(formData.password)
      errors.conpasserr= validateConfirmPassword(formData.password,formData.conpassword)
      break;

    case "forgot":
      errors.mailerr=validateEmail(formData.email)
      errors.mberr= validateMobile(formData.mobile)
      break;

    default:
      break;
  }

  return errors;
};