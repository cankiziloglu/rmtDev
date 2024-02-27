import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const handleError = (error: unknown) => {
  let message;

  if (error instanceof AxiosError || error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'An error occurred.';
  }

  toast.error(message);
};
