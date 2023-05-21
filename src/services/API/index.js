

export  const pathApi =  {
    login : '/user/login',
    register : '/user/register',
    user:''

};
// class Input extends React.Component {
//     _handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             console.log('do validate');
//         }
//     }
//
//     render() {
//         return <input type="text" onKeyDown={this._handleKeyDown} />
//     }
// }
// const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('field1', value1);
//     formData.append('field2', value2);
//
//     fetch('/api/endpoint', {
//         method: 'POST',
//         body: formData,
//     })
//         .then(response => response.text())
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
// }
//
// return (
//     <form onSubmit={handleSubmit}>
//         <input type="text" name="field1" value={value1} onChange={(e) => setValue1(e.target.value)} />
//         <input type="text" name="field2" value={value2} onChange={(e) => setValue2(e.target.value)} />
//         <button type="submit">Submit</button>
//     </form>
// );
// uploadAdminSetting: async (files, formValue) => {
//     const {
//         id,
//         // language,
//         formLoginName,
//         systemPurposeName,
//         titleLandingPages,
//         introduceImageName,
//         feedbacks
//     } = formValue;
//     const formData = new FormData();
//     files.forEach((c) => formData.append('images', c));
//     titleLandingPages.forEach((c, i) =>
//         formData.append(titleLandingPages[${i}], JSON.stringify(c))
//     );
//     feedbacks.forEach((c, i) => formData.append(feedbacks[${i}], JSON.stringify(c)));
//     // formData.append('language', language);
//     formData.append('formLoginName', formLoginName);
//     formData.append('systemPurposeName', systemPurposeName);
//     formData.append('introduceImageName', introduceImageName);
//     if (id) {
//         formData.append('id', id);
//         return httpClient.put('/admin/landing-page', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//     }
//     return httpClient.post('/admin/landing-page', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     });
// },
// export const PostAPI = {
//     createPost: async (files, formValue) => {
//         const {
//             title,
//             content,
//             categoryId,
//             files,
//             hashtags
//         } = formValue;
//         const formData = new FormData();
//         files.forEach((c) => formData.append('files', c));
//         hashtags.forEach((c, i) =>
//             formData.append(hashtags[${i}], c)
//         );
//
//         formData.append('title', title);
//         formData.append('content', content);
//         formData.append('categoryId', categoryId);
//
//         return httpClient.post('/admin/landing-page', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//     },


