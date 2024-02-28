import fetcher from "./fetcher";
// import axios from "axios";

// ĐĂNG KÝ
export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/account/register", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// ĐĂNG NHẬP
export const signin = (payload) => {
  return fetcher.post("/account/login", payload)
    .then((response) => {
      // Kiểm tra response.success và xử lý tùy thuộc vào kết quả
      if (response.data?.success) {
        // Lưu dữ liệu vào localStorage
        localStorage.setItem('userData', JSON.stringify(response.data?.data?.content));
        return response.data?.data?.content;
      } else {
        // Nếu response.success là false, ném ra một lỗi để bắt ở phía catch
        throw new Error('Đăng nhập không thành công');
      }
    })
    .catch((error) => {
      // Xử lý lỗi và ném ra ngoại lệ
      throw error.response.data?.content?.account_name || 'Đã xảy ra lỗi không xác định';
    });
};
// ĐĂNG XUẤT 
export const logout = () => {
  // Xóa dữ liệu userData khỏi localStorage
  localStorage.removeItem('userData');

  // Thực hiện các bước khác khi người dùng logout (nếu cần)
  // Ví dụ: đẩy người dùng đến trang đăng nhập
  window.location.href = '/sign-in';
};

// THÊM NGƯỜI DÙNG
export const createUser = async (user) => {
  try {
    const response = await fetcher.post("/account/register", user);
    return response.data?.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}

// Lấy thông tin người dùng
export const getUserList = async () => {
  try {
    const response = await fetcher.post("/account/getlist", {
      "search":"",
      "page":"1"
    });
    return response.data?.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
}



// Cập nhật thông tin người dùng
export const updateUser = async (user) => {
  try {
    const response = await fetcher.post(
      "/account/update",
      user
    );
    return response.data?.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// Xóa người dùng
export async function deleteUser(userName) {
  try {
    const response = await fetcher.post("/account/deleteByname", {
        name: userName
    });
    return response.data.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}