import { Equipment } from '../../models/equipment.model';

export interface EquipmentState {
  allEquipment: Equipment[];
  userEquipment: Equipment[];
  filteredEquipment: Equipment[];
  selectedEquipment: Equipment | null;
  loading: boolean;
  error: any;
}

export const initialState: EquipmentState = {
  allEquipment: [],
  userEquipment: [],
  filteredEquipment: [],
  selectedEquipment: null,
  loading: false,
  error: null
};
