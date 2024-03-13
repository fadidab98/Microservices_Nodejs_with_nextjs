
import { useDispatch } from 'react-redux';

const useCustomDispatch = () => {
 
  const dispatch = useDispatch();
  return dispatch;
};

export default useCustomDispatch;