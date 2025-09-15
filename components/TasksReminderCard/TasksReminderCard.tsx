// 'use client';

// import { useEffect, useState } from 'react';
// import css from './TasksReminderCard.module.css';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// // ! ІКОНКА ДОДАВАННЯ + ЧЕКБОКС, ЗАМІНИТИ ПРИ ПОТРЕБІ
// import { FiPlusCircle } from 'react-icons/fi';
// import { FaCheck } from 'react-icons/fa';
// import ElementWrapper from '../ElementWrapper/ElementWrapper';

// export default function TasksReminderCard() {
//   const [tasksCollection, setTasks] = useState([]);

//   const isDone = true;
//   const _id = 'abg';
//   const name = 'Щось там зробити ';
//   const date = '20.07';

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const tasksCollection = await getTasks(); // ! Змінити назву функції щоб підходила до clientApi
//         setTasks(tasksCollection);
//       } catch {
//         iziToast.error({
//           title: 'Error',
//           message: 'Error while fetching list of tasks',
//         });
//       }
//     };

//     fetchTasks();
//   }, []);
//   const onCheck = async (_id: string, isDone: { isDone: boolean }) => {
//     try {
//       const tasksCollection = await updateTask(_id, isDone); // ! Змінити назву функції щоб підходила до clientApi
//       setTasks(tasksCollection);
//     } catch {
//       iziToast.error({
//         title: 'Error',
//         message: 'Error while completing the task',
//       });
//     }
//   };

//   return (
//     <ElementWrapper>
//       <div className={css.taskListBlock}>
//         <div className={css.taskListBlockwr}>
//           <h2 className={css.title}>Важливі завдання </h2>
//           {/* <button type="button" className={css.addButton}>
//             <FiPlusCircle className="addButtonIcon" size={24} />{' '}
//           </button> */}
//         </div>
//         <ul className={css.taskList}>
//           <li>
//             <div className={css.dateWrapper}>{date}</div>

//             <div className={css.taskWrapper}>
//               <label className={css.taskLabel}>
//                 <div
//                   className={`${css.customCheckbox} ${isDone ? css.customCheckboxChecked : ''}`}
//                 >
//                   {' '}
//                   <FaCheck
//                     className={css.checkIcon}
//                     fill={isDone ? 'white' : '#0000000d'}
//                   />
//                 </div>
//                 <input
//                   className={css.taskCheck}
//                   type="checkbox"
//                   checked={isDone}
//                   onChange={() => {
//                     onCheck(_id, { isDone: !isDone });
//                   }}
//                 />
//                 <span
//                   className={`${css.taskName} ${isDone ? css.taskNameChecked : ''}`}
//                 >
//                   {name}
//                 </span>
//               </label>
//             </div>
//           </li>
//           {/* {tasksCollection && tasksCollection.map(({ _id, name, date, isDone }) => {
//                   return (
//                 <li key={_id}>
//                     <div className={css.dateWrapper}>{date}</div>

//                     <div className={css.taskWrapper}>
//                         <label className={css.taskLabel}>
//                             <div className={`${css.customCheckbox} ${isDone ? css.customCheckboxChecked : ''}`}> <FaCheck className={css.checkIcon} fill={isDone ? 'white' : '#0000000d'}/></div>
//                             <input className={css.taskCheck} type='checkbox' checked={isDone} onChange={() => {onCheck(_id, {isDone: !isDone})}}/>
//                             <span className={`${css.taskName} ${isDone ? css.taskNameChecked : ''}`}>{name}</span>
//                         </label>
//                     </div>
//                 </li>
//             )
//               })} */}
//         </ul>
//       </div>
//     </ElementWrapper>
//   );
// }
