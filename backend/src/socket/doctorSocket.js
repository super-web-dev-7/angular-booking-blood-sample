import db from '../models';
const EditingStatus = db.editingStatus;

export const doctorSocket = (io) => {
    io.on('connection', socket => {
        console.log('new socket connected>>>>> ', socket.id);

        socket.on('edit_callback', async data => {
            if (data.type) {
                await createStatus(data);
            } else {
                await removeStatus(data);
            }
            socket.broadcast.emit('editing_notification', data);
        });
    });
}

const createStatus = async data => {
    await EditingStatus.create(data);
}

const removeStatus = async data => {
    await EditingStatus.destroy({where: {appointmentId: data.appointmentId, doctorId: data.doctorId, table: data.table}});
}