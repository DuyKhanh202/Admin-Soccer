import React, { useState } from "react";
import {
    createUser,
    getUserList,
    updateUser,
    deleteUser,
  } from "../../apis/user";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import adminUserStyles from "./adminUser.module.scss";
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

const userSchema = object({
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

export default function AdminUser() {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      type: "",
      account_name: "",
      password: "",
    },
    resolver: yupResolver(userSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const {
    mutate: handleCreateUser,
    error: errorCreateUser,
    isLoading: isLoadingCreateUser,
  } = useMutation({
    mutationFn: (payload) => createUser(payload),
  });

  const {
    data: userList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userlist"],
    queryFn: getUserList,
  });

  // console.log(userList);

  const onSubmit = (values) => {
    if (isUpdating) {
      // Thực hiện hàm cập nhật
      updateUser(values);
    } else {
      // Thực hiện hàm thêm mới
      handleCreateUser(values);
    }
    queryClient.invalidateQueries(["userlist"]);
  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };

  const selectUser = (user) => {
    // Lấy giá trị tên bộ phim và gán vào các trường
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone_number", user.phone_number);
    setValue("type", user.type);
    setValue("account_name", user.account_name);
    setValue("password", user.password);
    setIsUpdating(!isUpdating);
  };

  const handleDeleteUser = (account_name) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteUser(account_name)
            .then(() => {
              console.log("thành công xóa");
              queryClient.invalidateQueries(["userlist"]);
            })
            .catch((error) => {
              // Xử lý lỗi nếu có.
              console.error("Lỗi xóa phim:", error);
            });
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "TÀI KHOẢN BỊ XÓA RỒI HUHU :<.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "TÀI KHOẢN CỦA BẠN VẪN AN TOÀN =))",
            "error"
          );
        }
      });
  };

  const handleChangePage = async() => {}

    return (
        <div>
          <div>
            <div>
              <div className={`${adminUserStyles.form}`}>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <div>
                    {/* TÊN INPUT  */}
                    <div className={`${adminUserStyles.input_name}`}>
                      <label htmlFor="">Tên</label>
                      <input
                        type="text"
                        placeholder="Tên"
                        {...register("name")}
                      />
    
                      {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    {/* EMAIL INPUT  */}
                    <div className={`${adminUserStyles.input_email}`}>
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        placeholder="Email"
                        {...register("email")}
                      />
    
                      {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    {/* PHONE INPUT  */}
                    <div className={`${adminUserStyles.input_phone_number}`}>
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        {...register("phone_number")}
                      />
                      {errors.phone_number && <p>{errors.phone_number.message}</p>}
                    </div>
    
                    {/* TYPE INPUT */}
                    <div className={`${adminUserStyles.input_type}`}>
                      <label htmlFor="">Type</label>
                      <input
                        type="text"
                        placeholder="Type"
                        {...register("type")}
                      />
                      {errors.type && <p>{errors.type.message}</p>}
                    </div>
    
                    {/* ACCOUNT NAME INPUT */}
                    <div className={`${adminUserStyles.input_account_name}`}>
                      <label htmlFor="">Account Name</label>
                      <input type="text" 
                        placeholder="Account Name" 
                        {...register("account_name")} 
                      />
                      {errors.account_name && <p>{errors.account_name.message}</p>}
                    </div>
    
                    <div className={`${adminUserStyles.input_password}`}>
                    <label htmlFor="">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />

                  {errors.password && <p>{errors.password.message}</p>}
                    </div>
    
                    {/* button submit */}
                    <div className="text-center mt-4">
                        <button
                          className="btn btn-success btn-lg"
                          type="submit"
                          disabled={isLoading}
                        >
                          THÊM NGƯỜI DÙNG
                        </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Type</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Password</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => {
                  return (
                    <tr>
                      <th scope="row">{user.name}</th>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      <td>{user.type}</td>
                      <td>{user.account_name}</td>
                      <td>{user.password}</td>
                      <td>
                        <button
                          className="btn btn-danger me-3"
                          onClick={() => handleDeleteUser(user.name)}
                        >
                          XÓA
                        </button>
                        <button
                          className="btn btn-warning me-3"
                          onClick={() => selectUser(user)}
                        >
                            <span>Cập Nhật</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="text-center d-flex justify-content-center mt-5">
                <button className="me-4" onClick={() => handleChangePage(1)}>1</button>
                <button className="me-4" onClick={() => handleChangePage(2)}>2</button>
                <button className="me-4" onClick={() => handleChangePage(3)}>3</button>
                <button className="me-4" onClick={() => handleChangePage(4)}>4</button>
                <button className="me-4" onClick={() => handleChangePage(5)}>5</button>
            </div>
        </div>
      );
}