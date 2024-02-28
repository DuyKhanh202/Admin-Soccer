import React from "react";
import AuthStyles from "../../components/Auth.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { signup } from "../../../apis/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const signupSchema = object({
    name: string().required("Tên người dùng không được để trống"),
    email: string()
      .required("Email không được để trống")
      .email("Email không đúng định dạng"),
    phone_number: string().required("Số điện thoại không được để trống"),
    type: string().required("Loại không được để trống"),
    account_name: string().required("Họ tên không được để trống"),
    password: string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 kí tự và không được để trống,1 ký tự hoa, 1 ký tự thường và 1 ký tự số "
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      type: "",
      account_name: "",
      password: "",
    },
    resolver: yupResolver(signupSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const {
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  // sau khi form thành công
  const onSubmit = (values) => {
    console.log(values);
    // gọi API đăng ký
    handleSignup(values);
  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };

  return (
    <div className={`${AuthStyles.auth}`}>
      <div className={`${AuthStyles.auth_container}`}>
        <div className={`${AuthStyles.auth_container_form}`}>
          <h1>ĐĂNG KÝ</h1>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {/* FULL NAME */}
            <div className={`${AuthStyles.form_input}`}>
              <h6>Full Name</h6>
              <input
                className={`${AuthStyles.input_taiKhoan}`}
                type="text"
                placeholder="Tên người dùng"
                {...register("name")}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            {/* EMAIL */}
            <div className={`${AuthStyles.form_input}`}>
              <h6>Email</h6>
              <input
                className={`${AuthStyles.input_email}`}
                type="text"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            {/* PHONE-NUMBER */}
            <div className={`${AuthStyles.form_input}`}>
              <h6>Phone Number</h6>
              <input
                className={`${AuthStyles.input_taiKhoan}`}
                type="text"
                placeholder="Phone number"
                {...register("phone_number")}
              />
              {errors.phone_number && <p>{errors.phone_number.message}</p>}
            </div>
            {/* ACCOUNT */}
            <div className={`${AuthStyles.form_input}`}>
              <h6>Account</h6>
              <input
                className={`${AuthStyles.input_taiKhoan}`}
                type="text"
                placeholder="Tên tài khoản"
                {...register("account_name")}
              />
              {errors.account_name && <p>{errors.account_name.message}</p>}
            </div>
            {/* PASSWORD */}
            <div className={`${AuthStyles.form_input}`}>
              <h6>Password</h6>
              <input
                className={`${AuthStyles.input_email}`}
                type="password"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            {/* TYPE */}
            <div
              className={`${AuthStyles.form_input} d-flex align-items-center`}
            >
              <h6>Khách hàng</h6>
              <input
                className={`${AuthStyles.input_gender}`}
                type="radio"
                value="customer"
                {...register("type")}
              />
              <h6 className="ms-5">Admin</h6>
              <input
                className={`${AuthStyles.input_gender}`}
                type="radio"
                value="admin"
                {...register("type")}
              />
              {errors.type && <p>{errors.type.message}</p>}
            </div>
            <div className="text-center">
              <button className="btn btn-success btn-lg" type="submit">
                Đăng Ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
