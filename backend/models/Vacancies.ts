import mongoose, {Types} from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const VacanciesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'vacancies',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  datetime: {
    type: String,
    required: true,
  },
  nameOrganisation: {
    type: String,
    required: true,
  },
  vacancyName: {
    type: String,
    required: true,
  },
  vacancyDesc: {
    type: String,
    required: true,
  },
  salaries: {
    type: String,
    required: true,
  },
  requirements:{
    type: String,
    required: true,
  },
});

const Vacancies = mongoose.model('Vacancies', VacanciesSchema);
export default Vacancies;