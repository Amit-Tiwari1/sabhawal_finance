import { axiosInstance } from "@/utils/axiosInstance";

export async function getAllMenus() {
    try {
      const response = await axiosInstance.get("/menus/getallmenus", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = 
        error?.response?.data?.error || "An unexpected error occurred while fetching users.";
      throw new Error(errorMessage);
    }
  }

  export async function getAllMenusPermissionsByUser() {
    

    try {
      const response = await axiosInstance.get("/menus/getmenuspermission", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = 
        error?.response?.data?.error || "An unexpected error occurred while fetching users.";
      throw new Error(errorMessage);
    }
  }

  export async function createNewRole(data: any) {
    try {
      const response = await axiosInstance.post("/menus/createrole", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred while creating role.";
      throw new Error(errorMessage);
    }
  }
  

  export async function getAllRoles() {
    try {
      const response = await axiosInstance.get("/menus/getallroles", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = 
        error?.response?.data?.error || "An unexpected error occurred while fetching users.";
      throw new Error(errorMessage);
    }
  }