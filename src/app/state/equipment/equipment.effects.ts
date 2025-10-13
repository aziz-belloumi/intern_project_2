import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EquipmentService } from '../../services/equipment.service';
import * as EquipmentActions from './equipment.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EquipmentEffects {
  loadAllEquipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentActions.loadAllEquipment),
      mergeMap(() =>
        this.equipmentService.getAllEquipment().pipe(
          map(equipment => EquipmentActions.loadAllEquipmentSuccess({ equipment })),
          catchError(error => of(EquipmentActions.loadAllEquipmentFailure({ error })))
        )
      )
    )
  );

  loadUserEquipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentActions.loadUserEquipment),
      mergeMap(({ userId }) =>
        this.equipmentService.getUserEquipment(userId).pipe(
          map(equipment => EquipmentActions.loadUserEquipmentSuccess({ equipment })),
          catchError(error => of(EquipmentActions.loadUserEquipmentFailure({ error })))
        )
      )
    )
  );

  loadEquipmentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentActions.loadEquipmentById),
      mergeMap(({ id }) =>
        this.equipmentService.getEquipmentById(id).pipe(
          map(equipment => EquipmentActions.loadEquipmentByIdSuccess({ equipment })),
          catchError(error => of(EquipmentActions.loadEquipmentByIdFailure({ error })))
        )
      )
    )
  );

  createEquipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentActions.createEquipment),
      mergeMap(({ equipment }) =>
        this.equipmentService.createEquipment(equipment).pipe(
          map(created => EquipmentActions.createEquipmentSuccess({ equipment: created })),
          catchError(error => of(EquipmentActions.createEquipmentFailure({ error })))
        )
      )
    )
  );

  updateEquipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentActions.updateEquipment),
      mergeMap(({ id, equipment }) =>
        this.equipmentService.updateEquipment(id, equipment).pipe(
          map(updated => EquipmentActions.updateEquipmentSuccess({ equipment: updated })),
          catchError(error => of(EquipmentActions.updateEquipmentFailure({ error })))
        )
      )
    )
  );

  deleteEquipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentActions.deleteEquipment),
      mergeMap(({ id }) =>
        this.equipmentService.deleteEquipment(id).pipe(
          map(() => EquipmentActions.deleteEquipmentSuccess({ id })),
          catchError(error => of(EquipmentActions.deleteEquipmentFailure({ error })))
        )
      )
    )
  );

  searchEquipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EquipmentActions.searchEquipment),
      mergeMap(({ params }) =>
        this.equipmentService.searchEquipment(params).pipe(
          map(equipment => EquipmentActions.searchEquipmentSuccess({ equipment })),
          catchError(error => of(EquipmentActions.searchEquipmentFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private equipmentService: EquipmentService
  ) {}
}
