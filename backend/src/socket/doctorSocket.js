import db from '../models';
const EditingStatus = db.editingStatus;

export const doctorSocket = (io) => {
    io.on('connection', socket => {
        socket.on('edit_callback', async data => {
            if (data.type) {
                data.socketId = socket.id;
                await createStatus(data);
            } else {
                await removeStatus(data);
            }
            socket.broadcast.emit('editing_notification', data);
        });

        socket.on('close_emit', async () => {
            socket.broadcast.emit('close_notification', socket.id);
            await EditingStatus.destroy({where: {socketId: socket.id}});
        })

        socket.on('disconnect', async () => {
            socket.broadcast.emit('close_notification', socket.id);
            await EditingStatus.destroy({where: {socketId: socket.id}});
        })
    });
}

const createStatus = async data => {
    await EditingStatus.create(data);
}

const removeStatus = async data => {
    await EditingStatus.destroy({where: {appointmentId: data.appointmentId, doctorId: data.doctorId, table: data.table}});
}