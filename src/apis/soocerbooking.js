import fetcher from "./fetcher";

// THÊM LỊCH SÂN BÓNG
export const createSoccerBooking = async (soccer) => {
    try {
      const response = await fetcher.post("/soccer_booking/insert", soccer);
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  }

// CẬP NHẬT LỊCH SÂN BÓNG
export const updateSoccerBooking = async (soccer) => {
    try {
      const response = await fetcher.post(
        "/soccer_booking/update",
        soccer
      );
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  };

// XÓA LỊCH SÂN BÓNG
export async function deleteSoccerBooking(soccerId) {
    try {
      const response = await fetcher.post("/soccer_booking/delete", {
          name: soccerId
      });
      return response.data.data.content;
    } catch (error) {
      throw error.response.data.content;
    }
  }

// LẤY LỊCH SÂN BÓNG
export const getSoccerBookingList = async () => {
    try {
      const response = await fetcher.post("/soccer_booking/getlist", {
        "search":"",
        "page":"1"
      });
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  }