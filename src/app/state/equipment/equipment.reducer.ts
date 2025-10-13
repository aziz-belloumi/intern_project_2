import { createReducer, on } from '@ngrx/store';
import * as EquipmentActions from './equipment.actions';
import { initialState } from './equipment.state';

export const equipmentReducer = createReducer(
  initialState,

  // Load all equipment
  on(EquipmentActions.loadAllEquipment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentActions.loadAllEquipmentSuccess, (state, { equipment }) => ({
    ...state,
    allEquipment: equipment,
    filteredEquipment: equipment,
    loading: false
  })),
  on(EquipmentActions.loadAllEquipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load user equipment
  on(EquipmentActions.loadUserEquipment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentActions.loadUserEquipmentSuccess, (state, { equipment }) => ({
    ...state,
    userEquipment: equipment,
    loading: false
  })),
  on(EquipmentActions.loadUserEquipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load equipment by id
  on(EquipmentActions.loadEquipmentById, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentActions.loadEquipmentByIdSuccess, (state, { equipment }) => ({
    ...state,
    selectedEquipment: equipment,
    loading: false
  })),
  on(EquipmentActions.loadEquipmentByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create equipment
  on(EquipmentActions.createEquipment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentActions.createEquipmentSuccess, (state, { equipment }) => ({
    ...state,
    allEquipment: [...state.allEquipment, equipment],
    userEquipment: [...state.userEquipment, equipment],
    filteredEquipment: [...state.filteredEquipment, equipment],
    loading: false
  })),
  on(EquipmentActions.createEquipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update equipment
  on(EquipmentActions.updateEquipment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentActions.updateEquipmentSuccess, (state, { equipment }) => ({
    ...state,
    allEquipment: state.allEquipment.map(e => e.id === equipment.id ? equipment : e),
    userEquipment: state.userEquipment.map(e => e.id === equipment.id ? equipment : e),
    filteredEquipment: state.filteredEquipment.map(e => e.id === equipment.id ? equipment : e),
    selectedEquipment: state.selectedEquipment?.id === equipment.id ? equipment : state.selectedEquipment,
    loading: false
  })),
  on(EquipmentActions.updateEquipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete equipment
  on(EquipmentActions.deleteEquipment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentActions.deleteEquipmentSuccess, (state, { id }) => ({
    ...state,
    allEquipment: state.allEquipment.filter(e => e.id !== id),
    userEquipment: state.userEquipment.filter(e => e.id !== id),
    filteredEquipment: state.filteredEquipment.filter(e => e.id !== id),
    selectedEquipment: state.selectedEquipment?.id === id ? null : state.selectedEquipment,
    loading: false
  })),
  on(EquipmentActions.deleteEquipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Search equipment
  on(EquipmentActions.searchEquipment, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(EquipmentActions.searchEquipmentSuccess, (state, { equipment }) => ({
    ...state,
    filteredEquipment: equipment,
    loading: false
  })),
  on(EquipmentActions.searchEquipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear selected equipment
  on(EquipmentActions.clearSelectedEquipment, state => ({
    ...state,
    selectedEquipment: null
  }))
);
