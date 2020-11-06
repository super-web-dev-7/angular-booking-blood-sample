import {Router} from 'express';

import * as otherController from '../controllers/other.controller';
import * as calendarController from '../controllers/calendar.controller';

const router = Router();

router.route('/dashboard/superadmin').get(otherController.getSuperAdminDashboardValues);
router.route('/dashboard/ag-admin').get(otherController.getAgAdminDashboardValues);

router.route('/sms_history/get').get(otherController.getSmsHistory);

router.route('/zipcode/checkPostalCode/:code').get(otherController.checkPostalCode);
// router.route('/zipcode/getPostalCodeByName').get(otherController.getPostalCodeByName);
router.route('/zipcode/check_postal_code_all/:code').get(otherController.checkPostalCodeAll);
router.route('/zipcode/check_postal_code_appointment/:code').get(otherController.checkPostalCodeForAppointment);

router.route('/sendEmail').post(otherController.sendEmail);
router.route('/sendSMS').post(otherController.sendSMS);

// Nurse action
router.route('/nurse/appointment_delay').post(otherController.appointmentDelay);
router.route('/nurse/appointment_shift').post(otherController.appointmentShift);
router.route('/nurse/appointment_taken').post(otherController.appointmentTaken);
router.route('/nurse/appointment_not_there').post(otherController.appointmentNotThere);

// Get Booking Time
router.route('/booking_time/agency/:agencyId').get(calendarController.getBookingTimeByAgency);
router.route('/booking_time/zipcode/:zipcode').get(calendarController.getBookingTimeByZipcode);

export default router;
