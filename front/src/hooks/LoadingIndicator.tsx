import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Make sure this path is correct

const LoadingIndicator = () => {
  const loading = useSelector((state: RootState) => state.auth.loading);

  if (!loading) return null; // If not loading, return null (i.e., don't render)

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
    </div>
  );
};

export default LoadingIndicator;
