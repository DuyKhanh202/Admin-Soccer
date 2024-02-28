import fetcher from "./fetcher";

// THÊM NHÂN VIÊN
export const createEmployee = async (emp) => {
    try {
      const response = await fetcher.post("/employee/insert", emp);
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
}

// CẬP NHẬT NHÂN VIÊN
export const updateEmployee = async (emp) => {
    try {
      const response = await fetcher.post(
        "/employee/update",
        emp
      );
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
}

// XÓA NHÂN VIÊN
export async function deleteEmployee(name) {
    try {
      const response = await fetcher.post("/employee/deleteByemloyee", {
        name: name
      });
      return response.data.data.content;
    } catch (error) {
      throw error.response.data.content;
    }
}

// LẤY THÔNG TIN NHÂN VIÊN
export const getEmployeeList = async () => {
    try {
      const response = await fetcher.post("/employee/getlist", {
        "search":"",
        "page":"1"
      });
      return response.data?.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
}