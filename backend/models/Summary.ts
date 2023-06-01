import mongoose, {Types} from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const SummarySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  educationalInstitution: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  desc: String,
});

const Summary = mongoose.model('Summary', SummarySchema);
export default Summary;