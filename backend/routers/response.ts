import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Response from "../models/Response";
import Summary from "../models/Summary";
import User from "../models/User";
import Vacancies from "../models/Vacancies";

const responseRouter = express.Router();

responseRouter.post('/', auth, permit('summary'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const employer = await User.findById(req.body.employer);
  const vacancies = await Vacancies.findById(req.body.vacanciesId);

  try {
    if (employer && vacancies) {
      const response = new Response({
        worker: user._id,
        employer: employer._id,
        vacanciesName: vacancies.vacancyName,
        newResponse: true,
      });

      await response.save();
      return res.send({
        message: {
          en: 'Response sent',
          ru: 'Отклик отправлен',
        },
      });
    }


  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

responseRouter.get('/myResponse', auth, permit('vacancies'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const responseRes = await Response.find({employer: user._id}).populate('worker');
    return res.send(responseRes);
  } catch (e) {
    return next(e);
  }
});

responseRouter.get('/:id', auth, permit('vacancies'), async (req, res, next) => {
  try {
    const summaryUser = await Summary.find({user: req.params});
    return res.send(summaryUser);
  } catch (e) {
    return next(e);
  }
});

responseRouter.patch('/responseNew/:id', auth, permit('vacancies'), async (req, res, next) => {
  try {
    const response = await Response.findOneAndUpdate({_id: req.params.id}, {newResponse: false});
    if (!response) {
      return res.status(403).send({ message: 'Forbidden' });
    }
    return res.send(response);
  } catch (e) {
    return next(e);
  }
});

export default responseRouter;


