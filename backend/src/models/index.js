import config from '../config/config';
import Sequelize from 'sequelize';
import user from './user.model';
import calendar from './calendar.model';
import district from './district.model';
import packages from './package';
import packageGroup from './package_group.model';
import template from './template.model';
import workingGroup from './working-group.model';
import additionalPackage from './additional-package';
import agency from './agency.model';
import patient from './patient.model';
import districtModel from './static-district.model';
import appointmentModel from './appointment.model';
import zipCodeModel from './zipcode.model';
import templateAction from './template-action.model';
import workingGroupAgency from './working_group_agency.model';
import templateKeyword from './template_keyword.model';
import contactHistory from './contact-history.model';
import medicalQuestion from './medical_question.model';
import medicalAnswer from './medical_answer.model';
import callbackDoctor from './callback_doctor.model';
import patientRecall from './patient_recall.model';
import editingStatus from './editing_status.model';
import smsHistory from './sms_history.model';
import appointmentResult from './appointment_result.model';
import verificationCode from './verification_code.model';
import callbackAnswer from './callback_answer.model';
import appointmentExtraInformation from './appointment_extra_information.model';


const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: config.dialect,
    operatorsAliases: false,
    logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize, Sequelize);
db.calendar = calendar(sequelize, Sequelize);
db.district = district(sequelize, Sequelize);
db.package = packages(sequelize, Sequelize);
db.packageGroup = packageGroup(sequelize, Sequelize);
db.template = template(sequelize, Sequelize);
db.workingGroup = workingGroup(sequelize, Sequelize);
db.additionalPackage = additionalPackage(sequelize, Sequelize);
db.agency = agency(sequelize, Sequelize);
db.workingGroupAgency = workingGroupAgency(sequelize, Sequelize);
db.patient = patient(sequelize, Sequelize);
db.districtModel = districtModel(sequelize, Sequelize);
db.appointment = appointmentModel(sequelize, Sequelize);
db.zipCodeModel = zipCodeModel(sequelize, Sequelize);
db.templateAction = templateAction(sequelize, Sequelize);
db.templatekeyword = templateKeyword(sequelize, Sequelize);
db.contactHistory = contactHistory(sequelize, Sequelize);
db.medicalQuestion = medicalQuestion(sequelize, Sequelize);
db.medicalAnswer = medicalAnswer(sequelize, Sequelize);
db.callbackDoctor = callbackDoctor(sequelize, Sequelize);
db.patientRecall = patientRecall(sequelize, Sequelize);
db.editingStatus = editingStatus(sequelize, Sequelize);
db.smsHistory = smsHistory(sequelize, Sequelize);
db.appointmentResult = appointmentResult(sequelize, Sequelize);
db.verificationCode = verificationCode(sequelize, Sequelize);
db.callbackAnswer = callbackAnswer(sequelize, Sequelize);
db.appointmentExtraInformation = appointmentExtraInformation(sequelize, Sequelize);

// Relations
db.patient.belongsTo(db.user);
db.user.hasMany(db.patient);

// Appointment Model
db.appointment.belongsTo(db.user);
db.appointment.belongsTo(db.package);
db.appointment.belongsTo(db.agency);
db.user.hasMany(db.appointment);
db.package.hasMany(db.appointment);
db.agency.hasMany(db.appointment);

export default db;
