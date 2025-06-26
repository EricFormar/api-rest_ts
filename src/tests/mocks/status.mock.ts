import { IStatus } from "../../interfaces/IStatus";

  export const getStatusMock = (data : Partial<IStatus>) => {

    const {id = 1, name} = data;

      const newStatus = {
        id,
        name : name || "Test Status",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return newStatus;  
  }