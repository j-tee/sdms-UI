/* eslint-disable import/no-extraneous-dependencies */
import { Lesson, LessonParams, LessonViewModel } from '@/src/models/Lesson';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';
// import authHeader from '../utility/authHeader';
// import { Lesson, LessonParams, LessonViewModel } from '../models/Lesson';
// import queryStringFormatter  from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const LessonService = {
  getLessons: (params: LessonParams) => 
    axios.get(`${API_URL}api/v1/lessons?${queryStringFormatter(params)}`, { headers: authHeader() }),
    // const queryParams = `branch_id=${params.branch_id}`+
    // `&department_id=${params.department_id}`+
    // `&branch_id=${params.branch_id}`+
    // `&program_id=${params.program_id}`+
    // `&staff_id=${params.staff_id}`+
    // `&class_group_id=${params.class_group_id}`+
    // `&program_subject_id=${params.program_subject_id}`+
    // `&academic_term_id=${params.academic_term_id}`+
    // `&day_of_week=${params.day_of_week}`+
    // `&stage_id=${params.stage_id}`+
    // `&current_page=${params.pagination?.current_page}`+
    // `&per_page=${params.pagination?.per_page}`+
    // `&paginate=${params.paginate} `
    //  return 
    // },
  getStudentLessons: (params: any) => axios.get(`${API_URL}api/v1/lessons?${queryStringFormatter(params)}`, { headers: authHeader() }), 
  addLesson: (lesson: Lesson) => axios.post(`${API_URL}api/v1/lessons`, lesson, { headers: authHeader() }),
  deleteLesson: (lesson: LessonViewModel) => axios.delete(`${API_URL}api/v1/lessons/${lesson.id}`, { headers: authHeader() }),
  updateLesson: (lesson: Lesson, id: number) => axios.put(`${API_URL}api/v1/lessons/${id}`, lesson, { headers: authHeader() }),
  getLesson: (id: number) => axios.get(`${API_URL}api/v1/lessons/${id}`, { headers: authHeader() }),
};
export default LessonService;

