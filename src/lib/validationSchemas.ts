import { CollegeRole } from '@prisma/client';
import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const CreateProfileSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  major: Yup.string().required(),
  social: Yup.string().required(),
  bio: Yup.string().required(),
  collegeRole: Yup.string().oneOf(Object.values(CollegeRole)).required(),
  profilePicUrl: Yup.string().required(),
});

export const CreateSessionSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  class: Yup.string().required(),
  place: Yup.string().required(),
  sessionDate: Yup.date().required(),
  startTime: Yup.date().required(),
  endTime: Yup.date().required().min(Yup.ref('startTime')),
  image: Yup.string().required(),
});

export const AddPlaylistSchema = Yup.object({
  url: Yup.string().url().required(),
});
