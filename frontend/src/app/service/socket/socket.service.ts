import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  editingNotification = this.socket.fromEvent<any>('editing_notification');
  closeNotification = this.socket.fromEvent<any>('close_notification');
  constructor(
    public socket: Socket
  ) {
  }

  editCallbackTable = data => {
    this.socket.emit('edit_callback', data);
  }

  editAnamnesisTable = data => {
    this.socket.emit('edit_anamnesis', data);
  }

  editTerminTable = data => {
    this.socket.emit('edit_termin', data);
  }
}
