import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EquipmentState } from './equipment.state';

export const selectEquipmentState = createFeatureSelector<EquipmentState>('equipment');

export const selectAllEquipment = createSelector(
  selectEquipmentState,
  state => state.allEquipment
);

export const selectUserEquipment = createSelector(
  selectEquipmentState,
  state => state.userEquipment
);

export const selectFilteredEquipment = createSelector(
  selectEquipmentState,
  state => state.filteredEquipment
);

export const selectSelectedEquipment = createSelector(
  selectEquipmentState,
  state => state.selectedEquipment
);

export const selectEquipmentLoading = createSelector(
  selectEquipmentState,
  state => state.loading
);

export const selectEquipmentError = createSelector(
  selectEquipmentState,
  state => state.error
);
