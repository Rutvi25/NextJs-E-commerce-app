import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import Loading from './Loading';
import Toast from './Toast';

const Notify = () => {
  const [state, dispatch] = useContext(DataContext);
  const { notify } = state;

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && 
        <Toast 
          message={{message: notify.error, title: 'Error'}}
          handleShow={() => dispatch({ type: 'NOTIFY', payload: {}})}
          bgColor='bg-danger'
        />
      }
      {notify.success && 
        <Toast 
          message={{message: notify.success, title: 'Success'}}
          handleShow={() => dispatch({ type: 'NOTIFY', payload: {}})}
          bgColor='bg-success'
        />
      }
    </>
  );
}

export default Notify;