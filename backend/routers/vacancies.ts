import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import Vacancies from "../models/Vacancies";
import permit from "../middleware/permit";

const vacanciesRouter = express.Router();

vacanciesRouter.post('/', auth, permit('vacancies'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const currentDate = new Date();
  try {
    if (user.isVerified) {
      const order = new Vacancies({
        user: user._id,
        datetime: currentDate.toString(),
        nameOrganisation: req.body.nameOrganisation,
        requirements: req.body.requirements,
        salaries: req.body.salaries,
        vacancyDesc: req.body.vacancyDesc,
        vacancyName: req.body.vacancyName,
        salariesFrom: req.body.salariesFrom,
        salariesTo: req.body.salariesTo,
        region: req.body.region
      });

      await order.save();
      return res.send({
        message: {
          en: 'Vacancy created successfully',
          ru: 'Вокансия успешно создан',
        },
      });
    } else {
      res.status(401).send({
        message: {
          en: 'for vacancy you must verify your account',
          ru: 'для создания Вокансия вы должны подтвердить свой аккаунт',
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



vacanciesRouter.get('/', async (req, res, next) => {
  try {
    const experience = req.query.experience;
    const salaryFrom = req.query.salaryFrom;
    const salaryTo = req.query.salaryTo;

    if (experience) {
      const vacanciesRes = await Vacancies.find({ experience: experience });
      return res.send(vacanciesRes);
    } else if (salaryFrom && salaryTo) {
      const vacanciesRes = await Vacancies.find({
        $and: [
          { salariesFrom: { $gte: salaryFrom } },
          { salariesTo: { $lte: salaryTo } }
        ]
      });
      return res.send(vacanciesRes);
    } else {
      const vacanciesRes = await Vacancies.find();
      return res.send(vacanciesRes);
    }
  } catch (e) {
    return next(e);
  }
});

vacanciesRouter.get('/myVacancies', auth, permit('vacancies'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const vacanciesRes = await Vacancies.find({user: user._id});
    return res.send(vacanciesRes);
  } catch (e) {
    return next(e);
  }
});

vacanciesRouter.get('/:id', async (req, res) => {
  try {
    const result = await Vacancies.findById(req.params.id);
    if (!result) {
      return res.sendStatus(404);
    }
    return res.send(result);
  } catch {
    return res.sendStatus(500);
  }
});

vacanciesRouter.delete('/vacanciesDelete/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const vacancies = await Vacancies.findById(req.params.id);

    if (vacancies) {
      if (vacancies.user.toString() === user._id.toString()) {
        await Vacancies.deleteOne({_id: req.params.id});
        return res.send({
          message: {
            en: 'Vacancy delete successfully',
            ru: 'Вокансия успешно Удалена',
          }
        });
      }
    }
  } catch (e) {
    return next(e);
  }
});

export default vacanciesRouter;