// @RequestParam(value = "type", required = false, defaultValue = "CONTENT") FilterPostEnum typeFilter,
// @RequestParam(value = "sort", required = false, defaultValue = "NEW") SortByEnum sort,
// @RequestParam(value = "time", required = false) SortTimeEnum time,
// @RequestParam(value = "pageSize"
// @RequestParam(value = "pageNo"
//
// COMMENT("comment"), PEOPLE("people"), CONTENT("content");
//
// NEW("new"), RELEVANCE("relevance"), MOST_COMMENT("comment");
//
// HOUR("hour"), DAY("day"), WEEK("week"), MONTH("month"), YEAR("year");
// import { useEffect, useState } from "react";
// import SaveIcon from "@mui/icons-material/Save";
// import { Formik, Form, Field } from "formik";
// import { ToastError, ToastSuccess } from "../common/toast/Toast";
// import { CustomError } from "../../middlewares/handlerError";
// import { RootState, useAppDispatch } from "../../redux/store";
// import { editProfile } from "../../redux/slices/profile.slice";
// import { useSelector } from "react-redux";
// import { upload } from "../../redux/slices/upload.slice";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import { filter } from "../../util/constants";
// import { regex_phone } from "../../util/constants";
//
// export const EditInfoUser: React.FC = () => {
//     const navigate = useNavigate();
//     const data = useSelector((state: RootState) => state.userReducers.profile);
//     const path = useSelector((state: RootState) => state.uploadReducers.path);
//     const codeRes = useSelector((state: RootState) => state.codeResReducers);
//     const dispatch = useAppDispatch();
//     const [filePicture, setFilePicture] = useState(null);
//     const [picture, setPicture] = useState<string>("");
//     const [imgData, setImgData] = useState<any>(null);
//     const [dataForm, setDataForm] = useState<any>({});
//
//     useEffect(() => {
//         if (dataForm.gender != undefined) {
//             dispatch(
//                 editProfile({
//                     ...dataForm,
//                     gender: JSON.parse(dataForm.gender),
//                     avatar: path,
//                     user_id: data.user.user_id,
//                     join_company: data.user.join_company,
//                 })
//             );
//         }
//         if (codeRes.code === 200) {
//             ToastSuccess("upload success");
//             setTimeout(() => {
//                 navigate("/profile");
//             }, 1000);
//         } else if (codeRes.code > 200) {
//             ToastError(codeRes.message);
//         }
//     }, [path, codeRes.code]);
//
//     const uploadImage = (e: any) => {
//         setFilePicture(e.target.files[0]);
//         setPicture(e.target.value);
//         const reader = new FileReader();
//         reader.addEventListener("load", () => {
//             setImgData(reader.result);
//         });
//         reader.readAsDataURL(e.target.files[0]);
//     };
//
//     return (
//         <Formik
//             enableReinitialize
//             initialValues={{
//                 firstname: data.user.firstname,
//                 lastname: data.user.lastname,
//                 avatar: null,
//                 gender: JSON.stringify(data.user.gender),
//                 birthday: moment(data.user.birthday).format("YYYY-MM-DD"),
//                 phone_number: data.user.phone_number,
//                 address: data.user.address,
//                 department_id: data.user.department_id,
//             }}
//             validate={(value) => {
//                 if (
//                     !value.address ||
//                     !value.firstname ||
//                     !value.lastname ||
//                     new Date(value.birthday) == new Date() ||
//                     !value.phone_number
//                 ) {
//                     ToastError("fields is not empty!");
//                     throw new CustomError("fields is not empty!");
//                 } else if (
//                     !filter.test(value.firstname) ||
//                     !filter.test(value.lastname)
//                 ) {
//                     ToastError("first name of last name incorrect");
//                     throw new CustomError("first name of last name incorrect");
//                 } else if (!regex_phone.test(value.phone_number)) {
//                     ToastError("phone number incorrect");
//                     throw new Error("phone number incorrect");
//                 }
//             }}
//             onSubmit={(value) => {
//                 if (filePicture != null) {
//                     setDataForm({ ...value });
//                     const formData = new FormData();
//                     formData.append("avatar", filePicture);
//                     dispatch(upload(formData));
//                 } else {
//                     dispatch(
//                         editProfile({
//                             ...value,
//                             gender: JSON.parse(value.gender),
//                             avatar: data.user.avatar,
//                             user_id: data.user.user_id,
//                             join_company: data.user.join_company || new Date(),
//                             birthday: new Date(value.birthday),
//                         })
//                     );
//                 }
//             }}
//         >
//             {() => (
//                 <Form className="edit-profile">
//                     <div>
//                         <div className="edit-profile_header">
//                             <h3 className="my-request_header_tilte">Cập nhật profile</h3>
//                         </div>
//
//                         <div className="edit-profile_body">
//                             <div className="edit-profile_body_item1">
//                                 <div className="edit-profile_body_item1_form-group">
//                                     <label className="edit-profile_body_item1_form-group_label">
//                                         Tên
//                                     </label>
//                                     <div className="edit-profile_body_item1_form-group_panel">
//                                         <Field
//                                             className="edit-profile_body_item1_form-group_panel_input"
//                                             placeholder="Họ đệm..."
//                                             name="lastname"
//                                         />
//                                         <Field
//                                             className="edit-profile_body_item1_form-group_panel_input"
//                                             placeholder="Tên..."
//                                             name="firstname"
//                                         />
//                                     </div>
//                                 </div>
//
//                                 <div className="edit-profile_body_item1_form-group">
//                                     <label className="edit-profile_body_item1_form-group_label">
//                                         Avatar
//                                     </label>
//                                     <div className="edit-profile_body_item1_form-group_panel_avatar">
//                                         <div className="edit-profile_body_item1_form-group_panel_image">
//                                             <p
//                                                 className={
//                                                     imgData == null && data.user?.avatar == undefined
//                                                         ? ""
//                                                         : "hidden"
//                                                 }
//                                             >
//                                                 No image
//                                             </p>
//                                             <img
//                                                 className={
//                                                     imgData == null && data.user?.avatar == undefined
//                                                         ? "hidden"
//                                                         : "edit-profile_body_item1_form-group_panel_image_display"
//                                                 }
//                                                 src={
//                                                     imgData != null
//                                                         ? imgData
//                                                         : ${process.env.REACT_APP_BACKEND_APP}/${data.user?.avatar}
//                                                 }
//                                             />
//                                         </div>
//                                         <Field
//                                             type="file"
//                                             name="avatar"
//                                             accept="image/*"
//                                             className="edit-profile_body_item1_form-group_panel_input_image"
//                                             onChange={(e: object) => {
//                                                 uploadImage(e);
//                                             }}
//                                         />
//                                     </div>
//                                 </div>
//
//                                 <div className="edit-profile_body_item1_form-group">
//                                     <label className="edit-profile_body_item1_form-group_label">
//                                         Giới tính
//                                     </label>
//                                     <div
//                                         role="group"
//                                         className="edit-profile_body_item1_form-group_panel"
//                                         aria-labelledby="my-radio-group"
//                                     >
//                                         <label className="gender-radio">
//                                             <Field
//                                                 type="radio"
//                                                 className="gender-radio-input"
//                                                 name="gender"
//                                                 value={"false"}
//                                             />
//                                             Nữ
//                                         </label>
//                                         <label className="gender-radio-male">
//                                             <Field
//                                                 type="radio"
//                                                 className="gender-radio-input"
//                                                 name="gender"
//                                                 value={"true"}
//                                             />
//                                             Nam
//                                         </label>
//                                     </div>
//                                 </div>
//
//                                 <div className="edit-profile_body_item1_form-group">
//                                     <label className="edit-profile_body_item1_form-group_label">
//                                         Bộ phận
//                                     </label>
//                                     <div className="edit-profile_body_item1_form-group_panel">
//                                         <Field
//                                             as="select"
//                                             className="edit-profile_body_item1_form-group_panel_select"
//                                             name="department_id"
//                                         >
//                                             <option value={1}>Division 1</option>
//                                             <option value={2}>Division 2</option>
//                                             <option value={3}>Division 3</option>
//                                             <option value={4}>Suport group</option>
//                                         </Field>
//                                     </div>
//                                 </div>
//
//                                 <div className="edit-profile_body_item1_form-group">
//                                     <label className="edit-profile_body_item1_form-group_label">
//                                         Ngày sinh
//                                     </label>
//                                     <div className="edit-profile_body_item1_form-group_panel">
//                                         <Field
//                                             type="date"
//                                             id="birthday"
//                                             className="edit-profile_body_item1_form-group_panel_input"
//                                             name="birthday"
//                                             data-date-format="DD-YYYY-MM"
//                                         />
//                                     </div>
//                                 </div>
//
//                                 <div className="edit-profile_body_item1_form-group">
//                                     <label className="edit-profile_body_item1_form-group_label">
//                                         Số điện thoại
//                                     </label>
//                                     <div className="edit-profile_body_item1_form-group_panel">
//                                         <Field
//                                             type="text"
//                                             className="edit-profile_body_item1_form-group_panel_input_long"
//                                             name="phone_number"
//                                         />
//                                     </div>
//                                 </div>
//
//                                 <div className="edit-profile_body_item1_form-group">
//                                     <label className="edit-profile_body_item1_form-group_label">
//                                         Địa chỉ
//                                     </label>
//                                     <div className="edit-profile_body_item1_form-group_panel">
//                                         <Field
//                                             type="text"
//                                             className="edit-profile_body_item1_form-group_panel_input_long"
//                                             name="address"
//                                         />
//                                     </div>
//                                 </div>
//
//                                 <div className="edit-profile_body_item1_form-group">
//                                     <div className="edit-profile_body_item1_form-group_panel">
//                                         <button
//                                             className="edit-profile_body_item1_form-group_panel_btn-save"
//                                             type="submit"
//                                         >
//                                             <SaveIcon />
//                                             Lưu
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Form>
//             )}
//         </Formik>
//     );
// };