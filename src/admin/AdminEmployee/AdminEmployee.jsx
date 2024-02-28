import React, { useState } from "react";
import {
    createEmployee,
    getEmployeeList,
    updateEmployee,
    deleteEmployee,
  } from "../../apis/employee";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import adminEmployeeStyles from "./adminEmployee.module.scss";
import Swal from "sweetalert2";

const userSchema = object({
    name: string().required("Tên người dùng không được để trống"),
    email: string().required("Loại không được để trống"),
    phone_number: string().required("Địa chỉ không được để trống"),
});

export default function AdminEmployee() {
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
    },
        resolver: yupResolver(userSchema),
        // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
        mode: "onTouched",
    });

    const {
        mutate: handleCreateEmployee,
        error: errorCreateEmployee,
        isLoading: isLoadingCreateEmployee,
    } = useMutation({
        mutationFn: (payload) => createEmployee(payload),
    });
    
    const {
        data: employeeList = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["employeelist"],
        queryFn: getEmployeeList,
    });

    const onSubmit = (values) => {
        if (isUpdating) {
          // Thực hiện hàm cập nhật
          updateEmployee(values);
        } else {
          // Thực hiện hàm thêm mới
          handleCreateEmployee(values);
        }
        queryClient.invalidateQueries(["employeelist"]);
    };
    
    // sau khi form thất bại
    const onError = (error) => {
        console.log("Lỗi : ", error);
    };

    const selectEmployee = (emp) => {
        setValue("name", emp.name);
        setValue("email", emp.email);
        setValue("phone_number", emp.phone_number);
        setIsUpdating(!isUpdating);
    };
    
    const handleDeleteEmployee = (name) => {
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
                deleteEmployee(name)
                .then(() => {
                    console.log("thành công xóa");
                    queryClient.invalidateQueries(["employeelist"]);
                })
                .catch((error) => {
                    // Xử lý lỗi nếu có.
                    console.error("Lỗi xóa nhân viên:", error);
                });
            swalWithBootstrapButtons.fire(
                "Deleted!",
                "NHÂN VIÊN BỊ XÓA RỒI HUHU :<.",
                "success"
            );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    "Cancelled",
                    "NHÂN VIÊN CỦA BẠN VẪN AN TOÀN =))",
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
              <div className={`${adminEmployeeStyles.form}`}>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div>
                        {/* TÊN NHÂN VIÊN  */}
                        <div className={`${adminEmployeeStyles.name}`}>
                            <label htmlFor="">Tên Nhân Viên</label>
                            <input
                                type="text"
                                placeholder="Tên Nhân Viên"
                                {...register("name")}
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>

                        {/* EMAIL NHÂN VIÊN  */}
                        <div className={`${adminEmployeeStyles.email}`}>
                            <label htmlFor="">Email Nhân Viên</label>
                            <input
                                type="text"
                                placeholder="Email Nhân Viên"
                                {...register("email")}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>

                        {/* SĐT NHÂN VIÊN  */}
                        <div className={`${adminEmployeeStyles.phone_number}`}>
                            <label htmlFor="">Sđt Nhân Viên</label>
                            <input
                                type="text"
                                placeholder="Sđt Nhân viên"
                                {...register("phone_number")}
                            />
                            {errors.phone_number && <p>{errors.phone_number.message}</p>}
                        </div>
    
                        {/* button submit */}
                        <div className="text-center mt-4">
                                <button
                                    className="btn btn-success btn-lg"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    THÊM NHÂN VIÊN
                                </button>
                            {error && <p>{error}</p>}
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
                    <th scope="col">Tên Nhân Viên</th>
                    <th scope="col">Email Nhân Viên</th>
                    <th scope="col">SĐT Nhân Viên</th>
                </tr>
            </thead>

            <tbody>
                {employeeList.map((emp) => {
                    return (
                        <tr>
                            <th scope="row">{emp.name}</th>
                            <td>{emp.email}</td>
                            <td>{emp.phone_number}</td>
                            <td>
                                <button
                                    className="btn btn-danger me-3"
                                    onClick={() => handleDeleteEmployee(emp.name)}
                                >
                                    XÓA
                                </button>
                                <button
                                    className="btn btn-warning me-3"
                                    onClick={() => selectEmployee(emp)}
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