export interface Board {
    id?: string;
    title?: string;
    priority?: number;
    tasks?: Task[];
}

export enum ILabel {
    PURPLE = 'purple',
    BLUE = 'blue',
    GREEN = 'green',
    YELLOW = 'yellow',
    RED = 'red',
    GRAY = 'gray'
}
export interface Task {
    description?: string;
    label?: ILabel
}
