import mongoose, {Types} from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  worker: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  newResponse: {
    type: Boolean,
    required: true,
    default: true,
  },
  vacanciesName: {
    type: String,
    required: true,
  }
});

const Response = mongoose.model('Response', ResponseSchema);
export default Response;