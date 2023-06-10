import mongoose from 'mongoose';
import * as crypto from 'crypto';
import config from './config';
import User from './models/User';
import Summary from "./models/Summary";
import Vacancies from "./models/Vacancies";


const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('summaries');
    await db.dropCollection('vacancies');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [employer, worker] = await User.create(
    {
      email: "artem77timoha77@gmail.com",
      password: '123',
      firstName: 'Employer',
      lastName: 'Employerovich',
      role: 'vacancies',
      phoneNumber: '05505556035',
      token: crypto.randomUUID(),
      isVerified: true,
    },
    {
      email: "7timoha7@mail.ru",
      password: '123',
      firstName: 'Worker',
      lastName: 'Workerovish',
      role: 'summary',
      phoneNumber: '0999888777666',
      token: crypto.randomUUID(),
      isVerified: true,
    },
  );

   await Summary.create(
    {
      user: worker._id,
      firstName: 'Artem',
      lastName: 'Markelov',
      email: '7timoha7@mail.ru',
      phoneNumber: '0999888777666',
      education: 'Higher',
      educationalInstitution: 'KNU',
      startDate: '2007-06-06',
      expirationDate: '2022-06-06',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nunc dapibus, rutrum mauris a, pretium justo. Aliquam molestie ultrices.',
      jobTitle: 'Programmer',
      experience: 10,
      region: 'Bishkek',
      datetime: new Date().toString(),
    },
     {
       user: worker._id,
       firstName: 'Artem',
       lastName: 'Markelov',
       email: '7timoha7@mail.ru',
       phoneNumber: '0999888777666',
       education: 'Higher',
       educationalInstitution: 'KNU',
       startDate: '2007-06-06',
       expirationDate: '2022-06-06',
       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nunc dapibus, rutrum mauris a, pretium justo. Aliquam molestie ultrices.',
       jobTitle: 'Programmer',
       experience: 1,
       region: 'Osh',
       datetime: new Date().toString(),
     },
     {
       user: worker._id,
       firstName: 'Artem',
       lastName: 'Markelov',
       email: '7timoha7@mail.ru',
       phoneNumber: '0999888777666',
       education: 'Higher',
       educationalInstitution: 'KNU',
       startDate: '2007-06-06',
       expirationDate: '2022-06-06',
       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nunc dapibus, rutrum mauris a, pretium justo. Aliquam molestie ultrices.',
       jobTitle: 'Programmer',
       experience: 3,
       region: 'Narin',
       datetime: new Date().toString(),
     },
     {
       user: worker._id,
       firstName: 'Artem',
       lastName: 'Markelov',
       email: '7timoha7@mail.ru',
       phoneNumber: '0999888777666',
       education: 'Higher',
       educationalInstitution: 'KNU',
       startDate: '2007-06-06',
       expirationDate: '2022-06-06',
       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nunc dapibus, rutrum mauris a, pretium justo. Aliquam molestie ultrices.',
       jobTitle: 'Programmer',
       experience: 4,
       region: 'Bishkek',
       datetime: new Date().toString(),
     },
     {
       user: worker._id,
       firstName: 'Artem',
       lastName: 'Markelov',
       email: '7timoha7@mail.ru',
       phoneNumber: '0999888777666',
       education: 'Higher',
       educationalInstitution: 'KNU',
       startDate: '2007-06-06',
       expirationDate: '2022-06-06',
       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nunc dapibus, rutrum mauris a, pretium justo. Aliquam molestie ultrices.',
       jobTitle: 'Programmer',
       experience: 5,
       region: 'Bishkek',
       datetime: new Date().toString(),
     },
  );

  await Vacancies.create(
    {
      nameOrganisation: 'Google',
      requirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae aliquam libero. In ut molestie dui. Quisque porttitor orci id.',
      vacancyDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit sapien, vulputate sed turpis ac, tincidunt suscipit neque. Morbi felis neque, ornare eu laoreet vel.',
      vacancyName: 'Cleaner',
      salariesFrom: 100,
      salariesTo: 1000,
      region: 'Osh',
      user: employer._id,
      datetime: new Date().toString(),
    },
    {
      nameOrganisation: 'Nike',
      requirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae aliquam libero. In ut molestie dui. Quisque porttitor orci id.',
      vacancyDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit sapien, vulputate sed turpis ac, tincidunt suscipit neque. Morbi felis neque, ornare eu laoreet vel.',
      vacancyName: 'Designer',
      salariesFrom: 2000,
      salariesTo: 10000,
      region: 'Narin',
      user: employer._id,
      datetime: new Date().toString(),
    },
    {
      nameOrganisation: 'Attractor school',
      requirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae aliquam libero. In ut molestie dui. Quisque porttitor orci id.',
      vacancyDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit sapien, vulputate sed turpis ac, tincidunt suscipit neque. Morbi felis neque, ornare eu laoreet vel.',
      vacancyName: 'Teacher',
      salariesFrom: 500,
      salariesTo: 2000,
      region: 'Bishkek',
      user: employer._id,
      datetime: new Date().toString(),
    },
  );

  await db.close();
};

run().catch(console.error);
