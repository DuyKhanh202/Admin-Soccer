import React, { useState } from "react";
import {
    createSoccerBooking,
    getSoccerBookingList,
    updateSoccerBooking,
    deleteSoccerBooking,
  } from "../../apis/soocerbooking";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import adminSoccerBookingStyles from "./adminSoccerBooking.module.scss";
import Swal from "sweetalert2";

const soccerBookingSchema = object({
    date_book: string().required("Ngày không được để trống."),
    time_start: string().required("Ngày không được để trống."),
    time_end: string().required("Ngày không được để trống."),
    referee: string().required("Ngày không được để trống."),
    total_price: string().required("Ngày không được để trống."),
    account_id: string().required("Ngày không được để trống."),
    field_id: string().required("Ngày không được để trống."),
})

export default function AdminSoccerBooking() {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      date_book: "",
      time_start: "",
      time_end: "",
      referee: "",
      total_price: "",
      account_id: "",
      field_id: "",
    },
    resolver: yupResolver(soccerBookingSchema),
    // khi người dùng blur nó thì sẽ tự động hiện ra lỗi
    mode: "onTouched",
  });

  const {
    mutate: handleCreateSoccerBooking,
    error: errorCreateSoccerBooking,
    isLoading: isLoadingCreateSoccerBooking,
  } = useMutation({
    mutationFn: (payload) => createSoccerBooking(payload),
  });

  const {
    data: soccerBookingList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["soccerbookinglist"],
    queryFn: getSoccerBookingList,
  });

  const onSubmit = (values) => {
    if (isUpdating) {
      // Thực hiện hàm cập nhật
      updateSoccerBooking(values);
    } else {
      // Thực hiện hàm thêm mới
      handleCreateSoccerBooking(values);
    }
    queryClient.invalidateQueries(["soccerbookinglist"]);
  };

  // sau khi form thất bại
  const onError = (error) => {
    console.log("Lỗi : ", error);
  };

  const selectSoccerBooking = (soccer) => {
    setValue("date_book", soccer.date_book);
    setValue("time_start", soccer.time_start);
    setValue("time_end", soccer.time_end);
    setValue("referee", soccer.referee);
    setValue("total_price", soccer.total_price);
    setValue("account_id", soccer.account_id);
    setValue("field_id", soccer.field_id);
    setIsUpdating(!isUpdating);
  }

  const handleDeleteSoccerBooking = (id) => {
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
          deleteSoccerBooking(id)
            .then(() => {
              console.log("thành công xóa");
              queryClient.invalidateQueries(["soccerbookinglist"]);
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
            "SÂN CỦA BẠN VẪN CÒN =))",
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
          <div className={`${adminSoccerBookingStyles.form}`}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div>
                {/* DATE BOOK  */}
                <div className={`${adminSoccerBookingStyles.date_book}`}>
                  <label htmlFor="">Ngày đặt sân</label>
                  <input
                    type="text"
                    placeholder="Ngày đặt sân"
                    {...register("date_book")}
                  />

                  {errors.date_book && <p>{errors.date_book.message}</p>}
                </div>
                {/* TIME START  */}
                <div className={`${adminSoccerBookingStyles.time_start}`}>
                  <label htmlFor="">Thời gian bắt đầu</label>
                  <input
                    type="text"
                    placeholder="Thời gian bắt đầu"
                    {...register("time_start")}
                  />

                  {errors.time_start && <p>{errors.time_start.message}</p>}
                </div>
                {/* TIME END  */}
                <div className={`${adminSoccerBookingStyles.time_end}`}>
                  <label htmlFor="">Thời gian kết thúc</label>
                  <input
                    type="text"
                    placeholder="Thời gian kết thúc"
                    {...register("time_end")}
                  />
                  {errors.time_end && <p>{errors.time_end.message}</p>}
                </div>

                {/* REFEREE */}
                <div className={`${adminSoccerBookingStyles.referee}`}>
                  <label htmlFor="">Referee</label>
                  <input
                    type="text"
                    placeholder="Referee"
                    {...register("referee")}
                  />
                  {errors.referee && <p>{errors.referee.message}</p>}
                </div>

                {/* TOTAL PRICE */}
                <div className={`${adminSoccerBookingStyles.total_price}`}>
                  <label htmlFor="">Total Price</label>
                  <input type="text" 
                    placeholder="Total Price" 
                    {...register("total_price")} 
                  />
                  {errors.total_price && <p>{errors.total_price.message}</p>}
                </div>

                {/* ACCOUNT ID */}
                <div className={`${adminSoccerBookingStyles.account_id}`}>
                <label htmlFor="">Account ID</label>
              <input
                type="text"
                placeholder="Account ID"
                {...register("account_id")}
              />

              {errors.account_id && <p>{errors.account_id.message}</p>}
                </div>

                {/* FIELD ID */}
                <div className={`${adminSoccerBookingStyles.field_id}`}>
                    <label htmlFor="">Field ID</label>
                    <input
                        type="text"
                        placeholder="Field ID"
                        {...register("field_id")}
                    />
                    {errors.field_id && <p>{errors.field_id.message}</p>}
                </div>

                {/* button submit */}
                <div className="text-center mt-4">
                  {/* {isUpdating ? (
                    <button
                      className="btn btn-success btn-lg"
                      type="submit"
                      disabled={isLoading}
                    >
                      CẬP NHẬT
                    </button>
                  ) : ( */}
                    <button
                      className="btn btn-success btn-lg"
                      type="submit"
                      disabled={isLoading}
                    >
                      THÊM LỊCH ĐẶT
                    </button>
                  {/* )} */}
                  {/* {error && <p>{error}</p>} */}
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
              <th scope="col">Ngày Đặt Sân</th>
              <th scope="col">Thời gian bắt đầu</th>
              <th scope="col">Thời gian kết thúc</th>
              <th scope="col">SL trọng tài</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">ID tài khoản</th>
              <th scope="col">ID sân bóng</th>
            </tr>
          </thead>
          <tbody>
            {soccerBookingList.map((soccer) => {
              return (
                <tr>
                  <th scope="row">{soccer.date_book}</th>
                  <td>{soccer.time_start}</td>
                  <td>{soccer.time_end}</td>
                  <td>{soccer.referee}</td>
                  <td>{soccer.total_price}</td>
                  <td>{soccer.account_id}</td>
                  <td>{soccer.field_id}</td>
                  <td>
                    <button
                      className="btn btn-danger me-3"
                      onClick={() => handleDeleteSoccerBooking(soccer.name)}
                    >
                      XÓA
                    </button>
                    <button
                      className="btn btn-warning me-3"
                      onClick={() => selectSoccerBooking(soccer)}
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