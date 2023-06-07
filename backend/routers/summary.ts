import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import Summary from "../models/Summary";
import permit from "../middleware/permit";


const summaryRouter = express.Router();

// summaryRouter.post('/', auth, async (req, res, next) => {
//   try {
//     const user = (req as RequestWithUser).user;
//     const currentDate = new Date();
//     const summary = await Summary.create({
//       user: user._id,
//       datetime: currentDate.toString(),
//       email: req.body.email,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       phoneNumber: req.body.phoneNumber,
//       startDate: req.body.startDate,
//       expirationDate: req.body.expirationDate,
//       education: req.body.education,
//       educationalInstitution: req.body.educationalInstitution,
//       desc: req.body.desc,
//     });
//     console.log(req.body);
//     return res.send(summary);
//   } catch (e) {
//     if (e instanceof mongoose.Error.ValidationError) {
//       return res.status(400).send(e);
//     } else {
//       return next(e);
//     }
//   }
// });

summaryRouter.post('/', auth, permit('summary'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const currentDate = new Date();
  try {
    if (user.isVerified) {
      const summary = new Summary({
        user: user._id,
        datetime: currentDate.toString(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        startDate: req.body.startDate,
        expirationDate: req.body.expirationDate,
        education: req.body.education,
        educationalInstitution: req.body.educationalInstitution,
        desc: req.body.desc,
        jobTitle: req.body.jobTitle,
        experience: req.body.experience,
        region: req.body.region,
      });

      await summary.save();
      return res.send({
        message: {
          en: 'Summary created successfully',
          ru: 'Резюме успешно создан',
        },
      });
    } else {
      res.status(401).send({
        message: {
          en: 'for Summary you must verify your account',
          ru: 'для создания резюме вы должны подтвердить свой аккаунт',
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

summaryRouter.get('/', async (req, res, next) => {
  try {
    const summaryRes = await Summary.find();
    return res.send(summaryRes);
  } catch (e) {
    return next(e);
  }
});

summaryRouter.get('/mySummary', auth, permit('summary'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const summaryRes = await Summary.find({user: user._id});
    return res.send(summaryRes);
  } catch (e) {
    return next(e);
  }
});

summaryRouter.get('/:id', async (req, res) => {
  try {
    const result = await Summary.findById(req.params.id);
    if (!result) {
      return res.sendStatus(404);
    }
    return res.send(result);
  } catch {
    return res.sendStatus(500);
  }
});

summaryRouter.delete('/summaryDelete/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const summary = await Summary.findById(req.params.id);

    if (summary) {
      if (summary.user.toString() === user._id.toString()) {
        await Summary.deleteOne({_id: req.params.id});
        return res.send({
          message: {
            en: 'Summary delete successfully',
            ru: 'Резюме успешно удалено',
          }
        });
      }
    }
  } catch (e) {
    return next(e);
  }
});

export default summaryRouter;


