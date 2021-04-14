import { Course } from './course.js';
import { Student } from './student.js'; 

import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;


const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredit")!;
const inputSearchBox2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2")!;

//const btnfilterByCredits2: HTMLElement = document.getElementById("button-filterByCredit2")!;
const inputSearchBox3: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box3")!;

btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCredits.onclick = () => applyFilterByCredits();


renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);


totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentsInTable(students: Student[]): void {
    console.log('Desplegando estudiantes');
    students.forEach((student) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${student.codigo}</td>
                             <td>${student.cedula}</td>
                             <td>${student.edad}</td>
                             <td>${student.direccion}</td>
                             <td>${student.telefono}</td>
                             `;
      studentsTbody.appendChild(trElement);
    });
  }

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}


function applyFilterByCredits() { 
    let num : number = +inputSearchBox2.value;
    let num2 : number = +inputSearchBox3.value; 
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredit(num, num2, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
  

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function searchCourseByCredit(num: number, num2:number, courses: Course[]) {
    return num === 0 ? dataCourses : courses.filter( c => 
      c.credits >= num && c.credits <= num2);
  }

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
  
}