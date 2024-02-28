import fetcher from "./fetcher";

// THÊM SÂN BÓNG
export const createSoccerField = async (soccer) => {
    try {
      const response = await fetcher.post("/soccer_field/insert", soccer);
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
}

// CẬP NHẬT SÂN BÓNG
export const updateSoccerField = async (soccer) => {
    try {
      const response = await fetcher.post(
        "/soccer_field/update",
        soccer
      );
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
}

// XÓA SÂN BÓNG
export async function deleteSoccerField(name) {
    try {
      const response = await fetcher.post("/soccer_field/delete", {
        name: name
      });
      return response.data.data.content;
    } catch (error) {
      throw error.response.data.content;
    }
}

// LẤY THÔNG TIN SÂN BÓNG
export const getSoccerFieldList = async () => {
    try {
      const response = await fetcher.post("/soccer_field/getlist", {
        "search":"",
        "page":"1"
      });
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
}