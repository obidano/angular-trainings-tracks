export interface TrainingModel {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date | any;
  state?: 'completed' | 'canceled' | any
}
