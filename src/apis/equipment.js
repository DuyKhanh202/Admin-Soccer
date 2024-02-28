import fetcher from "./fetcher";

// THÊM THIẾT BỊ
export const createEquipment = async (eqm) => {
    try {
      const response = await fetcher.post("/equipment/insert", eqm);
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
}

// CẬP NHẬT THIẾT BỊ
export const updateEquipment = async (eqm) => {
    try {
      const response = await fetcher.post(
        "/equipment/update",
        eqm
      );
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
}

// XÓA THIẾT BỊ
export async function deleteEquipment(id) {
    try {
      const response = await fetcher.post("/equipment/delete", {
        id: id
      });
      return response.data.data.content;
    } catch (error) {
      throw error.response.data.content;
    }
}

// LẤY THÔNG TIN THIẾT BỊ
export const getEquipmentInfo = async () => {
    try {
      const response = await fetcher.post("/equipment/getlist", {
        "search":"",
        "page":"1"
      });
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
}

// LẤY DANH SÁCH THIẾT BỊ
export const getEquipmentList = async (page) => {
  try {
    const response = await fetcher.post("/equipment/getlist", {
      "page":page,
      "search":""
    });
    return response.data?.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};