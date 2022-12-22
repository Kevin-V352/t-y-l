/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
import fileDownload from 'js-file-download';
import { toast } from 'react-toastify';

import { tylAPI } from '@/api';

interface ISaveMenuDocument {
  id:             string;
  pendingMessage: string;
  successMessage: string;
  errorMessage:   string;
};

export const saveMenuDocument = async (options: ISaveMenuDocument, cb?: () => void): Promise<void> => {

  const { id, pendingMessage, successMessage, errorMessage } = options;

  if (cb) cb();

  const request = tylAPI.get('/generator', { responseType: 'blob' });

  toast.promise(
    request,
    {
      pending: {
        render () {

          return pendingMessage;

        }
      },
      success: {
        render ({ data: response }) {

          fileDownload(response!.data, 'menu_tyl.pdf');
          return successMessage;

        }
      },
      error: {
        render () {

          return errorMessage;

        }
      }
    },
    {
      toastId:   id,
      autoClose: 2500
    }
  );

};
