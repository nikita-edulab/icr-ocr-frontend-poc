export interface PDFRecord {
  id: number;

  event_year: string | null;
  course_name: string | null;
  pattern_name: string | null;
  exam_type: string | null;
  term_name: string | null;

  seat_no: string | null;
  prn_no: string | null;

  college_code: string | null;
  college_name: string | null;

  name_of_student: string | null;
  m_name: string | null;

  paper_code: string | null;
  paper_credits: string | number | null;
  assessment_method: string | null;

  grade: string | null;
  grade_points: string | null;
  earn_grade_points: string | null;

  grand_total: string | null;
  term_max_marks: string | null;
  result_status: string | null;
  total_credit: string | null;
  total_egp: string | null;

  percentage: string | null;
  remarks: string | null;

  paper_status: string | null;
  paper_max_marks: string | null;
  marks_obtained: string | null;

  eca_marks: string | null;
  balance_marks: string | null;
  ordinance_marks_to_paper: string | null;

  pdf_link: string | null;

  sgpa: string | null;
  cgpa: string | null;
}
