import React, { useEffect, useState } from "react";
import {
    createEquipment,
    getEquipmentInfo,
    updateEquipment,
    deleteEquipment,
    getEquipmentList,
  } from "../../apis//equipment";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import adminEquipmentStyles from "./adminEquipment.module.scss";
import Swal from "sweetalert2";

const userSchema = object({
    name: string().required("Tên người dùng không được để trống"),
    amount: string().required("Loại không được để trống"),
});

export default function AdminEquipment() {
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
        amount: "",
    },
        resolver: yupResolver(userSchema),
        // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
        mode: "onTouched",
    });

    const {
        mutate: handleCreateEquipment,
        error: errorCreateEquipment,
        isLoading: isLoadingCreateEquipment,
    } = useMutation({
        mutationFn: (payload) => createEquipment(payload),
    });
    
    const {
        data: equipmentList = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["equipmentlist"],
        queryFn: getEquipmentInfo,
    });

    const onSubmit = (values) => {
        if (isUpdating) {
          // Thực hiện hàm cập nhật
          updateEquipment(values);
        } else {
          // Thực hiện hàm thêm mới
          handleCreateEquipment(values);
        }
        queryClient.invalidateQueries(["equipmentlist"]);
    };
    
    // sau khi form thất bại
    const onError = (error) => {
        console.log("Lỗi : ", error);
    };

    const selectEquipment = (eqm) => {
        setValue("name", eqm.name);
        setValue("amount", eqm.amount);
        setIsUpdating(!isUpdating);
    };
    
    const handleDeleteEquipment = (id) => {
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
                deleteEquipment(id)
                .then(() => {
                    console.log("thành công xóa");
                    queryClient.invalidateQueries(["employeelist"]);
                })
                .catch((error) => {
                    // Xử lý lỗi nếu có.
                    console.error("Lỗi xóa thiết bị:", error);
                });
            swalWithBootstrapButtons.fire(
                "Deleted!",
                "THIẾT BỊ BỊ XÓA RỒI HUHU :<.",
                "success"
            );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    "Cancelled",
                    "THIẾT BỊ CỦA BẠN VẪN AN TOÀN =))",
                    "error"
                );
            }
        });
    };

    const handleChangePage = async (page) => {
        // const list = await getEquipmentList(page);
        // setList(list);
    }

    return (
        <div>
          <div>
            <div>
              <div className={`${adminEquipmentStyles.form}`}>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div>
                        {/* TÊN THIẾT BỊ  */}
                        <div className={`${adminEquipmentStyles.name}`}>
                            <label htmlFor="">Tên Thiết Bị</label>
                            <input
                                type="text"
                                placeholder="Tên Thiết Bị"
                                {...register("name")}
                            />
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>

                        {/* SỐ LƯỢNG THIẾT BỊ  */}
                        <div className={`${adminEquipmentStyles.amount}`}>
                            <label htmlFor="">Số Lượng Thiết Bị</label>
                            <input
                                type="text"
                                placeholder="Số Lượng Thiết Bị"
                                {...register("amount")}
                            />
                            {errors.amount && <p>{errors.amount.message}</p>}
                        </div>

                        {/* button submit */}
                        <div className="text-center mt-4">
                                <button
                                    className="btn btn-success btn-lg"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    THÊM THIẾT BỊ
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
                    <th scope="col">Tên Thiết Bị</th>
                    <th scope="col">Số lượng Thiết Bị</th>
                </tr>
            </thead>

            <tbody>
                {equipmentList.map((eqm) => {
                    return (
                        <tr>
                            <th scope="row">{eqm.name}</th>
                            <td>{eqm.amount}</td>
                            <td>
                                <button
                                    className="btn btn-danger me-3"
                                    onClick={() => handleDeleteEquipment(eqm.id)}
                                >
                                    XÓA
                                </button>
                                <button
                                    className="btn btn-warning me-3"
                                    onClick={() => selectEquipment(eqm)}
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