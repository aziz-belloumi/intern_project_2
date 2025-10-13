import { createAction, props } from '@ngrx/store';
import { Equipment } from '../../models/equipment.model';
import { EquipmentSearchParams } from '../../services/equipment.service';

// Load all equipment
export const loadAllEquipment = createAction('[Equipment] Load All Equipment');
export const loadAllEquipmentSuccess = createAction(
  '[Equipment] Load All Equipment Success',
  props<{ equipment: Equipment[] }>()
);
export const loadAllEquipmentFailure = createAction(
  '[Equipment] Load All Equipment Failure',
  props<{ error: any }>()
);

// Load user equipment
export const loadUserEquipment = createAction(
  '[Equipment] Load User Equipment',
  props<{ userId: number }>()
);
export const loadUserEquipmentSuccess = createAction(
  '[Equipment] Load User Equipment Success',
  props<{ equipment: Equipment[] }>()
);
export const loadUserEquipmentFailure = createAction(
  '[Equipment] Load User Equipment Failure',
  props<{ error: any }>()
);

// Load single equipment
export const loadEquipmentById = createAction(
  '[Equipment] Load Equipment By Id',
  props<{ id: number }>()
);
export const loadEquipmentByIdSuccess = createAction(
  '[Equipment] Load Equipment By Id Success',
  props<{ equipment: Equipment }>()
);
export const loadEquipmentByIdFailure = createAction(
  '[Equipment] Load Equipment By Id Failure',
  props<{ error: any }>()
);

// Create equipment
export const createEquipment = createAction(
  '[Equipment] Create Equipment',
  props<{ equipment: Equipment }>()
);
export const createEquipmentSuccess = createAction(
  '[Equipment] Create Equipment Success',
  props<{ equipment: Equipment }>()
);
export const createEquipmentFailure = createAction(
  '[Equipment] Create Equipment Failure',
  props<{ error: any }>()
);

// Update equipment
export const updateEquipment = createAction(
  '[Equipment] Update Equipment',
  props<{ id: number; equipment: Equipment }>()
);
export const updateEquipmentSuccess = createAction(
  '[Equipment] Update Equipment Success',
  props<{ equipment: Equipment }>()
);
export const updateEquipmentFailure = createAction(
  '[Equipment] Update Equipment Failure',
  props<{ error: any }>()
);

// Delete equipment
export const deleteEquipment = createAction(
  '[Equipment] Delete Equipment',
  props<{ id: number }>()
);
export const deleteEquipmentSuccess = createAction(
  '[Equipment] Delete Equipment Success',
  props<{ id: number }>()
);
export const deleteEquipmentFailure = createAction(
  '[Equipment] Delete Equipment Failure',
  props<{ error: any }>()
);

// Search equipment
export const searchEquipment = createAction(
  '[Equipment] Search Equipment',
  props<{ params: EquipmentSearchParams }>()
);
export const searchEquipmentSuccess = createAction(
  '[Equipment] Search Equipment Success',
  props<{ equipment: Equipment[] }>()
);
export const searchEquipmentFailure = createAction(
  '[Equipment] Search Equipment Failure',
  props<{ error: any }>()
);

// Clear selected equipment
export const clearSelectedEquipment = createAction('[Equipment] Clear Selected Equipment');
