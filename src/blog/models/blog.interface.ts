import { User } from '../../auth/models/user.interface';

export interface Blog {
  id?: number;
  title?: string;
  text?: string;
  date?: Date;
  editDate?: Date;
  isDraft?: boolean;
  user?: User;
}
