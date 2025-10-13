export interface Equipment {
  id?: number;
  name: string;
  type: string;
  description: string;
  price?: number;
  serialNumber?: string;
  hasWarranty: boolean;
  isPortable: boolean;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}
