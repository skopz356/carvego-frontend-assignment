import {create} from 'zustand';
import {Section} from '../model/Section';
import {Task} from '../model/Task';
import {TaskPriority} from '../model/TaskPriority';
import {SectionTabIndex} from '../model/SectionTabIndex';

type TodosStoreState = {
  sections: Section[];
  taskDialogState: {
    open: boolean;
    task: Task | null;
    sectionId: number | null;
  };
};

const useStore = create<TodosStoreState>(() => ({
  sections: [],
  taskDialogState: {
    open: false,
    task: null,
    sectionId: null,
  },
}));

export const todosStore = {
  addSection: (props: {title: string}): void => {
    useStore.setState((state) => ({
      sections: [
        ...state.sections,
        {name: props.title, id: state.sections.length - 1, tasks: [], tabIndex: 0},
      ],
    }));
  },

  markSectionTasksAsDone: (props: {sectionId: number}) => {
    useStore.setState((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === props.sectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task) => ({
              ...task,
              isFinished: true,
            })),
          };
        }
        return section;
      }),
    }));
  },
  deleteSection: (props: {sectionId: number}) => {
    useStore.setState((state) => ({
      sections: state.sections.filter((section) => section.id !== props.sectionId),
    }));
  },
  setSectionTabIndex: (props: {tabIndex: SectionTabIndex; sectionId: number}) => {
    useStore.setState((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === props.sectionId) {
          return {
            ...section,
            tabIndex: props.tabIndex,
          };
        }
        return section;
      }),
    }));
  },
  showTaskOfSectionTabIndex: (props: {tabIndex: SectionTabIndex}) => {
    useStore.setState((state) => ({
      sections: state.sections.map((section) => ({
        ...section,
        tabIndex: props.tabIndex,
      })),
    }));
  },

  resetSections: () => {
    useStore.setState({
      sections: [],
    });
  },
  removeFinishedTasks: () => {
    useStore.setState((state) => ({
      sections: state.sections.map((section) => ({
        ...section,
        tasks: section.tasks.filter((task) => !task.isFinished),
      })),
    }));
  },

  /* TASK */
  addTask: (props: {taskName: string; sectionId: number}) => {
    useStore.setState((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === props.sectionId) {
          return {
            ...section,
            tasks: [
              ...section.tasks,
              {
                name: props.taskName,
                id: section.tasks.length - 1,
                priority: TaskPriority.NONE,
                createdDate: new Date(),
              },
            ],
          };
        }
        return section;
      }),
    }));
  },

  editTask: (props: {
    taskId: number;
    sectionId: number;
    updatedTask: Omit<Task, 'id' | 'createdDate'> | Pick<Task, 'isFinished'>;
  }) => {
    useStore.setState((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === props.sectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task) => {
              if (props.taskId === task.id) {
                return {
                  ...task,
                  ...props.updatedTask,
                };
              }
              return task;
            }),
          };
        }
        return section;
      }),
    }));
  },
  deleteTask: (props: {taskId: number; sectionId: number}): void => {
    useStore.setState((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === props.sectionId) {
          return {
            ...section,
            tasks: section.tasks.filter((task) => props.taskId !== task.id),
          };
        }
        return section;
      }),
    }));
  },
  setTaskDialogState: (props: {state: Partial<TodosStoreState['taskDialogState']>}) => {
    useStore.setState((state) => ({
      taskDialogState: {
        ...state.taskDialogState,
        ...props.state,
      },
    }));
  },

  useStore,
};
