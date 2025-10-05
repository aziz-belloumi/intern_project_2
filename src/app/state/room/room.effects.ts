import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RoomActions from './room.actions';
import {catchError, filter, map, mergeMap, of} from 'rxjs';
import {RoomService} from "../../services/room.service";
import {SocketService} from "../../services/socket.service";

@Injectable()
export class RoomEffects {
  constructor(private actions$: Actions, private roomService: RoomService , private socketService: SocketService) {}

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.loadRooms),
      mergeMap(() =>
        this.roomService.getRooms().pipe(
          map(rooms => RoomActions.loadRoomsSuccess({ rooms })),
          catchError(error => of(RoomActions.loadRoomsFailure({ error })))
        )
      )
    )
  );

  loadRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.loadRoom),
      mergeMap(({ id }) =>
        this.roomService.getRoom(id).pipe(
          map(room => RoomActions.loadRoomSuccess({ room })),
          catchError(error => of(RoomActions.loadRoomFailure({ error })))
        )
      )
    )
  );

  loadUserRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.loadUserRooms),
      mergeMap(({ userId }) =>
        this.roomService.getUserRooms(userId).pipe(
          map(rooms => RoomActions.loadUserRoomsSuccess({ rooms })),
          catchError(error => of(RoomActions.loadUserRoomsFailure({ error })))
        )
      )
    )
  );

  createRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.createRoom),
      mergeMap(({ room }) =>
        this.roomService.createRoom(room).pipe(
          map(addedRoom => RoomActions.createRoomSuccess({ room: addedRoom })),
          catchError(error => of(RoomActions.createRoomFailure({ error })))
        )
      )
    )
  );

  updateRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.updateRoom),
      mergeMap(({ id, room }) =>
        this.roomService.updateRoom(id, room).pipe(
          map(updatedRoom => RoomActions.updateRoomSuccess({ room: updatedRoom })),
          catchError(error => of(RoomActions.updateRoomFailure({ error })))
        )
      )
    )
  );

  deleteRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.deleteRoom),
      mergeMap(({ id }) =>
        this.roomService.deleteRoom(id).pipe(
          map(() => RoomActions.deleteRoomSuccess({ id })),
          catchError(error => of(RoomActions.deleteRoomFailure({ error })))
        )
      )
    )
  );
}
