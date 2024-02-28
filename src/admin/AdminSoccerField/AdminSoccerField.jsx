import React, { useState } from "react";
import {
    createSoccerField,
    getSoccerFieldList,
    updateSoccerField,
    deleteSoccerField,
  } from "../../apis/soccerfield";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import adminSoccerFieldStyles from "./adminSoccerField.module.scss";
import Swal from "sweetalert2";

const userSchema = object({
    name: string().required("Tên người dùng không được để trống"),
    type: string().required("Loại không được để trống"),
    address: string().required("Địa chỉ không được để trống"),
    status: string().required("Status không được để trống"),
    image: string().required("Hình ảnh không được để trống"),
});

export default function AdminSoccerField() {
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
        type: "",
        address: "",
        status: "",
        image: "",
    },
        resolver: yupResolver(userSchema),
        // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
        mode: "onTouched",
    });

    const {
        mutate: handleCreateSoccerField,
        error: errorCreateSoccerField,
        isLoading: isLoadingCreateSoccerField,
    } = useMutation({
        mutationFn: (payload) => createSoccerField(payload),
    });
    
    const {
        data: soccerFieldList = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["soccerfieldlist"],
        queryFn: getSoccerFieldList,
    });

    const onSubmit = (values) => {
        if (isUpdating) {
          // Thực hiện hàm cập nhật
          updateSoccerField(values);
        } else {
          // Thực hiện hàm thêm mới
          handleCreateSoccerField(values);
        }
        queryClient.invalidateQueries(["userlist"]);
    };
    
    // sau khi form thất bại
    const onError = (error) => {
        console.log("Lỗi : ", error);
    };

    const selectSoccerField = (soccer) => {
        // Lấy giá trị tên bộ phim và gán vào các trường
        setValue("name", soccer.name);
        setValue("type", soccer.type);
        setValue("address", soccer.address);
        setValue("price", soccer.price);
        setValue("status", soccer.status);
        setValue("image", soccer.image);
        setIsUpdating(!isUpdating);
      };
    
    const handleDeleteSoccerField = (name) => {
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
                deleteSoccerField(name)
                .then(() => {
                    console.log("thành công xóa");
                    queryClient.invalidateQueries(["soccerfieldlist"]);
                })
                .catch((error) => {
                    // Xử lý lỗi nếu có.
                    console.error("Lỗi xóa sân:", error);
                });
            swalWithBootstrapButtons.fire(
                "Deleted!",
                "SÂN BỊ XÓA RỒI HUHU :<.",
                "success"
            );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    "Cancelled",
                    "SÂN CỦA BẠN VẪN AN TOÀN =))",
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
              <div className={`${adminSoccerFieldStyles.form}`}>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div>
                        {/* TÊN SÂN  */}
                        <div className={`${adminSoccerFieldStyles.name}`}>
                            <label htmlFor="">Tên Sân</label>
                            <input
                                type="text"
                                placeholder="Tên Sân"
                                {...register("name")}
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>

                        {/* LOẠI SÂN  */}
                        <div className={`${adminSoccerFieldStyles.type}`}>
                            <label htmlFor="">Loại Sân</label>
                            <input
                                type="text"
                                placeholder="Loại Sân"
                                {...register("type")}
                            />
                            {errors.type && <p>{errors.type.message}</p>}
                        </div>

                        {/* ĐỊA CHỈ  */}
                        <div className={`${adminSoccerFieldStyles.address}`}>
                            <label htmlFor="">Địa chỉ</label>
                            <input
                                type="text"
                                placeholder="Địa chỉ"
                                {...register("address")}
                            />
                            {errors.address && <p>{errors.address.message}</p>}
                        </div>
    
                        {/* GIÁ */}
                        <div className={`${adminSoccerFieldStyles.price}`}>
                            <label htmlFor="">Giá tiền</label>
                            <input
                                type="text"
                                placeholder="Price"
                                {...register("price")}
                            />
                            {errors.price && <p>{errors.price.message}</p>}
                        </div>
    
                        {/* STATUS */}
                        <div className={`${adminSoccerFieldStyles.status}`}>
                            <label htmlFor="">Trạng thái</label>
                            <input 
                                type="text" 
                                placeholder="Status" 
                                {...register("status")} 
                            />
                            {errors.status && <p>{errors.status.message}</p>}
                        </div>
    
                        {/* HÌNH ẢNH */}
                        <div className={`${adminSoccerFieldStyles.image}`}>
                            <label htmlFor="">Hình ảnh</label>
                            <input
                                type="text"
                                placeholder="Image"
                                {...register("image")}
                            />
                            {errors.image && <p>{errors.image.message}</p>}
                        </div>
    
                        {/* button submit */}
                        <div className="text-center mt-4">
                                <button
                                    className="btn btn-success btn-lg"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    THÊM SÂN
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
                    <th scope="col">Tên Sân</th>
                    <th scope="col">Loại Sân</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Hình Ảnh</th>
                </tr>
            </thead>

            <tbody>
                {soccerFieldList.map((soccer) => {
                    return (
                        <tr>
                            <th scope="row">{soccer.name}</th>
                            <td>{soccer.type}</td>
                            <td>{soccer.address}</td>
                            <td>{soccer.price}</td>
                            <td>{soccer.status}</td>
                            <td>
                                <img src={soccer.image} style={{width: "100px"}}/>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger me-3"
                                    onClick={() => handleDeleteSoccerField(soccer.name)}
                                >
                                    XÓA
                                </button>
                                <button
                                    className="btn btn-warning me-3"
                                    onClick={() => selectSoccerField(soccer)}
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