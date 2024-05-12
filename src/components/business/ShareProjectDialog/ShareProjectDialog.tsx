import { FC, useState } from 'react';
import styles from './ShareProjectDialog.module.css';
import { Backdrop, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import ProjectService from '../../../services/ProjectService.ts';

interface ShareDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: number;
}
interface ShareUrl {
  readOnly: boolean;
  urlCopy: string;
  urlView: string;
}
const ShareProjectDialog: FC<ShareDialog> = ({ open, setOpen, projectId }) => {
  const [url, setUrl] = useState<ShareUrl>({
    readOnly: false,
    urlCopy: '',
    urlView: '',
  });
  const [loading, setIsLoading] = useState(false);
  const getUrl = async (readOnly: boolean) => {
    if (readOnly) {
      if (url.urlView) {
        setUrl({ ...url, readOnly });
        return;
      }
      setIsLoading(true);
      try {
        const urlView = await ProjectService.copyProject(projectId, true);
        setUrl({ readOnly, urlCopy: url.urlCopy, urlView: urlView.data });
      } finally {
        setIsLoading(false);
      }
    } else {
      if (url.urlView) {
        setUrl({ ...url, readOnly });
        return;
      }
      setIsLoading(true);
      try {
        const urlCopy = await ProjectService.copyProject(projectId);
        setUrl({ readOnly, urlCopy: urlCopy.data, urlView: url.urlView });
      } finally {
        setIsLoading(false);
      }
    }
  };
  const urlToShow = url.readOnly ? url.urlView : url.urlCopy;
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Поделиться проектом</DialogTitle>
        <DialogContent>
          <div className={styles.text}>
            <Typography>{urlToShow ? 'Ссылка: ' : 'Выберите режим'}</Typography>
            <Typography className={styles.link}>{urlToShow}</Typography>
          </div>
          <div className={styles.block}>
            <Button className={styles.btn} onClick={() => getUrl(true)}>
              Для просмотра
            </Button>
            <Button className={styles.btn} onClick={() => getUrl(false)}>
              Для клонирования
            </Button>
          </div>
        </DialogContent>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </Dialog>
    </div>
  );
};

export default ShareProjectDialog;
